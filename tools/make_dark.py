"""Build css/dark.css for a design-1 folder: overrides that apply only under html[data-theme="dark"].
White surfaces become dark navy; light yellow/gold/cream surfaces stay, with dark text on them; text in
the red accent turns gold. The hand-tuned rules in tools/dark_tail.css are added at the end.

    python3 tools/make_dark.py newark-fire/design-1/css/site.css newark-fire/design-1/css/dark.css

Run it again after changing css/site.css. To give another design-1 site the dark theme: copy the theme
code from newark-fire/design-1/js/site.js (THEME, theme-go), link css/dark.css in index.html, and set
`theme` / `themeSwitch` in its data."""
import re, sys
src = open(sys.argv[1], encoding='utf-8').read()
src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
rules = []  # (selector, declarations)
def walk(text):
    i = 0
    while i < len(text):
        j = text.find('{', i)
        if j < 0: break
        head = text[i:j].strip()
        depth, k = 1, j + 1
        while depth and k < len(text):
            if text[k] == '{': depth += 1
            elif text[k] == '}': depth -= 1
            k += 1
        body = text[j + 1:k - 1]
        if head.startswith('@media') or head.startswith('@supports'): walk(body)
        elif head.startswith('@'): pass
        else: rules.append((head, body))
        i = k
walk(src)
def lum(hexs):
    h = hexs.lstrip('#')
    if len(h) == 3: h = ''.join(c * 2 for c in h)
    r, g, b = (int(h[n:n + 2], 16) / 255 for n in (0, 2, 4))
    return .2126 * r + .7152 * g + .0722 * b
SURF, LIGHT, REDTEXT = [], [], []
for sel, body in rules:
    if re.search(r'(?<![-\w])color\s*:\s*var\(--accent(-deep)?\)', body): REDTEXT.append(sel)
    m = re.search(r'background(?:-color)?\s*:\s*([^;]+)', body)
    if not m: continue
    v = m.group(1).strip()
    if 'gradient' in v and 'var(--white)' not in v: continue
    if re.fullmatch(r'var\(--white\)', v): SURF.append(sel)
    elif re.fullmatch(r'var\(--(gold|lime)\)', v): LIGHT.append(sel)
    else:
        h = re.fullmatch(r'#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})', v)
        if h and lum(h.group(0)) > .62: LIGHT.append(sel)
P = 'html[data-theme="dark"] '
def scope(sel): return ', '.join(P + s.strip() for s in sel.split(','))
out = ['/* Dark theme for design 1. Applies only when <html data-theme="dark"> (set from the data\'s',
       '   `theme`, or ?theme=dark in the address). Built from css/site.css by make_dark.py, then the',
       '   hand-tuned rules at the end. */',
       P.strip() + ' { --ink: #EEF1F6; --ink-2: #AEB8CB; --line: #2A3A5E; --concrete: #0E1930; --surface: #15223D; --surface-2: #1B2B4C; color-scheme: dark; }',
       P + 'body { background: #0A1224; }']
out.append('/* white surfaces turn dark */')
for s in SURF:
    if s.strip() == 'body': continue
    out.append(scope(s) + ' { background: var(--surface); }')
out.append('/* text in the red accent turns gold, which reads on navy (as on the dark bands already) */')
for s in REDTEXT:
    out.append(scope(s) + ' { color: var(--gold); }')
out.append('/* light surfaces that stay light keep dark text */')
for s in LIGHT:
    out.append(scope(s) + ' { color: #14161B; }')
import os
tail = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dark_tail.css')
if os.path.exists(tail): out.append(open(tail, encoding='utf-8').read().rstrip())
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(len(SURF), 'surfaces,', len(LIGHT), 'light,', len(REDTEXT), 'red text')
