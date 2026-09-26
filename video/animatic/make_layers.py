"""Maakt losse karakterlagen + schone achtergrondplaten uit de bestaande Higgsfield-platen (v0.9).

Geen redesign: de lagen zijn letterlijke uitsneden uit dezelfde renders. De plek waar een sensor zat wordt
ingevuld met een harmonische (Laplace-)vulling vanuit de omliggende pixels + lichte ruis, zodat een laag een
paar procent kan bewegen zonder dat er een gat zichtbaar wordt.

Uitvoer (assets/):
  koffer-clean-ext.png   kofferplaat + 300 px dekselverlenging, zonder Switch/Broadcast/Rail
  k-switch.png, k-broadcast.png, k-rail.png   lagen met alpha (koffer-perspectief)
  race-clean.png         raceplaat gespiegeld (Switch links), zonder sensoren, licht onscherp (diepte)
  r-switch.png, r-broadcast.png               lagen met alpha (race-perspectief, gespiegeld)
  layers.json            bbox (plaatpixels) + gezichtsankers per laag
"""
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

A = 'assets/'
rng = np.random.default_rng(3)

def harmonic_fill(img, mask, iters=900):
    """Vul mask-pixels met een gladde interpolatie van de rand (Jacobi op een uitsnede, multi-scale start)."""
    a = np.array(img).astype(float); m = np.array(mask) > 127
    ys, xs = np.where(m); y0, y1 = max(ys.min() - 4, 0), min(ys.max() + 5, a.shape[0]); x0, x1 = max(xs.min() - 4, 0), min(xs.max() + 5, a.shape[1])
    sub = a[y0:y1, x0:x1].copy(); sm = m[y0:y1, x0:x1]
    # startwaarde: rij-interpolatie tussen linker- en rechterrand
    for yy in range(sub.shape[0]):
        row = sm[yy]
        if not row.any(): continue
        idx = np.where(~row)[0]
        if len(idx) < 2: continue
        for c in range(3): sub[yy, row, c] = np.interp(np.where(row)[0], idx, sub[yy, idx, c])
    for _ in range(iters):
        avg = (np.roll(sub, 1, 0) + np.roll(sub, -1, 0) + np.roll(sub, 1, 1) + np.roll(sub, -1, 1)) / 4
        sub[sm] = avg[sm]
    sub[sm] += rng.normal(0, 2.2, (sm.sum(), 3))   # korrel zodat de vulling niet 'plastic' oogt
    a[y0:y1, x0:x1] = sub
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def shape_mask(size, shapes, feather=1.2):
    m = Image.new('L', size, 0); d = ImageDraw.Draw(m)
    for s in shapes:
        if s[0] == 'e': cx, cy, rx, ry = s[1:]; d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)
        elif s[0] == 'p': d.polygon(s[1], fill=255)
    return m.filter(ImageFilter.GaussianBlur(feather))

def cut(img, mask, pad=6):
    bb = mask.getbbox(); bb = (max(bb[0] - pad, 0), max(bb[1] - pad, 0), min(bb[2] + pad, img.width), min(bb[3] + pad, img.height))
    layer = img.convert('RGBA'); layer.putalpha(mask); return layer.crop(bb), bb

meta = {}

# ---------------- koffer ----------------
plate = Image.open(A + 'koffer-plate.png').convert('RGB')          # 1344x752, ogen al geneutraliseerd
W, H = plate.size
sw_mask = shape_mask(plate.size, [('e', 515, 398, 144, 80), ('e', 515, 432, 142, 70)])
bc_mask = shape_mask(plate.size, [('e', 890, 458, 154, 80), ('e', 890, 492, 150, 70)])
k_sw, bb_sw = cut(plate, sw_mask); k_bc, bb_bc = cut(plate, bc_mask)
k_sw.save(A + 'k-switch.png'); k_bc.save(A + 'k-broadcast.png')
# schone plaat: beide sensoren weg (masker iets ruimer), dan de bestaande dekselverlenging erboven
grow = lambda m: m.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(2))
clean = harmonic_fill(plate, grow(sw_mask)); clean = harmonic_fill(clean, grow(bc_mask))
ext_old = Image.open(A + 'koffer-plate-ext.png').convert('RGB')   # 1344x1052: bovenste 300 px = verlenging met Rail
E = 300
rail_box = (430, 188, 430 + 625, 188 + 100)                         # Rail-uitsnede in de verlenging (zie v0.5)
rail_mask = Image.new('L', ext_old.size, 0); ImageDraw.Draw(rail_mask).rounded_rectangle([rail_box[0] + 14, rail_box[1] + 14, rail_box[2] - 14, rail_box[3] - 14], radius=20, fill=255)
rail_mask = rail_mask.filter(ImageFilter.GaussianBlur(7))
k_rail, bb_rail = cut(ext_old, rail_mask, pad=2); k_rail.save(A + 'k-rail.png')
ext_clean = ext_old.copy(); ext_clean.paste(clean, (0, E))
ext_clean = harmonic_fill(ext_clean, grow(rail_mask), iters=600)
ext_clean.save(A + 'koffer-clean-ext.png')
meta['koffer'] = {
    'plate': [W, H + E], 'ext': E,
    'switch': {'bbox': [bb_sw[0], bb_sw[1] + E, bb_sw[2], bb_sw[3] + E], 'eyes': [[447 - bb_sw[0], 425 - bb_sw[1]], [556 - bb_sw[0], 433 - bb_sw[1]]], 'mouth': [490 - bb_sw[0], 455 - bb_sw[1]]},
    'broadcast': {'bbox': [bb_bc[0], bb_bc[1] + E, bb_bc[2], bb_bc[3] + E], 'eyes': [[822 - bb_bc[0], 480 - bb_bc[1]], [944 - bb_bc[0], 492 - bb_bc[1]]], 'mouth': [880 - bb_bc[0], 512 - bb_bc[1]]},
    'rail': {'bbox': list(bb_rail), 'eyes': [[522 - bb_rail[0], 230 - bb_rail[1]], [584 - bb_rail[0], 230 - bb_rail[1]]], 'mouth': [553 - bb_rail[0], 251 - bb_rail[1]]},
}

# ---------------- race (gespiegeld: Switch wit links, Broadcast zwart rechts) ----------------
race = Image.open(A + 'race-plate.png').convert('RGB').transpose(Image.FLIP_LEFT_RIGHT)
RW = race.width; fx = lambda pts: [(RW - x, y) for x, y in pts]
# contouren in de ONgespiegelde plaat (zwart links, wit rechts), daarna gespiegeld
black_poly = [(150, 330), (200, 310), (300, 303), (400, 322), (470, 370), (502, 430), (498, 482), (470, 525), (420, 562), (350, 582), (260, 580), (190, 552), (146, 505), (120, 452), (124, 392)]
white_poly = [(856, 445), (872, 395), (930, 345), (1040, 310), (1140, 310), (1212, 338), (1238, 398), (1240, 452), (1222, 505), (1195, 560), (1122, 588), (1000, 590), (915, 562), (868, 522), (855, 482)]
r_sw_mask = shape_mask(race.size, [('p', fx(white_poly))], 1.4)
r_bc_mask = shape_mask(race.size, [('p', fx(black_poly))], 1.4)
r_sw, bb_rsw = cut(race, r_sw_mask); r_bc, bb_rbc = cut(race, r_bc_mask)
r_sw.save(A + 'r-switch.png'); r_bc.save(A + 'r-broadcast.png')
rclean = harmonic_fill(race, grow(r_sw_mask), 1200); rclean = harmonic_fill(rclean, grow(r_bc_mask), 1200)
rclean = rclean.filter(ImageFilter.GaussianBlur(2.2))                  # lichte diepte-onscherpte achter de lagen
rclean = ImageEnhance.Brightness(rclean).enhance(0.92)
rclean.save(A + 'race-clean.png')
# gezichtsankers (ongespiegeld): zwart ogen (322,446),(439,446) mond (400,468); wit ogen (922,447),(1047,444) mond (975,470)
m = lambda x: RW - x
meta['race'] = {
    'plate': [RW, race.height],
    'switch': {'bbox': list(bb_rsw), 'eyes': [[m(1047) - bb_rsw[0], 444 - bb_rsw[1]], [m(922) - bb_rsw[0], 447 - bb_rsw[1]]], 'mouth': [m(975) - bb_rsw[0], 470 - bb_rsw[1]]},
    'broadcast': {'bbox': list(bb_rbc), 'eyes': [[m(439) - bb_rbc[0], 446 - bb_rbc[1]], [m(322) - bb_rbc[0], 446 - bb_rbc[1]]], 'mouth': [m(400) - bb_rbc[0], 468 - bb_rbc[1]]},
}
json.dump(meta, open(A + 'layers.json', 'w'), indent=1)
open(A + 'layers.js', 'w').write('/* gegenereerd door make_layers.py */\nwindow.LAYERS = ' + json.dumps(meta) + ';\n')
print(json.dumps(meta, indent=1))
