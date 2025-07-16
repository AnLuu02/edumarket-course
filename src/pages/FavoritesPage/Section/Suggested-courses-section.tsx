import {
  Box,
  Button,
  Flex,
  Grid,
  GridCol,
  Group,
  Text,
  ThemeIcon,
  Title
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import { Link } from "react-router-dom";
import { CourseCardHorizontal } from "../../../components/Card/Course-card-horizontal";
import { ModalDetailCourse } from "../../../components/Modal-detail-course";
import { useGlobalModal } from "../../../contexts/ModalContext";
import type { Course, SuggestedCourse } from "../../../types/course";
import { bgPrimary } from "../../../utils/constant";
import { onToggleFavorite } from "../../../utils/func-handler/toggleFavorite";

export function SuggestedCoursesSection() {
  const [suggestedCourses, setSuggestedCourses] = useState<SuggestedCourse[]>(
    []
  );

  const { openModal } = useGlobalModal();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const suggestionResponse = await axios.get(
          "/api/suggestions?userId=123"
        );

        const suggestions = suggestionResponse.data.suggestions;
        if (!suggestions) {
          return;
        }

        setSuggestedCourses(suggestions);
      } catch (error) {
        console.error("Error fetching favorite courses:", error);
      }
    };
    fetchData();
  }, []);

  const onViewDetails = (course: Course) => {
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
    <Box className="mb-12 mt-16 md:mt-24">
      <Flex
        align={"center"}
        justify={"space-between"}
        gap={"md"}
        mb={16}
        direction={{ base: "column", sm: "row", md: "row" }}
      >
        <Title order={2} className=" font-bold text-gray-900">
          Có thể bạn sẽ thích
        </Title>
        <Link to="/course?category=Speaking" className="no-underline">
          <Button size="md" className={bgPrimary} variant="gradient">
            Khám phá thêm khóa học
          </Button>
        </Link>
      </Flex>
      <Text size="md" className="text-gray-600 mb-6 text-center md:text-left">
        Dựa trên mục yêu thích của bạn, chúng tôi khuyên bạn nên khám phá các
        khóa học trò chuyện hỗ trợ bởi AI của chúng tôi.
      </Text>

      <Grid>
        {suggestedCourses.map((course) => (
          <GridCol span={12}>
            <CourseCardHorizontal
              variant="suggestion"
              key={course.id}
              course={course}
              onViewDetails={onViewDetails}
              onToggleFavorite={onToggleFavorite}
            />
          </GridCol>
        ))}
      </Grid>
    </Box>
  );
}
