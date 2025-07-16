import { Badge, Box, Checkbox, Spoiler, Stack, Text } from "@mantine/core";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../../utils/mock-data-render";

export const FilterCategories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll("category")
  );

  useEffect(() => {
    setSelectedCategories(searchParams.getAll("category"));
  }, [searchParams]);

  useEffect(() => {
    searchParams.delete("category");
    if (selectedCategories.length) {
      selectedCategories.forEach((category) => {
        searchParams.append("category", category);
      });
    }
    setSearchParams(searchParams);
  }, [selectedCategories]);

  return (
    <Box>
      <Text size="sm" fw={500} mb={"xs"}>
        Danh mục
      </Text>
      <Spoiler maxHeight={120} showLabel="Xem thêm" hideLabel="Hide">
        <Stack gap="xs">
          {categories.map((category, index) => (
            <Box key={index} className="flex items-center justify-between">
              <Box className="flex items-center space-x-3">
                <Checkbox
                  key={category}
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(event) => {
                    if (event.currentTarget.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    }
                  }}
                />
              </Box>
              <Badge
                variant="light"
                className="text-xs bg-gray-100 text-gray-800"
              >
                200
              </Badge>
            </Box>
          ))}
        </Stack>
      </Spoiler>
    </Box>
  );
};
