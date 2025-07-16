import {
  ActionIcon,
  Box,
  Card,
  Group,
  Pagination,
  Select,
  Text
} from "@mantine/core";

import { useMemo, useState } from "react";
import { BiListUl } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import type { Course } from "../../../types/course";

import { BsGrid3X3 } from "react-icons/bs";
import { CourseListView } from "../../../components/Course-list-view";
import SortByComponent from "../../../components/Filter/Sort-component";
export function ContentSection({
  filteredCourses,
  totalPages,
  loading
}: {
  filteredCourses: Course[];
  totalPages: number;
  loading: boolean;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "popularity";
  const sortedCourses = useMemo(() => {
    const sorted = [...filteredCourses];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.lastUpdated ?? 0).getTime() -
            new Date(a.lastUpdated ?? 0).getTime()
        );
      case "duration-short":
        return sorted.sort(
          (a, b) =>
            Number.parseInt(a.duration.split(" ")[0]) -
            Number.parseInt(b.duration.split(" ")[0])
        );
      case "duration-long":
        return sorted.sort(
          (a, b) =>
            Number.parseInt(b.duration.split(" ")[0]) -
            Number.parseInt(a.duration.split(" ")[0])
        );
      case "alphabetical":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted.sort((a, b) => b.students - a.students);
    }
  }, [filteredCourses, sortBy]);

  return (
    <Box className="h-fit">
      <Card
        withBorder
        radius={"md "}
        className="p-4 bg-white/60 backdrop-blur-sm border-0 shadow-sm mb-6 h-fit"
      >
        <Group justify="space-between" align="center">
          <Box className="hidden md:block">
            <SortByComponent />
          </Box>
          <Group gap="md">
            <Group>
              <Text size="sm" c="dimmed">
                Hiển thị:
              </Text>
              <Select
                placeholder="Pick value"
                w={80}
                size="xs"
                value={searchParams.get("limit") || "6"}
                onChange={(value) => {
                  if (value) searchParams.set("limit", value);
                  setSearchParams(searchParams);
                }}
                data={["3", "5", "6", "7", "12"]}
              />
            </Group>

            <Group gap="xs">
              <ActionIcon
                variant={viewMode === "grid" ? "filled" : "light"}
                onClick={() => setViewMode("grid")}
              >
                <BsGrid3X3 className="w-4 h-4" />
              </ActionIcon>
              <ActionIcon
                variant={viewMode === "list" ? "filled" : "light"}
                onClick={() => setViewMode("list")}
              >
                <BiListUl className="w-4 h-4" />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </Card>
      <CourseListView
        loading={loading}
        courses={sortedCourses}
        viewMode={viewMode}
      />
      <Group justify="center" className="mt-8">
        <Pagination
          total={totalPages}
          value={+(searchParams.get("page") || 1)}
          onChange={(page) => {
            searchParams.set("page", page.toString());
            setSearchParams(searchParams);
          }}
          size="lg"
          withEdges
        />
      </Group>
    </Box>
  );
}
