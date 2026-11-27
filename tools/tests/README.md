# Browser checks

Python scripts that drive Chrome with Playwright to check the sites and take screenshots.
They were written in a Claude workspace where both repos sat side by side:

    /home/claude/larkin-mills-fire                 (this repo)
    /home/claude/white-meadow-lake-fire            (kandyanything/white-meadow-lake-fire-concept)

Clone to those paths, or change the paths at the top of each script.

## Start the local servers

    cd /home/claude/larkin-mills-fire        && python3 -m http.server 8765
    cd /home/claude/white-meadow-lake-fire   && python3 -m http.server 8766

## The scripts

| Script | Checks |
| --- | --- |
| `peq_b.py` | Pequannock, design 2 (firehouse doors): 35 checks, desktop and phone |
| `p1_b.py` | Pequannock, design 1 (long page): 26 checks, and the links between the two designs |
| `nv_b.py` | New Vernon, design 2 (six openings on the rendering): 34 checks, and the links to design 1 |
| `nv1_b.py` | New Vernon, design 1 (long page): 18 checks |
| `nwk_b.py` | Newark, design 2 (five doors on the rendering): 41 checks, desktop and phone |
| `nwk1_b.py` | Newark, design 1 (long page): 28 checks, and the links between the two designs |
| `d2_b.py` | Larkin Mills design 2 (firehouse doors) |
| `plus_b.py PORT TAG URL` | The shared extras (feed, year, Santa map, QR, tour, giving). `python3 plus_b.py 8765 d2 http://localhost:8765/design-2/index.html` |
| `plus_t.py` | Older checks of the extras on design 1 |
| `wl_t.py`, `wl_again.py` | The burning-badge welcome: frame-by-frame pictures and the "Don't show this again" box |
| `peq_shot.py`, `p1_shot.py`, `hq2_shot.py`, `coat_shot.py` | Screenshots at several screen sizes |

Chrome is at `/usr/bin/google-chrome`. WebGL for the welcome needs the flags
`--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`.

Pictures that load from the Pequannock company's own site (static.wixstatic.com) or from
newarkpublicsafety.org or images.squarespace-cdn.com (New Vernon), and the weather service (api.weather.gov), cannot be reached from the
workspace; the scripts block or stub them.
