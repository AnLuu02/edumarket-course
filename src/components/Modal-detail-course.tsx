import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Progress,
  Rating,
  SimpleGrid,
  Spoiler,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Tooltip
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import {
  BiAward,
  BiBookOpen,
  BiBrain,
  BiCheckCircle,
  BiDownload,
  BiGlobe,
  BiHeart,
  BiMessageSquare,
  BiPlay,
  BiUser
} from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { FaThumbsUp } from "react-icons/fa";
import type { Course, CourseCardProps } from "../types/course";
import { bgPrimary, USER_ID } from "../utils/constant";
import { formatPriceLocaleVi } from "../utils/format";
import { ButtonAddToCart } from "./Button-add-to-cart";
export function ModalDetailCourse({
  course,
  onToggleFavorite
}: CourseCardProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: "favorite-courses",
    defaultValue: []
  });
  const [activeTab, setActiveTab] = useState<string | null>("overview");
  const ratingDistribution = [
    { stars: 5, count: 1847, percentage: 65 },
    { stars: 4, count: 692, percentage: 24 },
    { stars: 3, count: 231, percentage: 8 },
    { stars: 2, count: 69, percentage: 2 },
    { stars: 1, count: 28, percentage: 1 }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <BiPlay className="w-4 h-4" />;
      case "quiz":
        return <BiCheckCircle className="w-4 h-4" />;
      case "assignment":
        return <BiBookOpen className="w-4 h-4" />;
      case "reading":
        return <BiMessageSquare className="w-4 h-4" />;
      default:
        return <BiBookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Stack gap="lg">
      <Group align="flex-start" gap="lg">
        <Box className="relative">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            w={300}
            radius="md"
          />
          {course.level && (
            <Badge
              variant="gradient"
              className={`absolute top-2 left-2 ${bgPrimary}`}
              leftSection={<BiBrain className="w-3 h-3" />}
            >
              {course.level}
            </Badge>
          )}
        </Box>

        <Box className="flex-1">
          <Group justify="space-between" align="flex-start">
            <Box>
              <Text fw={700} size="xl" className="text-gray-900 mb-2">
                {course.title}
              </Text>
              <Text size="sm" c={"dimmed"} mb={2} fs={"italic"}>
                by {course.instructor}
              </Text>
              <Group gap="md" className="mb-3">
                <Group gap="xs">
                  <BsFillStarFill className="w-4 h-4 text-yellow-400 fill-current" />
                  <Text fw={500}>{course.rating}</Text>
                  <Text className="text-gray-500">
                    ({course.reviews.toLocaleString()} đánh giá)
                  </Text>
                </Group>
                <Group gap="xs" className="text-gray-500">
                  <BiUser className="w-4 h-4" />
                  <Text>{course.students.toLocaleString()} học viên</Text>
                </Group>
              </Group>
            </Box>
          </Group>

          <Flex
            justify={"space-between"}
            direction={{ base: "column", sm: "row" }}
            align={"center"}
            gap="md"
          >
            <Flex direction={"column"}>
              <Flex justify={"center"} align={"center"} gap={2}>
                <Tooltip label={`Giá: ${formatPriceLocaleVi(course.price)}`}>
                  <Text fw={700} size="xl" className="  text-blue-600">
                    {formatPriceLocaleVi(course.price)}
                  </Text>
                </Tooltip>
                {course.originalPrice && (
                  <Text size="sm" c={"dimmed"} className=" line-through">
                    {formatPriceLocaleVi(course.originalPrice)}
                  </Text>
                )}
              </Flex>
              {course.originalPrice && (
                <Text size="xs" className=" text-green-600 font-medium">
                  Tiết kiệm:{" "}
                  {formatPriceLocaleVi(course.originalPrice - course.price)}
                </Text>
              )}
            </Flex>

            <Group>
              <Tooltip
                label={
                  favorites.includes(course.id)
                    ? "Xóa khỏi mục yêu thích"
                    : "Yêu thích"
                }
              >
                <ActionIcon
                  size="lg"
                  variant={favorites.includes(course.id) ? "filled" : "light"}
                  color={favorites.includes(course.id) ? "red" : "gray"}
                  onClick={() => {
                    if (course.id && favorites.includes(course.id)) {
                      setFavorites(favorites.filter((id) => id !== course.id));
                    } else {
                      setFavorites([...favorites, course.id]);
                    }
                    onToggleFavorite?.(course.id, USER_ID);
                  }}
                >
                  <BiHeart className="w-5 h-5" />
                </ActionIcon>
              </Tooltip>
              <ButtonAddToCart
                course={course as Course}
                styles={{
                  size: "md"
                }}
              />
            </Group>
          </Flex>
        </Box>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 4 }}>
        <Card className="bg-blue-50 border-0">
          <Group gap="xs">
            <CgLock className="w-5 h-5 text-blue-600" />
            <Box>
              <Text fw={600} className="text-blue-900">
                {course.duration}
              </Text>
              <Text size="sm" className="text-blue-700">
                Tổng thời lượng
              </Text>
            </Box>
          </Group>
        </Card>
        <Card className="bg-green-50 border-0">
          <Group gap="xs">
            <BiAward className="w-5 h-5 text-green-600" />
            <Box>
              <Text fw={600} className="text-green-900">
                {course.level}
              </Text>
              <Text size="sm" className="text-green-700">
                Trình độ kỹ năng
              </Text>
            </Box>
          </Group>
        </Card>
        <Card className="bg-purple-50 border-0">
          <Group gap="xs">
            <BiGlobe className="w-5 h-5 text-purple-600" />
            <Box>
              <Text fw={600} className="text-purple-900">
                Tiếng anh
              </Text>
              <Text size="sm" className="text-purple-700">
                Ngôn ngữ
              </Text>
            </Box>
          </Group>
        </Card>
        {course.certificate && (
          <Card className="bg-orange-50 border-0">
            <Group gap="xs">
              <BiDownload className="w-5 h-5 text-orange-600" />
              <Box>
                <Text fw={600} className="text-red-500">
                  Có chứng chỉ
                </Text>
                <Text size="sm" className="text-orange-700">
                  Đã bao gồm
                </Text>
              </Box>
            </Group>
          </Card>
        )}
      </SimpleGrid>

      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        classNames={{ tab: "mb-4 md:mb-0" }}
      >
        <Tabs.List>
          <Tabs.Tab value="overview">Tổng quan</Tabs.Tab>
          <Tabs.Tab value="curriculum">Chương trình giảng dạy</Tabs.Tab>
          <Tabs.Tab value="reviews">Đánh giá ({course.reviews})</Tabs.Tab>
          <Tabs.Tab value="instructor">Người hướng dẫn</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview" className="pt-4">
          <Stack gap="md">
            <Box>
              <Text fw={600} size="lg" className="mb-3">
                Mô tả khóa học
              </Text>
              <Spoiler maxHeight={150} showLabel="Xem thêm" hideLabel="Ẩn">
                <Text className="text-gray-700 leading-relaxed mb-4">
                  {course.description}
                </Text>
              </Spoiler>
              <Text className="text-gray-700 leading-relaxed">
                Khóa học toàn diện này được thiết kế nhằm giúp bạn nâng cao kỹ
                năng giao tiếp và làm việc trong môi trường giáo dục thông qua
                các bài học tương tác, tình huống thực tế và phản hồi hỗ trợ bởi
                AI. Bạn sẽ được trang bị kiến thức nền tảng, kỹ năng viết chuyên
                nghiệp, và kỹ năng thuyết trình hiệu quả, từ đó tăng cường sự tự
                tin trong học tập và giảng dạy.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Text fw={600} size="lg" className="mb-3">
                Những gì bạn sẽ được học
              </Text>
              <Stack gap="xs">
                {course.whatYouWillLearn.map((item, index) => (
                  <Group key={index} gap="xs">
                    <BiCheckCircle className="w-4 h-4 text-green-600" />
                    <Text size="sm">{item}</Text>
                  </Group>
                ))}
              </Stack>
            </Box>

            <Divider />

            <Flex align={"center"} gap={"xs"}>
              <Text fw={600} size="lg">
                Tags:
              </Text>
              <Group gap="xs">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Flex>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="curriculum" className="pt-4">
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={600} size="lg">
                Chương trình giảng dạy
              </Text>
              <Badge variant="light">{course.curriculum.length} bài học</Badge>
            </Group>

            <Stack gap="xs">
              {course.curriculum.map((item, index) => (
                <Card key={item.id} className="border border-gray-200">
                  <Group justify="space-between">
                    <Group gap="md">
                      <Text fw={500} size="sm" className="text-gray-500">
                        {index + 1}.
                      </Text>
                      <ThemeIcon variant="light" size="sm">
                        {getTypeIcon(item.type)}
                      </ThemeIcon>
                      <Box>
                        <Text fw={500}>{item.title}</Text>
                        <Text size="sm" className="text-gray-600">
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}{" "}
                          • {item.duration}
                        </Text>
                      </Box>
                    </Group>
                    {item.preview && (
                      <Badge size="sm" variant="light" color="blue">
                        Preview
                      </Badge>
                    )}
                  </Group>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="reviews" className="pt-4">
          <Stack gap="md">
            <Card className="bg-gray-50 border-0">
              <Grid>
                <GridCol span={{ base: 12, sm: 4 }}>
                  <Box className="text-center flex items-center flex-col  sm:items-start">
                    <Text fw={700} className="text-gray-900 text-3xl">
                      {course.rating}
                    </Text>
                    <Rating
                      value={course.rating}
                      readOnly
                      size="lg"
                      className="mb-2"
                    />
                    <Text size="sm" className="text-gray-600">
                      {course.reviews.toLocaleString()} đánh giá
                    </Text>
                  </Box>
                </GridCol>

                <GridCol span={{ base: 12, sm: 8 }}>
                  <Box className="flex-1">
                    {ratingDistribution.map((item) => (
                      <Group key={item.stars} gap="md" className="mb-2">
                        <Group gap="xs" className="w-16">
                          <Text size="sm">{item.stars}</Text>
                          <BsFillStarFill className="w-3 h-3 text-yellow-400 fill-current" />
                        </Group>
                        <Progress value={item.percentage} className="flex-1" />
                        <Text size="sm" className="w-12 text-gray-600">
                          {item.count}
                        </Text>
                      </Group>
                    ))}
                  </Box>
                </GridCol>
              </Grid>
            </Card>

            <Stack gap="md">
              {course.courseReviews.map((review) => (
                <Card key={review.id} className="border border-gray-200">
                  <Group justify="flex-start" gap={"xl"}>
                    <Avatar src={review.avatar} size="md" radius="xl" />
                    <Box className="flex-1">
                      <Group justify="space-between" className="mb-2">
                        <Box>
                          <Text fw={500}>{review.user}</Text>
                          <Group gap="xs">
                            <Rating value={review.rating} readOnly size="sm" />
                            <Text size="sm" className="text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </Text>
                          </Group>
                        </Box>
                      </Group>
                      <Text className="text-gray-700 mb-3">
                        {review.comment}
                      </Text>
                      <Group gap="xs">
                        <Button
                          variant="subtle"
                          size="xs"
                          leftSection={<FaThumbsUp className="w-3 h-3" />}
                        >
                          Helpful ({review.helpful})
                        </Button>
                      </Group>
                    </Box>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="instructor" className="pt-4">
          <Card className="border border-gray-200">
            <Grid>
              <GridCol span={{ base: 12, sm: 3 }}>
                <Avatar
                  size="xl"
                  radius="xl"
                  src="/placeholder.svg?height=80&width=80"
                />
              </GridCol>
              <GridCol span={{ base: 12, sm: 9 }}>
                <Box className="flex-1">
                  <Text fw={600} size="lg" className="mb-2">
                    {course.instructor}
                  </Text>
                  <Text className="text-gray-600 mb-3">
                    {course.instructorDetail.specialization}
                  </Text>
                  <Group gap="lg" className="mb-4">
                    <Group gap="xs">
                      <BsFillStarFill className="w-4 h-4 text-yellow-400 fill-current" />
                      <Text fw={500}>{course.instructorDetail.rating}</Text>
                    </Group>
                    <Group gap="xs">
                      <BiUser className="w-4 h-4 text-gray-500" />
                      <Text>{course.instructorDetail.students}+ học viên</Text>
                    </Group>
                    <Group gap="xs">
                      <BiBookOpen className="w-4 h-4 text-gray-500" />
                      <Text>{course.instructorDetail.courses} khóa học</Text>
                    </Group>
                  </Group>
                  <Text className="text-gray-700 leading-relaxed">
                    {course.instructorDetail.bio}
                  </Text>
                </Box>
              </GridCol>
            </Grid>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
