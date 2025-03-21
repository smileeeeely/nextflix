export const formatOverview = (overview: string): string => overview.replace(/(?<!\.)\.(?!\.)/g, '.\n');
