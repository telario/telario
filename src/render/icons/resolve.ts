import catalog from './fontawesome-free.json';

export type IconPath = { width: number; height: number; path: string | string[] };
const icons = catalog.icons as Record<string, (number | string | string[])[]>;
const aliases = catalog.aliases as Record<string, string>;
const shims = new Map(
  catalog.shims.map(([name, prefix, replacement]) => [
    name,
    {
      name: replacement || name,
      style: prefix === 'far' ? 'regular' : prefix === 'fab' ? 'brands' : 'solid',
    },
  ]),
);

/** Resolve Balsamiq names without modifying the persisted icon ID. */
export function resolveIcon(id: string): IconPath | undefined {
  const exact = icons[id.replace(/^fa-/, '')];
  if (exact)
    return {
      width: exact[0] as number,
      height: exact[1] as number,
      path: exact[2] as string | string[],
    };
  let name = id.replace(/^fa-/, '');
  const match = name.match(/-(solid|regular|brands)$/);
  const style = match?.[1];
  if (match) name = name.slice(0, -match[0].length);
  // Legacy Balsamiq size suffix describes the glyph size, not another icon.
  name = name.replace(/-small$/, '');
  const shim = shims.get(name);
  name = String(shim?.name ?? aliases[name] ?? name);
  name = aliases[name] ?? name;
  const candidates = style
    ? [style, 'solid', 'regular', 'brands']
    : [shim?.style ?? 'solid', 'solid', 'regular', 'brands'];
  for (const candidate of candidates) {
    const value = icons[`${name}-${candidate}`];
    if (value)
      return {
        width: value[0] as number,
        height: value[1] as number,
        path: value[2] as string | string[],
      };
  }
}
