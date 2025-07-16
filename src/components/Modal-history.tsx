import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { BiHistory } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import type { CourseViewHistory } from "../types/course";
import { onToggleFavorite } from "../utils/func-handler/toggleFavorite";
import { CourseCardHorizontal } from "./Card/Course-card-horizontal";

export function ModalHistory() {
  const [isLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "today" | "week" | "month">(
    "all"
  );
  const [viewHistory, setViewHistory] = useLocalStorage<CourseViewHistory[]>({
    key: "view-history",
    defaultValue: []
  });
  const removeFromHistory = (productId: string) => {
    const filteredHistory = viewHistory.filter((item) => item.id !== productId);
    setViewHistory([...filteredHistory]);
  };

  const clearAllHistory = () => {
    setViewHistory([]);
  };

  const getFilteredHistory = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return viewHistory.filter((item) => {
      const viewDate = new Date(item.lastViewedAt);
      if (isNaN(viewDate.getTime())) return false;
      switch (filter) {
        case "today":
          return viewDate >= today;
        case "week":
          return viewDate >= weekAgo;
        case "month":
          return viewDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const filteredHistory = getFilteredHistory();

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group gap="xs">
          {["all", "today", "week", "month"].map((filterOption) => (
            <Button
              key={filterOption}
              size="xs"
              variant={filter === filterOption ? "filled" : "light"}
              onClick={() => setFilter(filterOption as any)}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              {filterOption === "all" && ` (${viewHistory.length})`}
            </Button>
          ))}
        </Group>

        {viewHistory.length > 0 && (
          <Button
            size="xs"
            variant="subtle"
            color="red"
            leftSection={<BsTrash2 className="w-3 h-3" />}
            onClick={clearAllHistory}
          >
            Xóa tất cả
          </Button>
        )}
      </Group>

      {viewHistory.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <Group gap="xl">
            <Box className="text-center">
              <Text size="xl" fw={700} className="text-blue-600">
                {viewHistory.length}
              </Text>
              <Text size="sm" className="text-gray-600">
                Đã xem
              </Text>
            </Box>
            <Box className="text-center">
              <Text size="xl" fw={700} className="text-purple-600">
                {viewHistory.reduce((sum, item) => sum + item.viewCount, 0)}
              </Text>
              <Text size="sm" className="text-gray-600">
                Lượt xem
              </Text>
            </Box>
            <Box className="text-center">
              <Text size="xl" fw={700} className="text-green-600">
                {new Set(viewHistory.map((item) => item.category)).size}
              </Text>
              <Text size="sm" className="text-gray-600">
                Thể loại
              </Text>
            </Box>
          </Group>
        </Card>
      )}

      {isLoading ? (
        <Center className="py-12">
          <Stack align="center" gap="md">
            <ThemeIcon
              size="xl"
              variant="light"
              color="blue"
              className="animate-pulse"
            >
              <BiHistory className="w-6 h-6" />
            </ThemeIcon>
            <Text className="text-gray-600">
              Đang tải lịch sử xem của bạn...
            </Text>
          </Stack>
        </Center>
      ) : filteredHistory.length > 0 ? (
        <Stack gap="md">
          {filteredHistory.map((course, index) => (
            <CourseCardHorizontal
              key={index}
              course={course}
              variant="viewed"
              onViewDetails={() => {}}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={() => {}}
              onRemoveFromHistory={() => removeFromHistory(course.id)}
            />
          ))}
        </Stack>
      ) : (
        <Center className="py-12">
          <Stack align="center" gap="md">
            <ThemeIcon size={60} radius="xl" variant="light" color="gray">
              <BiHistory className="w-8 h-8" />
            </ThemeIcon>
            <Box className="text-center">
              <Text fw={500} className="text-gray-700 mb-2">
                {filter === "all"
                  ? "Chưa có lịch sử xem"
                  : `Không có khóa học nào được xem trong ${
                      filter === "today" ? "today" : `${filter} này`
                    }`}
              </Text>
              <Text size="sm" className="text-gray-500 mb-4">
                {filter === "all"
                  ? "Bắt đầu khám phá các khóa học để xây dựng lịch sử xem của bạn"
                  : "Hãy thử chọn một khoảng thời gian khác hoặc duyệt qua một số khóa học"}
              </Text>
              <Link to="/courses">
                <Button variant="light">Tìm kiếm khóa học</Button>
              </Link>
            </Box>
          </Stack>
        </Center>
      )}

      {viewHistory.length > 0 && (
        <>
          <Divider />
          <Group justify="center">
            <Text size="sm" className="text-gray-500">
              Lịch sử xem của bạn giúp chúng tôi cung cấp các đề xuất khóa học
              tốt hơn
            </Text>
          </Group>
        </>
      )}
    </Stack>
  );
}
