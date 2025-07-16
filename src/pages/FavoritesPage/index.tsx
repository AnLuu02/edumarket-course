import {
  ActionIcon,
  Box,
  Card,
  CardSection,
  Center,
  Container,
  Flex,
  Pagination,
  SimpleGrid,
  Text,
  Title
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BiAward,
  BiBookOpen,
  BiHeart,
  BiListUl,
  BiTrendingUp
} from "react-icons/bi";
import { BsClock, BsGrid3X3 } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { CourseListView } from "../../components/Course-list-view";
import { FilterPriceInput } from "../../components/Filter/Filter-price-input";
import SortByComponent from "../../components/Filter/Sort-component";
import type { CourseResponse } from "../../types/course";
import { SuggestedCoursesSection } from "./Section/Suggested-courses-section";

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favoriteCoursesResponse, setFavoriteCoursesResponse] =
    useState<CourseResponse>({
      page: 0,
      limit: 0,
      total: 0,
      totalPages: 0,
      courses: []
    });

  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const query = {
          t: "favorite",
          page: searchParams.get("page") || "1",
          limit: searchParams.get("limit") || "6",
          q: searchParams.get("q") || "",
          sortBy: searchParams.get("sortBy") || "",
          minPrice: searchParams.get("minPrice") || "",
          maxPrice: searchParams.get("maxPrice") || ""
        };

        const queryString = new URLSearchParams(query).toString();
        const favoriteResponse = await axios.get(`/api/courses?${queryString}`);
        if (!favoriteResponse) {
          return;
        }
        setFavoriteCoursesResponse(favoriteResponse.data);
      } catch (error) {
        console.error("Error fetching favorite courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <Container size="xl" className="py-8 ">
      <Box className="mb-8">
        <Flex
          align={{ base: "center", sm: "start", md: "center" }}
          direction={{ base: "column", sm: "column", md: "row" }}
          justify={"space-between"}
          mb={"xl"}
        >
          <Flex
            direction={"column"}
            align={{ base: "center", sm: "start" }}
            justify={"center"}
          >
            <Title className=" font-bold text-gray-900 mb-2">
              Khóa học yêu thích
            </Title>
            <Text className="text-gray-600 flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-full">
              <BiHeart className="w-4 h-4 text-red-500" />
              {favoriteCoursesResponse.courses.length || 0} khóa học yêu thích
              của bạn
            </Text>
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row", md: "row" }}
            align={"center"}
            justify={{ base: "center", sm: "space-between" }}
            gap={"md"}
            w={{ base: "100%", md: "auto" }}
            mt={"md"}
          >
            <Flex
              w={{ base: "100%", md: 300, lg: 400 }}
              gap={"xs"}
              align={"end"}
              mr={{ base: 0, sm: "md" }}
              pos={"relative"}
            >
              <FilterPriceInput
                styleBtn="w-[30%] sm:w-[25%] md:w-[30%] px-0"
                errorMessage={(message) => (
                  <Box
                    className="absolute bottom-[-30px] left-0 shadow-md rounded-md bg-gray-100 animate-bounce z-10"
                    p={4}
                    px={10}
                  >
                    <Text size="sm" c={"red"}>
                      {message}
                    </Text>
                  </Box>
                )}
              />
            </Flex>

            <Flex gap="xs" align="end" justify="space-between">
              <SortByComponent label={"Sắp xếp theo"} />
              <ActionIcon
                size={"lg"}
                variant={viewMode === "grid" ? "filled" : "light"}
                onClick={() => setViewMode("grid")}
              >
                <BsGrid3X3 className="w-4 h-4" />
              </ActionIcon>
              <ActionIcon
                size={"lg"}
                variant={viewMode === "list" ? "filled" : "light"}
                onClick={() => setViewMode("list")}
              >
                <BiListUl className="w-4 h-4" />
              </ActionIcon>
            </Flex>
          </Flex>
        </Flex>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 4 }}
          spacing={"md"}
          className="mb-6"
        >
          <Card
            radius={"md"}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0"
          >
            <CardSection className="p-4">
              <Box className="flex items-center justify-between">
                <Box>
                  <Text className="text-blue-100 text-sm">
                    Tổng số khóa học
                  </Text>
                  <Text className="text-2xl font-bold">
                    {favoriteCoursesResponse.courses.length || 0}
                  </Text>
                </Box>
                <BiBookOpen className="w-8 h-8 text-blue-200" />
              </Box>
            </CardSection>
          </Card>
          <Card
            radius={"md"}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
          >
            <CardSection className="p-4">
              <Box className="flex items-center justify-between">
                <Box>
                  <Text className="text-green-100 text-sm">Hoàn thành</Text>
                  <Text className="text-2xl font-bold">0</Text>
                </Box>
                <BiAward className="w-8 h-8 text-green-200" />
              </Box>
            </CardSection>
          </Card>
          <Card
            radius={"md"}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0"
          >
            <CardSection className="p-4">
              <Box className="flex items-center justify-between">
                <Box>
                  <Text className="text-purple-100 text-sm">Đang học</Text>
                  <Text className="text-2xl font-bold">0</Text>
                </Box>
                <BiTrendingUp className="w-8 h-8 text-purple-200" />
              </Box>
            </CardSection>
          </Card>
          <Card
            radius={"md"}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0"
          >
            <CardSection className="p-4">
              <Box className="flex items-center justify-between">
                <Box>
                  <Text className="text-orange-100 text-sm">
                    Tổng số giờ học
                  </Text>
                  <Text className="text-2xl font-bold">0</Text>
                </Box>
                <BsClock className="w-8 h-8 text-orange-200" />
              </Box>
            </CardSection>
          </Card>
        </SimpleGrid>
      </Box>

      <Box mb={"xl"}>
        <CourseListView
          loading={loading}
          courses={favoriteCoursesResponse.courses}
          viewMode={viewMode}
          colSpan={{ base: 12, sm: 6, lg: 3 }}
        />
      </Box>
      <Center>
        <Pagination
          total={favoriteCoursesResponse.totalPages}
          value={+(searchParams.get("page") || 1)}
          onChange={() => {
            searchParams.set("page", String(searchParams.get("page") || 1));
            setSearchParams(searchParams);
          }}
        />
      </Center>

      <SuggestedCoursesSection />
    </Container>
  );
}
