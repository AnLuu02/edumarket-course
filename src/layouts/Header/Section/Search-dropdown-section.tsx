import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Highlight,
  Image,
  Loader,
  Paper,
  ScrollAreaAutosize,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
  UnstyledButton
} from "@mantine/core";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  BiBookOpen,
  BiHistory,
  BiSearch,
  BiStar,
  BiTrendingUp,
  BiUser,
  BiX
} from "react-icons/bi";
import { BsFillStarFill, BsRainbow } from "react-icons/bs";
import { CgLock } from "react-icons/cg";
import { FiRefreshCcw } from "react-icons/fi";
import { GiLightBulb, GiSparkles } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { ProductSuggestions } from "../../../components/Course-suggestions";
import type { Course, InstructorDetail } from "../../../types/course";
import type { Category } from "../../../types/other";
import { bgPrimary } from "../../../utils/constant";
import { formatPriceLocaleVi } from "../../../utils/format";
import {
  mockCategories,
  trendingSearches
} from "../../../utils/mock-data-render";

export function SearchDropdownSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<InstructorDetail[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<
    "all" | "courses" | "instructors" | "categories"
  >("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [searchDebounce] = useDebouncedValue(query, 1000);

  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>({
    key: "recentSearches",
    defaultValue: []
  });

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const searchResponse = await axios.get(
            `/api/courses?q=${encodeURIComponent(query)}`
          );
          if (!searchResponse) {
            return;
          }
          setResults(searchResponse.data.courses);
        } catch (error) {
          console.error("Error fetching courses:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setResults([]);
      setInstructors([]);
      setCategories([]);
      setIsLoading(false);
    }
  }, [searchDebounce]);

  const handleClearSearch = () => {
    setQuery("");
    setActiveTab("all");
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      setRecentSearches([...recentSearches, query]);
      window.location.href = `/courses?q=${encodeURIComponent(query)}`;
    }
  };

  const totalResults = results.length + instructors.length + categories.length;

  return (
    <>
      <Box className="relative w-full">
        <TextInput
          ref={inputRef}
          placeholder="Search courses, instructors, or topics..."
          leftSection={<BiSearch className="w-4 h-4 text-gray-400" />}
          rightSectionProps={{ style: { marginRight: "50px" } }}
          rightSection={
            <Group gap="xs">
              {query && (
                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={handleClearSearch}
                  c={"black"}
                >
                  <BiX className="w-4 h-4" />
                </ActionIcon>
              )}
            </Group>
          }
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="w-full "
          radius={"xl"}
          size="md"
          styles={{
            input: {
              paddingRight: "80px"
            }
          }}
        />

        <Box className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button
            size="sm"
            onClick={() => {
              if (!query) {
                inputRef.current?.focus();
              } else {
                handleSearchSubmit();
              }
            }}
            radius={"xl"}
            className="bg-gradient-to-r  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2  shadow-md hover:shadow-lg transition-all duration-300"
          >
            <BiSearch className="w-4 h-4" />
          </Button>
        </Box>
        {isOpen && (
          <Paper
            shadow="md"
            withBorder
            className="absolute top-full left-0 right-0 mt-2 shadow-2xl border-0 z-50 overflow-hidden"
            radius="md"
            style={{ maxHeight: "80vh" }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ScrollAreaAutosize offsetScrollbars mah={500} scrollbarSize={8}>
              {query.length > 0 ? (
                <Box>
                  <Box className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                    <Group justify="space-between" align="center">
                      <Group gap="xs">
                        <ThemeIcon size="sm" variant="light" color="blue">
                          <BiSearch className="w-3 h-3" />
                        </ThemeIcon>
                        <Text size="sm" fw={500} className="text-gray-700">
                          Kết quả tìm kiếm cho "{query}"
                        </Text>
                      </Group>
                      {isLoading ? (
                        <Loader size="xs" />
                      ) : (
                        <Badge variant="light" size="sm">
                          {totalResults} kết quả
                        </Badge>
                      )}
                    </Group>

                    {totalResults > 0 && (
                      <Group gap="xs" className="mt-3">
                        <UnstyledButton
                          onClick={() => setActiveTab("all")}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            activeTab === "all"
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          All ({totalResults})
                        </UnstyledButton>
                        {results.length > 0 && (
                          <UnstyledButton
                            onClick={() => setActiveTab("courses")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              activeTab === "courses"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            Khóa học ({results.length})
                          </UnstyledButton>
                        )}
                        {instructors.length > 0 && (
                          <UnstyledButton
                            onClick={() => setActiveTab("instructors")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              activeTab === "instructors"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            Người hướng dẫn ({instructors.length})
                          </UnstyledButton>
                        )}
                        {categories.length > 0 && (
                          <UnstyledButton
                            onClick={() => setActiveTab("categories")}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              activeTab === "categories"
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            Danh mục ({categories.length})
                          </UnstyledButton>
                        )}
                      </Group>
                    )}
                  </Box>

                  <ScrollAreaAutosize mah={400} scrollbarSize={8}>
                    {!isLoading && totalResults > 0 ? (
                      <Box className="p-2">
                        {(activeTab === "all" || activeTab === "courses") &&
                          results.length > 0 && (
                            <Box className="mb-4">
                              {activeTab === "all" && (
                                <Group gap="xs" className="px-3 py-2">
                                  <BiBookOpen className="w-4 h-4 text-blue-500" />
                                  <Text
                                    size="sm"
                                    fw={600}
                                    className="text-gray-700"
                                  >
                                    Khóa học
                                  </Text>
                                </Group>
                              )}
                              <Stack gap="xs">
                                {results
                                  .slice(0, activeTab === "courses" ? 10 : 3)
                                  .map((result) => (
                                    <Link
                                      key={result.id}
                                      to={`/courses/${result.id}`}
                                      className="block no-underline"
                                    >
                                      <UnstyledButton className="w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Group gap="md" align="flex-start">
                                          <Box className="relative">
                                            <Image
                                              src={result.image || "/bot.jpg"}
                                              alt={result.title}
                                              w={60}
                                              h={60}
                                              className="rounded-lg object-cover"
                                            />

                                            {result.aiEnhanced && (
                                              <Box className="absolute -top-1 -right-1">
                                                <ThemeIcon
                                                  size="xs"
                                                  variant="gradient"
                                                  gradient={{
                                                    from: "blue",
                                                    to: "purple"
                                                  }}
                                                >
                                                  <BsRainbow className="w-2 h-2" />
                                                </ThemeIcon>
                                              </Box>
                                            )}
                                          </Box>

                                          <Box className="flex-1 min-w-0">
                                            <Group
                                              justify="space-between"
                                              align="flex-start"
                                              className="mb-1"
                                            >
                                              <Box className="flex-1 min-w-0">
                                                <Group
                                                  gap="xs"
                                                  className="mb-1"
                                                >
                                                  {result.bestseller && (
                                                    <Badge
                                                      size="xs"
                                                      variant="filled"
                                                      color="orange"
                                                      leftSection={
                                                        <FiRefreshCcw className="w-2 h-2" />
                                                      }
                                                    >
                                                      Bán chạy
                                                    </Badge>
                                                  )}
                                                  {result.new && (
                                                    <Badge
                                                      size="xs"
                                                      variant="filled"
                                                      color="green"
                                                      leftSection={
                                                        <GiSparkles className="w-2 h-2" />
                                                      }
                                                    >
                                                      Mới
                                                    </Badge>
                                                  )}
                                                </Group>
                                                <Tooltip label={result.title}>
                                                  <Text
                                                    fw={500}
                                                    className="text-gray-900 line-clamp-1"
                                                  >
                                                    <Highlight
                                                      highlight={query}
                                                    >
                                                      {result.title}
                                                    </Highlight>
                                                  </Text>
                                                </Tooltip>
                                                <Group gap={4}>
                                                  <Text
                                                    size="xs"
                                                    className="text-gray-600  "
                                                  >
                                                    by
                                                  </Text>
                                                  <Text
                                                    size="xs"
                                                    className="text-gray-600  "
                                                  >
                                                    <Highlight
                                                      highlight={query}
                                                    >
                                                      {result.instructor}
                                                    </Highlight>
                                                  </Text>
                                                  <Text
                                                    size="xs"
                                                    className="text-gray-600  "
                                                  >
                                                    • {result.category}
                                                  </Text>
                                                </Group>
                                              </Box>

                                              <Box className="text-right flex-shrink-0 ml-2">
                                                <Text
                                                  fw={700}
                                                  size="sm"
                                                  className="text-blue-600"
                                                >
                                                  {formatPriceLocaleVi(
                                                    result.price
                                                  )}
                                                </Text>
                                                {result.originalPrice && (
                                                  <Text
                                                    size="xs"
                                                    td="line-through"
                                                    className="text-gray-400"
                                                  >
                                                    {formatPriceLocaleVi(
                                                      result.originalPrice
                                                    )}
                                                  </Text>
                                                )}
                                              </Box>
                                            </Group>

                                            <Group
                                              gap="md"
                                              className="text-xs text-gray-500"
                                            >
                                              <Group gap="xs">
                                                <BsFillStarFill className="w-3 h-3 text-yellow-400 fill-current" />
                                                <Text size="sm" c={"dimmed"}>
                                                  {result.rating}
                                                </Text>
                                              </Group>
                                              <Group gap="xs">
                                                <BsFillStarFill className="w-3 h-3" />
                                                <Text size="sm" c={"dimmed"}>
                                                  {result.students.toLocaleString()}
                                                </Text>
                                              </Group>
                                            </Group>
                                          </Box>
                                        </Group>
                                      </UnstyledButton>
                                    </Link>
                                  ))}
                              </Stack>
                            </Box>
                          )}

                        {(activeTab === "all" || activeTab === "instructors") &&
                          instructors.length > 0 && (
                            <Box className="mb-4">
                              {activeTab === "all" && (
                                <>
                                  <Divider className="my-3" />
                                  <Group gap="xs" className="px-3 py-2">
                                    <Avatar size="sm" className="w-4 h-4">
                                      👨‍🏫
                                    </Avatar>
                                    <Text
                                      size="sm"
                                      fw={600}
                                      className="text-gray-700"
                                    >
                                      Người hướng dẫn
                                    </Text>
                                  </Group>
                                </>
                              )}
                              <Stack gap="xs">
                                {instructors
                                  .slice(
                                    0,
                                    activeTab === "instructors" ? 10 : 2
                                  )
                                  .map((instructor) => (
                                    <Link
                                      key={instructor.id}
                                      to={`/instructor/${instructor.id}`}
                                      className="block no-underline"
                                    >
                                      <UnstyledButton className="w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Group gap="md">
                                          <Avatar
                                            src={instructor.avatar}
                                            size="md"
                                            radius="xl"
                                          />
                                          <Box className="flex-1">
                                            <Text
                                              fw={500}
                                              className="text-gray-900"
                                            >
                                              <Highlight highlight={query}>
                                                {instructor.name}
                                              </Highlight>
                                            </Text>
                                            <Text
                                              size="xs"
                                              className="text-gray-600 mb-1"
                                            >
                                              <Highlight highlight={query}>
                                                {instructor.specialization}
                                              </Highlight>
                                            </Text>
                                            <Group
                                              gap="md"
                                              className="text-xs text-gray-500"
                                            >
                                              <Group gap="xs">
                                                <BiStar className="w-3 h-3 text-yellow-400 fill-current" />
                                                <Text size="sm" c={"dimmed"}>
                                                  {instructor.rating}
                                                </Text>
                                              </Group>
                                              <Group gap="xs">
                                                <BiUser className="w-3 h-3" />
                                                <Text size="sm" c={"dimmed"}>
                                                  {instructor.students.toLocaleString()}
                                                </Text>
                                              </Group>
                                              <Group gap="xs">
                                                <BiBookOpen className="w-3 h-3" />
                                                <Text size="sm" c={"dimmed"}>
                                                  {instructor.courses} courses
                                                </Text>
                                              </Group>
                                            </Group>
                                          </Box>
                                          <IoIosArrowForward className="w-4 h-4 text-gray-400" />
                                        </Group>
                                      </UnstyledButton>
                                    </Link>
                                  ))}
                              </Stack>
                            </Box>
                          )}

                        {(activeTab === "all" || activeTab === "categories") &&
                          categories.length > 0 && (
                            <Box className="mb-4">
                              {activeTab === "all" && (
                                <>
                                  <Divider className="my-3" />
                                  <Group gap="xs" className="px-3 py-2">
                                    <ThemeIcon
                                      size="sm"
                                      variant="light"
                                      color="purple"
                                    >
                                      <BiBookOpen className="w-3 h-3" />
                                    </ThemeIcon>
                                    <Text
                                      size="sm"
                                      fw={600}
                                      className="text-gray-700"
                                    >
                                      Danh mục
                                    </Text>
                                  </Group>
                                </>
                              )}
                              <Stack gap="xs">
                                {categories
                                  .slice(0, activeTab === "categories" ? 10 : 3)
                                  .map((category) => (
                                    <Link
                                      key={category.id}
                                      to={`/courses?category=${encodeURIComponent(
                                        category.name
                                      )}`}
                                      className="block no-underline"
                                    >
                                      <UnstyledButton className="w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        <Group justify="space-between">
                                          <Group gap="md">
                                            <Text className="text-2xl">
                                              {category.icon}
                                            </Text>
                                            <Box>
                                              <Group gap="xs" align="center">
                                                <Text
                                                  fw={500}
                                                  className="text-gray-900"
                                                >
                                                  <Highlight highlight={query}>
                                                    {category.name}
                                                  </Highlight>
                                                </Text>
                                                {category.trending && (
                                                  <Badge
                                                    size="xs"
                                                    variant="light"
                                                    color="red"
                                                    leftSection={
                                                      <BiTrendingUp className="w-2 h-2" />
                                                    }
                                                  >
                                                    Thịnh h
                                                  </Badge>
                                                )}
                                              </Group>
                                              <Text
                                                size="xs"
                                                className="text-gray-600"
                                              >
                                                {category.courseCount} khóa học
                                                đang chiêu sinh.
                                              </Text>
                                            </Box>
                                          </Group>
                                          <IoIosArrowForward className="w-4 h-4 text-gray-400" />
                                        </Group>
                                      </UnstyledButton>
                                    </Link>
                                  ))}
                              </Stack>
                            </Box>
                          )}

                        <Box className="p-3 border-t border-gray-100 bg-gray-50">
                          <Link
                            to={`/courses?q=${encodeURIComponent(query)}`}
                            className="block no-underline"
                          >
                            <UnstyledButton className="w-full p-2 rounded-lg hover:bg-white transition-colors">
                              <Group justify="center" gap="xs">
                                <BiSearch className="w-4 h-4 text-blue-600" />
                                <Text fw={500} className="text-blue-600">
                                  Xem tất cả kết quả cho "{query}"
                                </Text>
                                <IoIosArrowForward className="w-4 h-4 text-blue-600" />
                              </Group>
                            </UnstyledButton>
                          </Link>
                        </Box>
                      </Box>
                    ) : !isLoading && totalResults === 0 ? (
                      <Box className="p-8 text-center">
                        <ThemeIcon
                          size={48}
                          radius="xl"
                          variant="light"
                          color="gray"
                          className="mx-auto mb-3"
                        >
                          <BiSearch className="w-6 h-6" />
                        </ThemeIcon>
                        <Text fw={500} className="text-gray-700 mb-2">
                          Không tìm thấy kết quả nào cho "{query}"
                        </Text>
                        <Text size="sm" className="text-gray-500">
                          Hãy thử các từ khóa khác nhau hoặc duyệt qua các danh
                          mục của chúng tôi
                        </Text>
                      </Box>
                    ) : null}
                  </ScrollAreaAutosize>
                </Box>
              ) : (
                <Box className="p-4">
                  <Box className="mb-6">
                    <Button
                      leftSection={<GiLightBulb className="w-4 h-4" />}
                      fullWidth
                      variant="gradient"
                      size="md"
                      onClick={() => setShowSuggestions(true)}
                      className={`${bgPrimary} mb-4`}
                    >
                      Gợi ý khóa học dành cho bạn
                    </Button>
                    <Text size="xs" className="text-gray-500 text-center">
                      Gợi ý dựa trên lịch sử hoạt động của bạn.
                    </Text>
                  </Box>
                  <Box className="mb-6">
                    <Group gap="xs" className="mb-3">
                      <GiSparkles className="w-4 h-4 text-purple-500" />
                      <Text size="sm" fw={600} className="text-gray-700">
                        Tìm nhanh
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Link to="/courses" className="no-underline">
                        <Badge
                          variant="light"
                          size="lg"
                          className="cursor-pointer hover:bg-blue-100"
                        >
                          Tất cả khóa học
                        </Badge>
                      </Link>
                      <Link to="/courses?ai=true" className="no-underline">
                        <Badge
                          size="lg"
                          variant="gradient"
                          className={`${bgPrimary} cursor-pointer`}
                        >
                          Khóa học nổi tiếng
                        </Badge>
                      </Link>
                      <Link
                        to="/courses?bestseller=true"
                        className="no-underline"
                      >
                        <Badge
                          variant="light"
                          color="orange"
                          size="lg"
                          className="cursor-pointer hover:bg-orange-100"
                        >
                          Khóa học bán chạy
                        </Badge>
                      </Link>
                    </Group>
                  </Box>

                  {recentSearches?.length > 0 && (
                    <Box className="mb-6">
                      <Group
                        className="mb-3"
                        align="center"
                        justify="space-between"
                      >
                        <Group gap="xs" align="center">
                          <BiHistory className="w-4 h-4 text-gray-400" />
                          <Text size="sm" fw={600} className="text-gray-700">
                            Tìm kiếm gần đây
                          </Text>
                        </Group>
                        <Button
                          size="xs"
                          variant="subtle"
                          onClick={() => setRecentSearches([])}
                          classNames={{
                            root: "text-red-500 hover:text-red-500 hover:bg-red-100"
                          }}
                        >
                          Xóa tất cả
                        </Button>
                      </Group>
                      <Stack gap="xs">
                        {recentSearches.map((search, index) => (
                          <UnstyledButton
                            key={index}
                            className="text-left px-2 py-1 hover:bg-gray-100 rounded-lg transition-colors w-full"
                          >
                            <Group align="center" justify="space-between">
                              <Group
                                gap="xs"
                                onClick={() => setQuery(search)}
                                flex={1}
                              >
                                <CgLock className="w-3 h-3 text-gray-400" />
                                <Text size="sm" className="text-gray-600">
                                  {search}
                                </Text>
                              </Group>
                              <ActionIcon
                                variant="subtle"
                                classNames={{
                                  root: "text-gray-600 hover:text-gray-600 hover:bg-gray-200"
                                }}
                                onClick={() => {
                                  const newRecentSearches = [...recentSearches];
                                  newRecentSearches.splice(index, 1);
                                  setRecentSearches(newRecentSearches);
                                }}
                              >
                                <BiX size={20} />
                              </ActionIcon>
                            </Group>
                          </UnstyledButton>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  <Box className="mb-4">
                    <Group gap="xs" className="mb-3">
                      <BiTrendingUp className="w-4 h-4 text-red-500" />
                      <Text size="sm" fw={600} className="text-gray-700">
                        Thịnh hành
                      </Text>
                    </Group>
                    <Stack gap="xs">
                      {trendingSearches.map((item, index) => (
                        <UnstyledButton
                          key={index}
                          className="text-left p-2 hover:bg-gray-100 rounded-lg transition-colors w-full"
                          onClick={() => setQuery(item.term)}
                        >
                          <Group justify="space-between">
                            <Group gap="xs">
                              <FiRefreshCcw className="w-3 h-3 text-red-500" />
                              <Text size="sm" className="text-gray-600">
                                {item.term}
                              </Text>
                            </Group>
                            <Badge size="xs" variant="light" color="red">
                              {item.trend}
                            </Badge>
                          </Group>
                        </UnstyledButton>
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Group gap="xs" className="mb-3">
                      <BiBookOpen className="w-4 h-4 text-blue-500" />
                      <Text size="sm" fw={600} className="text-gray-700">
                        Danh mục nổi bật
                      </Text>
                    </Group>
                    <SimpleGrid cols={2} spacing={8}>
                      {mockCategories.slice(0, 4).map((category) => (
                        <Link
                          key={category.id}
                          to={`/courses?category=${encodeURIComponent(
                            category.name
                          )}`}
                          className="block no-underline"
                        >
                          <Paper
                            shadow="sm"
                            p={"md"}
                            radius={"md"}
                            className=" hover:bg-gray-100 transition-colors border border-gray-100"
                          >
                            <Flex align={"center"} gap="xs">
                              <Text className="text-lg">{category.icon}</Text>
                              <Tooltip label={category.name}>
                                <Box className="text-left">
                                  <Text
                                    size="sm"
                                    fw={500}
                                    className="text-gray-900 line-clamp-1"
                                  >
                                    {category.name}
                                  </Text>
                                  <Text size="xs" className="text-gray-500">
                                    {category.courseCount} khóa học
                                  </Text>
                                </Box>
                              </Tooltip>
                            </Flex>
                          </Paper>
                        </Link>
                      ))}
                    </SimpleGrid>
                  </Box>
                </Box>
              )}
            </ScrollAreaAutosize>
          </Paper>
        )}
      </Box>

      <ProductSuggestions
        opened={showSuggestions}
        onClose={() => setShowSuggestions(false)}
      />
    </>
  );
}
