import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuDropdown,
  MenuTarget,
  Paper,
  RangeSlider,
  ScrollAreaAutosize,
  Text
} from "@mantine/core";

import { useMemo } from "react";
import {
  BiAward,
  BiBookmark,
  BiBookOpen,
  BiCalendar,
  BiChevronDown,
  BiGlobe,
  BiTargetLock,
  BiVideo
} from "react-icons/bi";
import { BsClock, BsFillStarFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FiFileText, FiFilter, FiZap } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import type { CourseResponse } from "../../../types/course";
import { bgPrimary } from "../../../utils/constant";
import { formatNumberShort } from "../../../utils/format";

export function SummarySection({
  coursesResponse
}: {
  coursesResponse: CourseResponse;
}) {
  const [params] = useSearchParams();
  const { total, courses } = coursesResponse;
  const [totalStudents, avaragesRating] = useMemo(() => {
    if (courses.length > 0) {
      return [
        courses.reduce((total, course) => total + course.students, 0),
        courses.reduce((total, course) => total + course.rating, 0) /
          courses.length
      ];
    }
    return [0, 0];
  }, [courses]);
  return (
    <Paper className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4  sm:p-6 mb-8">
      <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <Box>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            <b>"{params.get("q") || "Khóa học EduMarket"}"</b>
          </h1>
          <Text className="text-gray-600 mb-4">
            {total} khóa học được tìm thấy
          </Text>

          <Flex align={"center"} gap={"xl"}>
            <Box className="flex items-center space-x-2">
              <Box className="w-10 h-10 bg-blue-100 rounded-xl  items-center justify-center hidden lg:flex">
                <BiBookOpen className="w-5 h-5 text-blue-600" />
              </Box>
              <Box>
                <Box className="text-xl font-bold text-blue-600 lg:text-gray-900">
                  {total}
                </Box>
                <Text size="xs" c={"dimmed"}>
                  Khóa học
                </Text>
              </Box>
            </Box>
            <Box className="flex items-center space-x-2">
              <Box className="w-10 h-10 bg-green-100 rounded-xl hidden lg:flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-green-600" />
              </Box>
              <Box>
                <Box className="text-xl font-bold lg:text-gray-900 text-green-600">
                  {formatNumberShort(totalStudents)}
                </Box>
                <Text size="xs" c={"dimmed"}>
                  Học viên
                </Text>
              </Box>
            </Box>
            <Box className="flex items-center space-x-2">
              <Box className="w-10 h-10 bg-yellow-100 rounded-xl hidden lg:flex items-center justify-center">
                <BsFillStarFill className="w-5 h-5 text-yellow-600 fill-current" />
              </Box>
              <Box>
                <Box className="text-xl font-bold lg:text-gray-900 text-yellow-600">
                  {avaragesRating.toFixed(1)}
                </Box>
                <Text size="xs" c={"dimmed"}>
                  Điểm số
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Flex align={"center"} gap={"xs"}>
          <Button
            variant="light"
            leftSection={<BiBookmark size={16} />}
            radius={"md"}
          >
            Lưu tìm kiếm
          </Button>

          <Menu width={300} shadow="md" position="bottom-end">
            <MenuTarget>
              <Button
                leftSection={<FiFilter size={16} />}
                rightSection={<BiChevronDown size={16} />}
                variant="gradient"
                className={`${bgPrimary} rounded-lg`}
              >
                Lọc nâng cao
              </Button>
            </MenuTarget>

            <MenuDropdown className="w-80 p-0 shadow-2xl border-gray-100">
              <ScrollAreaAutosize mah={380} scrollbarSize={6}>
                <Box p={"lg"} pr={"lg"}>
                  <Box className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Bộ lọc nâng cao
                    </h3>
                    <Button variant="outline" size="sm">
                      Đặt lại
                    </Button>
                  </Box>

                  <Box className="mb-4">
                    <Box className="flex items-center space-x-2 mb-2">
                      <BiTargetLock className="w-4 h-4 text-green-600" />
                      <label className="text-sm font-medium text-gray-700">
                        Khoảng giá
                      </label>
                    </Box>
                    <Box className="mb-4">
                      <RangeSlider
                        defaultValue={[100000, 500000]}
                        max={1000000}
                        step={10000}
                        className="w-full"
                      />
                      <Box className="flex items-center justify-between text-sm text-gray-600">
                        <span>100.000đ</span>
                        <span>500.000đ</span>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="mb-4">
                    <Box className="flex items-center space-x-2 mb-3">
                      <BsClock className="w-4 h-4 text-blue-600" />
                      <label className="text-sm font-medium text-gray-700">
                        Thời lượng
                      </label>
                    </Box>
                    <Box className="space-y-2">
                      {[
                        { label: "Dưới 2 giờ", count: 23 },
                        { label: "2-6 giờ", count: 45 },
                        { label: "6-17 giờ", count: 67 },
                        { label: "Trên 17 giờ", count: 34 }
                      ].map((duration, index) => (
                        <Box
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <Box className="flex items-center space-x-2">
                            <Checkbox id={`duration-${index}`} />
                            <label
                              htmlFor={`duration-${index}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {duration.label}
                            </label>
                          </Box>
                          <Badge variant="secondary" className="text-xs">
                            {duration.count}
                          </Badge>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box className="mb-4">
                    <Box className="flex items-center space-x-2 mb-3">
                      <BsFillStarFill className="w-4 h-4 text-yellow-400" />
                      <label className="text-sm font-medium text-gray-700">
                        Đánh giá
                      </label>
                    </Box>
                    <Box className="space-y-2">
                      {[
                        { stars: 4.5, label: "4.5 sao trở lên", count: 89 },
                        { stars: 4.0, label: "4.0 sao trở lên", count: 156 },
                        { stars: 3.5, label: "3.5 sao trở lên", count: 234 },
                        { stars: 3.0, label: "3.0 sao trở lên", count: 345 }
                      ].map((rating, index) => (
                        <Box
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <Box className="flex items-center space-x-2">
                            <Checkbox id={`rating-${index}`} />
                            <label
                              htmlFor={`rating-${index}`}
                              className="text-sm text-gray-700 cursor-pointer flex items-center space-x-1"
                            >
                              <Box className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <BsFillStarFill
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(rating.stars)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </Box>
                              <span>{rating.label}</span>
                            </label>
                          </Box>
                          <Badge variant="secondary" className="text-xs">
                            {rating.count}
                          </Badge>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box className="mb-4">
                    <Box className="flex items-center space-x-2 mb-3">
                      <BiGlobe className="w-4 h-4 text-purple-600" />
                      <label className="text-sm font-medium text-gray-700">
                        Ngôn ngữ
                      </label>
                    </Box>
                    <Box className="space-y-2">
                      {[
                        { name: "Tiếng Việt", count: 234 },
                        { name: "English", count: 156 },
                        { name: "中文", count: 45 },
                        { name: "日本語", count: 23 }
                      ].map((language, index) => (
                        <Box
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <Box className="flex items-center space-x-2">
                            <Checkbox id={`language-${index}`} />
                            <label
                              htmlFor={`language-${index}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              {language.name}
                            </label>
                          </Box>
                          <Badge variant="secondary" className="text-xs">
                            {language.count}
                          </Badge>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box className="mb-4">
                    <Box className="flex items-center space-x-2 mb-3">
                      <FiZap className="w-4 h-4 text-orange-600" />
                      <label className="text-sm font-medium text-gray-700">
                        Tính năng khóa học
                      </label>
                    </Box>
                    <Box className="space-y-2">
                      {[
                        { name: "Có chứng chỉ", icon: BiAward, count: 167 },
                        { name: "Video HD", icon: BiVideo, count: 234 },
                        {
                          name: "Tài liệu PDF",
                          icon: FiFileText,
                          count: 189
                        },
                        {
                          name: "Truy cập trọn đời",
                          icon: BiCalendar,
                          count: 145
                        }
                      ].map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                          <Box
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <Box className="flex items-center space-x-2">
                              <Checkbox id={`feature-${index}`} />
                              <IconComponent className="w-4 h-4 text-gray-500" />
                              <label
                                htmlFor={`feature-${index}`}
                                className="text-sm text-gray-700 cursor-pointer"
                              >
                                {feature.name}
                              </label>
                            </Box>
                            <Badge variant="secondary" className="text-xs">
                              {feature.count}
                            </Badge>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  <Box className="pt-4 border-t border-gray-100">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                      Áp dụng bộ lọc
                    </Button>
                  </Box>
                </Box>
              </ScrollAreaAutosize>
            </MenuDropdown>
          </Menu>
        </Flex>
      </Box>
    </Paper>
  );
}
