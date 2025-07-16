import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  ThemeIcon,
  Tooltip
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { BiBookOpen, BiHeart } from "react-icons/bi";
import { BsClock, BsRainbow } from "react-icons/bs";
import { PiShoppingCart, PiUsers } from "react-icons/pi";
import { useGlobalModal } from "../../contexts/ModalContext";
import type {
  Course,
  CourseCardProps,
  CourseViewHistory
} from "../../types/course";
import { bgPrimary, USER_ID } from "../../utils/constant";
import { formatPriceLocaleVi } from "../../utils/format";
import { ModalDetailCourse } from "../Modal-detail-course";

export function CourseCardVertical({
  course,
  onToggleFavorite
}: CourseCardProps) {
  const { openModal } = useGlobalModal();
  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: "favorite-courses",
    defaultValue: []
  });
  const [viewHistory, setViewHistory] = useLocalStorage<CourseViewHistory[]>({
    key: "view-history",
    defaultValue: []
  });
  const onViewCard = (course: Course) => {
    const existingCourse = viewHistory.find(
      (item: Course) => item.id === course.id
    );
    if (existingCourse) {
      existingCourse.viewCount += 1;
      existingCourse.lastViewedAt = new Date().toISOString();
      setViewHistory([...viewHistory]);
    } else {
      setViewHistory((prev) => [
        ...prev,
        {
          ...course,
          viewedAt: new Date().toISOString(),
          viewCount: 1,
          lastViewedAt: new Date().toISOString()
        }
      ]);
    }
    openModal(
      <ModalDetailCourse
        course={course}
        onToggleFavorite={onToggleFavorite as any}
      />,
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
      <Card
        shadow="md"
        radius="md"
        pos={"relative"}
        className="
        group
        h-full bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <Card.Section>
          <Box className="relative">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              h={200}
              className="w-full h-40 object-cover rounded-t-md"
            />
            {/* <Box className="absolute bottom-3 left-3 right-3">
              <Box className="bg-black/70 rounded-lg p-2">
                <Box className="flex items-center justify-between text-white text-sm mb-1">
                  <Text size="sm">Progress</Text>
                  <Text size="sm">20%</Text>
                </Box>
                <Box className="w-full bg-gray-600 rounded-full h-2">
                  <Box
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `20%` }}
                  ></Box>
                </Box>
              </Box>
            </Box> */}
            {course.level && (
              <Badge
                variant="gradient"
                className={`${bgPrimary} absolute top-2 left-2`}
                leftSection={<BsRainbow className="w-3 h-3" />}
              >
                {course.level}
              </Badge>
            )}
            <Box className="absolute top-2 right-2">
              <Tooltip
                label={
                  favorites.includes(course.id)
                    ? "Xóa khỏi mục yêu thích"
                    : "Yêu thích"
                }
              >
                <ActionIcon
                  color={favorites.includes(course.id) ? "red" : "white"}
                  radius={"md"}
                  size={"lg"}
                  className="hover:bg-red-400  transition-all duration-300"
                  onClick={() => {
                    if (course.id && favorites.includes(course.id)) {
                      setFavorites(favorites.filter((id) => id !== course.id));
                    } else {
                      setFavorites([...favorites, course.id]);
                    }
                    onToggleFavorite?.(course.id, USER_ID);
                  }}
                >
                  <BiHeart
                    color={favorites.includes(course.id) ? "white" : "black"}
                    className={`w-4 h-4`}
                  />
                </ActionIcon>
              </Tooltip>
            </Box>
          </Box>
        </Card.Section>

        <Stack gap={8} py="xs" px={0}>
          <Box>
            <Text fw={600} className="text-gray-900 line-clamp-2 mb-1">
              {course.title}
            </Text>
            <Flex w={"100%"} align={"center"} gap={"md"}>
              <Group gap={"xs"} my={5}>
                <Avatar
                  size={"sm"}
                  src={course.image}
                  className="object-cover"
                  alt={course.instructor}
                />
                <Text size="xs" c="dimmed" className="flex items-center gap-1">
                  {course.instructor}
                </Text>
              </Group>
              {course.certificate && (
                <Badge size="sm" color="orange" variant="filled">
                  Có chứng chỉ
                </Badge>
              )}
            </Flex>
          </Box>

          <Stack mb={"xs"}>
            <Group gap="md">
              <Group gap="xs">
                <Rating value={course.rating} readOnly size="sm" />
                <Text size="sm" fw={500}>
                  {course.rating}
                </Text>
                <Text size="sm" c="dimmed">
                  ({course.reviews.toLocaleString()})
                </Text>
              </Group>
            </Group>
            <Group justify="space-between">
              <Group gap="4" className="text-gray-500">
                <PiUsers className="w-4 h-4" />
                <Text size="sm">
                  {course.students.toLocaleString()} học viên
                </Text>
              </Group>
              <Group gap={4} className="text-gray-500">
                <BsClock className="w-3 h-3" />
                <Text size="sm">{course.duration}</Text>
              </Group>
            </Group>
          </Stack>

          <Group gap="xs">
            {course.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="light" size="sm">
                {tag}
              </Badge>
            ))}
          </Group>

          <Group justify="space-between" align="center" mt={"xs"}>
            <Flex direction={"column"}>
              <Flex justify={"center"} align={"center"} gap={2}>
                <Tooltip label={`Giá: ${formatPriceLocaleVi(course.price)}`}>
                  <Text
                    fw={700}
                    size="lg"
                    className="  text-blue-600"
                    lineClamp={1}
                  >
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
                  Tiết kiệm{" "}
                  {formatPriceLocaleVi(course.originalPrice - course.price)}
                </Text>
              )}
            </Flex>
            <Button
              size="sm"
              onClick={() => onViewCard(course)}
              leftSection={<PiShoppingCart size={14} />}
            >
              Chi tiết
            </Button>
          </Group>
        </Stack>

        <Center>
          <Button
            pos={"absolute"}
            className="xl:opacity-0 xl:translate-y-6 xl:group-hover:opacity-100 xl:group-hover:translate-y-0 
             transition-all duration-300 ease-out"
            bottom={-16}
            radius="xl"
            size="md"
            color="red"
            pb={16}
          >
            Khám phá
          </Button>
        </Center>
      </Card>
    </>
  );
}
