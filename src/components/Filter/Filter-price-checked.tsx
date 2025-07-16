import { Box, Radio, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const priceRanges = [
  {
    label: "Dưới 500.000đ",
    value: "under-500",
    min: 0,
    max: 500000
  },
  {
    label: "Từ 500.000đ - 1.000.000đ",
    value: "500-1000",
    min: 500000,
    max: 1000000
  },
  {
    label: "Trên 1.000.000đ",
    value: "over-1000",
    min: 1000000,
    max: Infinity
  }
];

export const FilterPriceChecked = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  useEffect(() => {
    const min = parseInt(searchParams.get("minPrice") || "0", 10);
    const max = parseInt(searchParams.get("maxPrice") || "0", 10);

    const matched = priceRanges.find(
      (range) =>
        range.min === min &&
        (range.max === max || (range.max === Infinity && max === 0))
    );

    setSelectedRange(matched?.value || null);
  }, [searchParams]);

  const handleChange = (value: string) => {
    const range = priceRanges.find((r) => r.value === value);
    if (!range) return;
    setSelectedRange(value);
    const newParams = new URLSearchParams(searchParams.toString());
    if (range.min > 10000) {
      newParams.set("minPrice", String(range.min));
    } else {
      newParams.delete("minPrice");
    }
    if (range.max !== Infinity && range.max != 200000) {
      newParams.set("maxPrice", String(range.max));
    } else {
      newParams.delete("maxPrice");
    }
    setSearchParams(newParams);
  };

  return (
    <Box>
      <Text size="sm" fw={500} mb="xs">
        Khoảng giá
      </Text>
      <Stack gap="xs">
        {priceRanges.map((range) => (
          <Radio
            key={range.value}
            label={range.label}
            value={range.value}
            checked={selectedRange === range.value}
            onChange={() => handleChange(range.value)}
          />
        ))}
      </Stack>
    </Box>
  );
};
