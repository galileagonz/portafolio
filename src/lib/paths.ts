const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prefixes public/ asset paths with the deploy basePath
export function withBasePath(path: string) {
  return `${basePath}${path}`;
}
