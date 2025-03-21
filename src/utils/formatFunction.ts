export const formatOverview = (overview: string): string => {
  return overview.replace(/(?<!\.)\.(?!\.)/g, '.\n');
};
