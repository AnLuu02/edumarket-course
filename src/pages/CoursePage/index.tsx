import { Box, Container, Grid, GridCol } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BreadcrumbsBase } from "../../components/Breadcrumb";
import type { CourseResponse } from "../../types/course";
import { NotifyError } from "../../utils/func-handler/notify";
import { ContentSection } from "./Section/Content-section";
import { SidebarSection } from "./Section/Sidebar-section";
import { SummarySection } from "./Section/Summary-section";

export default function CoursePage() {
  const [coursesResponse, setCoursesResponse] = useState<CourseResponse>({
    page: 1,
    limit: 3,
    total: 0,
    totalPages: 0,
    courses: []
  });

  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      let categories = searchParams.getAll("category");
      try {
        const query = {
          page: searchParams.get("page") || "1",
          limit: searchParams.get("limit") || "6",
          q: searchParams.get("q") || "",
          sortBy: searchParams.get("sortBy") || "",
          minPrice: searchParams.get("minPrice") || "",
          maxPrice: searchParams.get("maxPrice") || "",
          level: searchParams.get("level") || "",
          rating: searchParams.get("rating") || "",
          categories: categories.join(",")
        };

        const queryString = new URLSearchParams(query).toString();

        const response = await axios.get(`/api/courses?${queryString}`);
        setCoursesResponse(response.data);
      } catch (error) {
        NotifyError(
          "Có lỗi không mong muốn😥",
          "Không thể tải danh sách khóa học. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams.toString()]);

  return (
    <>
      <Box className="bg-white border-b sticky top-[70px] z-[40] border-t border-gray-100 shadow-md  ">
        <Container size="xl" className=" py-3">
          <BreadcrumbsBase />
        </Container>
      </Box>
      <Container size="xl" className="py-8">
        <SummarySection coursesResponse={coursesResponse} />
        <Grid pos={"relative"} h={"100%"} overflow="unset">
          <GridCol
            span={{ base: 12, md: 4, lg: 3 }}
            className="z-[20] right-0 top-[13px] md:top-[17px] lg:top-[120px] xl:top-[120px] sm:left-[30%] lg:left-0 absolute lg:sticky lg:h-fit"
          >
            <SidebarSection />
          </GridCol>
          <GridCol span={{ base: 12, md: 8, lg: 9 }} className="h-fit ">
            <ContentSection
              filteredCourses={coursesResponse.courses}
              totalPages={coursesResponse.totalPages}
              loading={loading}
            />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
}
