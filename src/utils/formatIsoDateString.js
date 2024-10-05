export const formatToIsoDateStr = (str) => {
  const date = new Date(str);

  const isoString = date.toISOString();

  return isoString;
};
