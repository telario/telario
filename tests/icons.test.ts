import { describe, expect, it } from 'vitest';
import { resolveIcon } from '../src/render/icons/resolve';
import catalog from '../src/render/icons/fontawesome-free.json';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { ControlGraphic } from '../src/render/Controls';

describe('Font Awesome Free compatibility', () => {
  it('resolves every bundled variant to its own geometry', () => {
    for (const [id, [width, height, path]] of Object.entries(catalog.icons)) {
      expect(resolveIcon(id), id).toEqual({ width, height, path });
    }
  });
  it('resolves the icon IDs observed in the private sample', () => {
    for (const id of [
      'check-solid',
      'circle-small-solid',
      'circle-solid',
      'database-regular',
      'desktop-solid',
      'folder-regular',
    ]) {
      expect(resolveIcon(id), id).toBeDefined();
    }
    expect(resolveIcon('database-regular')).toEqual(resolveIcon('database-solid'));
    expect(resolveIcon('folder-regular')).not.toEqual(resolveIcon('folder-solid'));
  });
  it('supports old names, outline styles and brands', () => {
    expect(resolveIcon('file-o')).toEqual(resolveIcon('file-regular'));
    expect(resolveIcon('fa-envelope-o')).toEqual(resolveIcon('envelope-regular'));
    expect(resolveIcon('gear')).toEqual(resolveIcon('gear-solid'));
    expect(resolveIcon('github')).toEqual(resolveIcon('github-brands'));
    expect(resolveIcon('not-an-icon')).toBeUndefined();
  });
  it('embeds vector paths in exported markup without network dependencies', () => {
    const markup = renderToStaticMarkup(
      createElement(ControlGraphic, {
        control: {
          typeID: 'Icon',
          x: 0,
          y: 0,
          w: 48,
          h: 48,
          properties: { icon: { ID: 'desktop-solid' } },
        },
      }),
    );
    expect(markup).toContain('viewBox="0 0 576 512"');
    expect(markup).toContain('<path');
    expect(markup).not.toContain('stroke-dasharray="3 2"');
    expect(markup).not.toContain('href=');
  });
});
