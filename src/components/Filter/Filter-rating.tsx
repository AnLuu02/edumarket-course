import { Box, Rating, Text } from "@mantine/core";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterRating = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minRating, setMinRating] = useState<number>(
    +(searchParams.get("rating") || 0)
  );
  useEffect(() => {
    setMinRating(Number(searchParams.get("rating") || 0));
  }, [searchParams]);
  useEffect(() => {
    searchParams.delete("rating");
    if (minRating) {
      searchParams.set("rating", String(minRating));
    }
    setSearchParams(searchParams);
  }, [minRating]);

  return (
    <Box>
      <Text size="sm" fw={500} mb={"xs"}>
        Xếp hạng tối thiểu
      </Text>
      <Rating size={"xl"} value={minRating} onChange={setMinRating} />
    </Box>
  );
};
