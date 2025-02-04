export function extractPort(idx: number) {
  const paths = window.location.pathname.split('/');
  return paths[idx]
}