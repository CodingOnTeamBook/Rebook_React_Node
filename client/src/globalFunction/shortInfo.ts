export default function shortInfo(info: string): string {
  const length = 20;
  if (info.length > length) {
    info = info.substr(0, length - 2) + '...';
  }
  return info;
}
