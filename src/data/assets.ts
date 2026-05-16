const assetModules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export function resolveAssetUrl(path: string): string {
  if (!path.startsWith('/src/')) {
    return path;
  }

  const modulePath = `..${path.slice(4)}`;
  return assetModules[modulePath] ?? path;
}
