import { Group, Select } from "@mantine/core";
import { PiSortAscending } from "react-icons/pi";

import { useSearchParams } from "react-router-dom";

export default function SortByComponent({ label }: { label?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Group>
      <Select
        placeholder="Sắp xếp theo"
        w={200}
        label={label}
        leftSection={<PiSortAscending size={16} />}
        data={[
          { value: "popularity", label: " Phổ biến nhất" },
          { value: "rating", label: "Đánh giá cao nhất" },
          { value: "price-low", label: "Giá: Thấp đến Cao" },
          { value: "price-high", label: "Giá: Cao đến Thấp" },
          { value: "newest", label: "Mới nhất" },
          { value: "duration-short", label: "Thời lượng: Ngắn đến Dài" },
          { value: "duration-long", label: "Thời lượng: Dài đến Ngắn" },
          { value: "alphabetical", label: "Tên A-Z" }
        ]}
        value={searchParams.get("sortBy") || ""}
        onChange={(value) => {
          if (!value) return;
          setSearchParams((prev) => {
            const params = Object.fromEntries(prev.entries());
            return { ...params, sortBy: value };
          });
        }}
      />
    </Group>
  );
}
