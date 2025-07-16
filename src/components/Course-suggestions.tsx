import {
  Box,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Modal,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiBookOpen, BiTrendingUp } from "react-icons/bi";
import { GiLightBulb } from "react-icons/gi";
import { useGlobalModal } from "../contexts/ModalContext";
import type { SuggestedCourse } from "../types/course";
import { bgPrimary } from "../utils/constant";
import { onToggleFavorite } from "../utils/func-handler/toggleFavorite";
import { CourseCardHorizontal } from "./Card/Course-card-horizontal";
import { ModalDetailCourse } from "./Modal-detail-course";

export function ProductSuggestions({
  opened,
  onClose
}: {
  opened: boolean;
  onClose: () => void;
}) {
  const { openModal } = useGlobalModal();
  const [suggestions, setSuggestions] = useState<SuggestedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (opened) {
      fetchSuggestions("123");
    }
  }, [opened]);

  const fetchSuggestions = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/suggestions?userId=" + userId);
      const data = response.data;
      if (!data) {
        return;
      }
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const onViewCard = (course: SuggestedCourse) => {
    openModal(
      <ModalDetailCourse course={course} onToggleFavorite={onToggleFavorite} />,
      <Group gap="xs">
        <ThemeIcon variant="light" color="blue" size="sm">
          <BiBookOpen className="w-4 h-4" />
        </ThemeIcon>
        <Text fw={600} size="lg">
          Chi tiết khóa học
        </Text>
      </Group>
    );
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        className="z-[10000"
        title={
          <Group gap="xs">
            <ThemeIcon variant="gradient" className={bgPrimary} size="sm">
              <GiLightBulb className="w-4 h-4" />
            </ThemeIcon>
            <Text fw={600} size="lg">
              Đề xuất cho bạn
            </Text>
          </Group>
        }
        size="xl"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {isLoading ? (
          <Center className="py-12">
            <Stack align="center" gap="md">
              <Loader size="lg" variant="dots" />
              <Text className="text-gray-600">
                Đang phân tích sở thích học tập của bạn...
              </Text>
              <Text size="sm" className="text-gray-500">
                Tìm khóa học hoàn hảo cho bạn dựa trên hoạt động của bạn{" "}
              </Text>
            </Stack>
          </Center>
        ) : (
          <Stack gap="lg">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <Group gap="md">
                <ThemeIcon size="lg" variant="light" color="blue">
                  <BiTrendingUp className="w-6 h-6" />
                </ThemeIcon>
                <Box>
                  <Text fw={600} className="text-gray-900">
                    Đề xuất được hỗ trợ bởi AI của EduMarket
                  </Text>
                  <Text size="sm" className="text-gray-600">
                    Dựa trên các khóa học bạn đã xem, mục yêu thích và mô hình
                    học tập
                  </Text>
                </Box>
              </Group>
            </Card>

            <Stack gap="md">
              {suggestions.map((course, index) => (
                <CourseCardHorizontal
                  key={index}
                  course={course}
                  variant="suggestion"
                  onViewDetails={onViewCard}
                  onToggleFavorite={onToggleFavorite}
                  onAddToCart={() => {}}
                  onRemoveFromHistory={() => {}}
                />
              ))}
            </Stack>

            <Divider />
            <Group justify="center">
              <Text size="sm" className="text-gray-500">
                Cập nhật đề xuất dựa trên hoạt động học tập của bạn
              </Text>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  );
}
