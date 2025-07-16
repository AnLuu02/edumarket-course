import { Badge, Box, Radio, Stack, Text } from "@mantine/core";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { levels } from "../../utils/mock-data-render";

export const FilterLevel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLevels, setSelectedLevels] = useState<string>(
    searchParams.get("level") || ""
  );
  useEffect(() => {
    setSelectedLevels(searchParams.get("level") || "");
  }, [searchParams]);
  useEffect(() => {
    searchParams.delete("level");
    if (selectedLevels) {
      searchParams.set("level", selectedLevels);
    }
    setSearchParams(searchParams);
  }, [selectedLevels]);

  return (
    <Box>
      <Text size="sm" fw={500} mb={"xs"}>
        Cấp độ
      </Text>
      <Stack gap="xs">
        {levels.map((level, index) => (
          <Box key={index} className="flex items-center justify-between">
            <Box className="flex items-center space-x-3">
              <Radio
                key={level}
                label={level}
                checked={selectedLevels.includes(level)}
                onChange={(event) => {
                  if (event.currentTarget.checked) {
                    setSelectedLevels(level);
                  }
                }}
              />
            </Box>
            <Badge
              variant="light"
              className="text-xs bg-gray-100 text-gray-800"
            >
              300
            </Badge>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
