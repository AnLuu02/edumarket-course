import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Spoiler,
  Stack,
  Text,
  Tooltip,
  UnstyledButton
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { BiBrain, BiCalendar, BiHeart, BiTrash, BiUser } from "react-icons/bi";
import { BsClock, BsEye, BsFillStarFill } from "react-icons/bs";
import { CgShoppingCart } from "react-icons/cg";
import { PiShoppingCart } from "react-icons/pi";
import { Link } from "react-router-dom";
import type {
  Course,
  CourseCardProps,
  CourseViewHistory,
  SuggestedCourse
} from "../../types/course";
import { bgPrimary, USER_ID } from "../../utils/constant";
import { formatPriceLocaleVi, formatViewTime } from "../../utils/format";
import { ButtonAddToCart } from "../Button-add-to-cart";
function isSuggestedCourse(
  course: Course | SuggestedCourse
): course is SuggestedCourse {
  return (
    "reasonForSuggestion" in course &&
    "matchScore" in course &&
    "reasonForSuggestion" in course
  );
}
function isViewHistoryCourse(
  course: Course | CourseViewHistory
): course is CourseViewHistory {
  return (
    "viewCount" in course && "lastViewedAt" in course && "viewedAt" in course
  );
}
export function CourseCardHorizontal<T extends Course>({
  course,
  variant = "default",
  onViewDetails,
  onToggleFavorite,
  onRemoveFromHistory
}: CourseCardProps<T>) {
  const [favorites, setFavorites] = useLocalStorage<string[]>({
    key: "favorite-courses",
    defaultValue: []
  });
  return (
    <Card
      radius={"md"}
      key={course.id}
      className="border border-gray-200 hover:shadow-md transition-shadow"
    >
      <Group align="flex-start" gap="md">
        <Box className="relative">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            w={{ base: "100%", sm: 250, md: 250 }}
            h={200}
            radius="md"
            className="object-cover"
          />
          {course.level && (
            <Badge
              variant="gradient"
              className={`${bgPrimary} absolute top-1 left-1`}
              size="xs"
            >
              {course.level}
            </Badge>
          )}
        </Box>

        <Box className="flex-1">
          <Group justify="space-between" align="flex-start">
            <Box className="flex-1">
              {variant === "suggestion" && isSuggestedCourse(course) ? (
                <>
                  <Group gap="xs" className="mb-1">
                    <Badge size="sm" variant="light" color="green">
                      #{Math.floor(Math.random() * 10) + 1} Match
                    </Badge>
                    <Badge size="sm" variant="light" color="blue">
                      {(course.matchScore as any) || 0}% Match
                    </Badge>
                  </Group>
                  <Text fw={600} className="text-gray-900 mb-1">
                    {course.title}
                  </Text>
                  <Text size="sm" className="text-gray-600 mb-2">
                    by {course.instructor}
                  </Text>
                </>
              ) : (
                <>
                  <Link to={`/course/${course.id}`} className="no-underline">
                    <UnstyledButton className="text-left">
                      <Text
                        fw={600}
                        className="text-gray-900 hover:text-blue-600 transition-colors mb-1"
                      >
                        {course.title}
                      </Text>
                    </UnstyledButton>
                  </Link>
                  <Text size="sm" className="text-gray-600">
                    bởi <i>{course.instructor}</i>
                  </Text>
                  <Group gap="md" className="mb-2 ">
                    {variant === "viewed" && isViewHistoryCourse(course) && (
                      <>
                        <Group gap="xs">
                          <BsEye className="w-3 h-3" />
                          <Text size="xs" c={"dimmed"}>
                            Đã xem {course.viewCount} lần
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <BiCalendar className="w-3 h-3" />
                          <Text size="xs" c={"dimmed"}>
                            Xem lần cuối: {formatViewTime(course.lastViewedAt)}
                          </Text>
                        </Group>
                      </>
                    )}
                  </Group>
                </>
              )}
            </Box>

            <Box className="text-right">
              <Tooltip label={`Giá: ${formatPriceLocaleVi(course.price)}`}>
                <Text fw={700} size="lg" className="  text-blue-600">
                  {formatPriceLocaleVi(course.price)}
                </Text>
              </Tooltip>
              {course.originalPrice && (
                <Text size="sm" td="line-through" className="text-gray-400">
                  {formatPriceLocaleVi(course.originalPrice)}
                </Text>
              )}
            </Box>
          </Group>
          {variant === "default" && (
            <Spoiler
              maxHeight={40}
              showLabel="Xem thêm"
              hideLabel="Ẩn"
              className="mb-8"
            >
              <Text size="sm">{course.description}</Text>
            </Spoiler>
          )}
          {variant === "suggestion" && isSuggestedCourse(course) && (
            <Card className="bg-blue-50 border-0 mb-3 p-2">
              <Group gap="xs">
                <BiBrain className="w-4 h-4 text-blue-600" />
                <Text size="sm" className="text-blue-700">
                  {course.reasonForSuggestion}
                </Text>
              </Group>
            </Card>
          )}

          <Group gap="lg" className="mb-3">
            <Group gap="xs">
              <BsFillStarFill className="w-4 h-4 text-yellow-400 fill-current" />
              <Text size="sm" fw={500}>
                {course.rating}
              </Text>
            </Group>
            <Group gap="xs" className="text-gray-500">
              <BiUser className="w-4 h-4" />
              <Text size="sm">{course.students.toLocaleString()} học viên</Text>
            </Group>
            <Group gap="xs" className="text-gray-500">
              <BsClock className="w-4 h-4" />
              <Text size="sm">{course.duration}</Text>
            </Group>
            {course.certificate && (
              <Badge size="sm" color="orange" variant="filled">
                Có chứng chỉ
              </Badge>
            )}
          </Group>

          {variant === "suggestion" && course.userBehavior && (
            <Group gap="xs" className="mb-3">
              {course.userBehavior.viewed && (
                <Badge
                  size="xs"
                  variant="light"
                  color="gray"
                  leftSection={<BsEye className="w-2 h-2" />}
                >
                  Đã xem
                </Badge>
              )}
              {course.userBehavior.liked && (
                <Badge
                  size="xs"
                  variant="light"
                  color="red"
                  leftSection={<BiHeart className="w-2 h-2" />}
                >
                  Đã thích
                </Badge>
              )}
              {course.userBehavior.addedToCart && (
                <Badge
                  size="xs"
                  variant="light"
                  color="blue"
                  leftSection={<CgShoppingCart className="w-2 h-2" />}
                >
                  Trong giỏ hàng
                </Badge>
              )}
              {course.userBehavior.similarCoursesViewed > 0 && (
                <Badge size="xs" variant="light" color="purple">
                  {course.userBehavior.similarCoursesViewed} similar viewed
                </Badge>
              )}
            </Group>
          )}

          <Stack justify="space-between">
            <Group gap="xs">
              <Badge variant="light" size="sm">
                {course.category}
              </Badge>
              <Badge variant="light" size="sm">
                {course.level}
              </Badge>
            </Group>

            <Group gap="xs" justify="flex-end">
              <>
                <Button
                  size="sm"
                  onClick={() => onViewDetails?.(course)}
                  leftSection={<PiShoppingCart size={14} />}
                >
                  Chi tiết
                </Button>

                <Tooltip
                  label={
                    favorites.includes(course.id)
                      ? "Xóa khỏi mục yêu thích"
                      : "Yêu thích"
                  }
                >
                  <ActionIcon
                    variant={favorites.includes(course.id) ? "filled" : "light"}
                    color={favorites.includes(course.id) ? "red" : "gray"}
                    onClick={() => {
                      if (course.id && favorites.includes(course.id)) {
                        setFavorites(
                          favorites.filter((id) => id !== course.id)
                        );
                      } else {
                        setFavorites([...favorites, course.id]);
                      }
                      onToggleFavorite?.(course.id, USER_ID);
                    }}
                  >
                    <BiHeart className="w-4 h-4" />
                  </ActionIcon>
                </Tooltip>
                <ButtonAddToCart variant="icon" course={course} />
                {variant === "viewed" && (
                  <Tooltip label={"Xóa khỏi lịch sử"}>
                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => onRemoveFromHistory?.(course.id)}
                    >
                      <BiTrash className="w-4 h-4" />
                    </ActionIcon>
                  </Tooltip>
                )}
              </>
            </Group>
          </Stack>
        </Box>
      </Group>
    </Card>
  );
}
