import { Box, Button, Flex, Grid, GridCol } from "@mantine/core";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { CardSkeleton } from "../../../components/Card/Card-skeleton";
import { CourseCardVertical } from "../../../components/Card/Course-card-vertical";
import { TitleCustom } from "../../../components/Title-custom";
import type { Course } from "../../../types/course";
import { onToggleFavorite } from "../../../utils/func-handler/toggleFavorite";
export function FeaturedCoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses?page=1&limit=4");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Box className="mb-20 mt-20" id="featured-courses">
      <Flex
        justify="space-between"
        align="center"
        mb={16}
        gap={"md"}
        direction={{ base: "column", sm: "row" }}
      >
        <TitleCustom title="Khóa học nổi bật" className={"mb-1"} />
        <Link to={"/courses"}>
          <Button
            variant="subtle"
            radius={"md"}
            rightSection={
              <IoIosArrowForward className="w-4 h-4 bg-transparent" />
            }
          >
            Xem tất cả
          </Button>
        </Link>
      </Flex>

      <Grid>
        {courses.length <= 0
          ? [1, 2, 3, 4].map((index) => (
              <GridCol key={index} span={{ base: 12, sm: 6, lg: 3 }}>
                <CardSkeleton />
              </GridCol>
            ))
          : courses.slice(0, 4).map((course) => (
              <GridCol key={course.id} span={{ base: 12, sm: 6, lg: 3 }}>
                <CourseCardVertical
                  course={course}
                  onToggleFavorite={onToggleFavorite}
                />
              </GridCol>
            ))}
      </Grid>
    </Box>
  );
}
