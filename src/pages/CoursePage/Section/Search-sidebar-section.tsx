import { ActionIcon, Badge, Box, Text, TextInput } from "@mantine/core";

import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { BiSearch, BiTrendingUp, BiX } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { popularSearches } from "../../../utils/mock-data-render";

export function SearchSidebarSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchDebounce] = useDebouncedValue(searchQuery, 1000);

  useEffect(() => {
    if (searchDebounce) searchParams.set("q", searchDebounce);
    setSearchParams(searchParams);
  }, [searchDebounce]);

  return (
    <>
      <Box className="relative group mb-4">
        <Text size="sm" fw={500}>
          Tìm kiếm
        </Text>
        <TextInput
          placeholder="Bạn muốn khám phá những gì..."
          leftSection={<BiSearch className="w-4 h-4" />}
          value={searchQuery}
          radius={"xl"}
          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none py-3 text-gray-700 placeholder:text-gray-500"
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          rightSection={
            searchQuery && (
              <ActionIcon
                variant="subtle"
                onClick={() => {
                  setSearchQuery("");
                  searchParams.delete("q");
                  setSearchParams(searchParams);
                }}
              >
                <BiX className="w-4 h-4" />
              </ActionIcon>
            )
          }
        />
      </Box>

      <Box className="mb-4">
        <Box className="flex items-center space-x-2 mb-3">
          <BiTrendingUp className="w-4 h-4 text-orange-500" />
          <Text className="text-sm font-medium text-gray-700">
            Tìm kiếm phổ biến
          </Text>
        </Box>
        <Box className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <Badge
              key={index}
              size="sm"
              variant="outline"
              onClick={() => setSearchQuery(search)}
              className="bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              {search}
            </Badge>
          ))}
        </Box>
      </Box>
      <Box className="mb-8">
        <Box className="flex flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-700 cursor-pointer hover:bg-green-200 transition-colors">
            Khóa học miễng phí
          </Badge>
          <Badge className="bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200 transition-colors">
            Có chứng chỉ
          </Badge>
          <Badge className="bg-orange-100 text-orange-700 cursor-pointer hover:bg-orange-200 transition-colors">
            Vừa mới phát hành
          </Badge>
        </Box>
      </Box>
    </>
  );
}
