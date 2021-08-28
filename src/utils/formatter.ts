export const capitalizeSetType = (text: string): string => {
  return text
    .toLowerCase()
    .replaceAll('-', ' ')
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

export const capitalizeFirstLetter = (text: string): string => {
  return text[0].toUpperCase() + text.substr(1).toLowerCase();
};
