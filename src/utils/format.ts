export const formatViewTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "Bây giờ";
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  }
};

const EMPTY_STRING = "";
export const VND_SYMBOL = "₫";
export const USD_SYMBOL = "$";

export const formatPriceLocaleVi = (
  value: number | string,
  suffix = VND_SYMBOL
) => {
  const valStr =
    (typeof value === "number" && Number.isFinite(value)) ||
    (typeof value === "string" && !Number.isNaN(parseFloat(value)))
      ? value.toString()
      : EMPTY_STRING;
  return valStr
    ? valStr.replace(/\B(?<!\,\d*)(?=(\d{3})+(?!\d))/g, ".") + suffix
    : EMPTY_STRING;
};

export const formatNumberShort = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};
