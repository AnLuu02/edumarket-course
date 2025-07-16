import { Grid, GridCol, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { BiBookOpen } from "react-icons/bi";
import { useGlobalModal } from "../contexts/ModalContext";
import type { Course } from "../types/course";
import { onToggleFavorite } from "../utils/func-handler/toggleFavorite";
import { CardSkeleton } from "./Card/Card-skeleton";
import { CourseCardHorizontal } from "./Card/Course-card-horizontal";
import { CourseCardVertical } from "./Card/Course-card-vertical";
import { EmptyView } from "./Empty-view";
import { ModalDetailCourse } from "./Modal-detail-course";

export function CourseListView({
  loading,
  courses,
  viewMode,
  colSpan = { base: 12, sm: 6, lg: 4 }
}: {
  loading: boolean;
  courses: Course[];
  viewMode: "grid" | "list";
  colSpan?: Record<string, number>;
}) {
  const { openModal } = useGlobalModal();
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
  return viewMode === "grid" ? (
    <Grid>
      {loading ? (
        [1, 2, 3, 4].map((index) => (
          <GridCol key={index} span={colSpan}>
            <CardSkeleton />
          </GridCol>
        ))
      ) : courses.length <= 0 ? (
        <EmptyView
          title="Không có sản phẩm phù hợp"
          content=" Vui lý tìm kiếm khóa học khác."
        />
      ) : (
        courses.map((course) => (
          <GridCol key={course.id} span={colSpan}>
            <CourseCardVertical
              course={course}
              onToggleFavorite={onToggleFavorite}
            />
          </GridCol>
        ))
      )}
    </Grid>
  ) : (
    <Stack gap="md">
      {loading ? (
        [1, 2, 3].map((index) => <CardSkeleton key={index} horizontal />)
      ) : courses.length <= 0 ? (
        <EmptyView
          title="Không có sản phẩm phù hợp"
          content=" Vui lý tìm kiếm khóa học khác."
        />
      ) : (
        courses.map((course) => (
          <CourseCardHorizontal
            key={course.id}
            course={course}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      )}
    </Stack>
  );
}
