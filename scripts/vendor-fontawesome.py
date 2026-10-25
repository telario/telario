"""Vendor only Font Awesome Free SVG paths from the pinned upstream release."""
import json
import pathlib
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
VERSION = '6.7.2'
BASE = f'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/{VERSION}/'

def fetch(path):
    return urllib.request.urlopen(BASE + path).read()

metadata = json.loads(fetch('metadata/icons.json'))
icons = {}
aliases = {}
for name, entry in metadata.items():
    for style in entry['free']:
        svg = entry['svg'][style]
        icons[f'{name}-{style}'] = [svg['width'], svg['height'], svg['path']]
    for alias in entry.get('aliases', {}).get('names', []):
        aliases[alias] = name

directory = ROOT / 'src/render/icons'
directory.mkdir(parents=True, exist_ok=True)
(directory / 'fontawesome-free.json').write_text(json.dumps({
    'version': VERSION, 'icons': icons, 'aliases': aliases,
    'shims': json.loads(fetch('metadata/shims.json')),
}, separators=(',', ':')), encoding='utf-8')
license_dir = ROOT / 'public/licenses'
license_dir.mkdir(parents=True, exist_ok=True)
(license_dir / 'fontawesome-free.txt').write_bytes(fetch('LICENSE.txt'))
print(f'Vendored {len(icons)} Free icon variants; {len(aliases)} aliases.')
