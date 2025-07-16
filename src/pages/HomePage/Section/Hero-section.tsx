import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Text
} from "@mantine/core";

import { BiSearch } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";
import { Link } from "react-router-dom";
import { bgPrimary } from "../../../utils/constant";
import {
  popularTags,
  stats,
  trendingTags
} from "../../../utils/mock-data-render";

export function HeroSection() {
  return (
    <Box className="text-center mb-24 relative">
      <Box className="inline-flex items-center gap-2 bg-gray-100 shadow-md px-4 py-2 rounded-full mb-6">
        <GiSparkles className="w-4 h-4 text-blue-600" />
        <Text size="sm" fw={500} className="text-blue-700">
          Nền tảng giáo dục trực tuyến
        </Text>
      </Box>

      <Center mb={6} className="">
        <Flex
          direction={{ base: "column", sm: "row", md: "row" }}
          justify={"center"}
          align={"center"}
          gap={{ base: "lg", sm: "2", md: "xs" }}
        >
          <Text
            fw={700}
            className="lg:text-5xl xl:text-6xl text-gray-900 leading-tight mr-2 text-3xl sm:text-4xl"
          >
            Khám phá tri thức với
          </Text>
          <Box w={{ base: 150, sm: 200, md: 260, xl: 320 }}>
            <Text className="lg:text-5xl text-3xl sm:text-4xl animate-slide-text whitespace-nowrap xl:text-6xl font-bold text-gray-900 leading-tight border-r-4  bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EduMarket
            </Text>
          </Box>
        </Flex>
      </Center>

      <Center my={"md"}>
        <Text size="lg" className="text-gray-600 max-w-3xl mx-auto">
          EduMarket là sàn thương mại điện tử giáo dục giúp bạn tiếp cận hàng
          trăm khóa học chất lượng cao, từ công nghệ đến kỹ năng mềm. Học mọi
          lúc mọi nơi với công nghệ AI hỗ trợ cá nhân hóa lộ trình học.
        </Text>
      </Center>
      <Box className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link to={"/courses"}>
          <Button
            size="lg"
            variant="gradient"
            className={bgPrimary}
            radius={"md"}
          >
            <BiSearch className="w-5 h-5 mr-2" />
            Khám phá
          </Button>
        </Link>
        <Link to={"/courses"}>
          <Button
            size="lg"
            radius={"md"}
            variant="outline"
            className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50  transition-all duration-300 bg-transparent"
          >
            <FiMessageCircle className="w-5 h-5 mr-2" />
            Tư vấn học tập
          </Button>
        </Link>
      </Box>

      <Box className="max-w-4xl mx-auto mb-12">
        <Box className="mb-6">
          <Box className="flex items-center justify-center space-x-2 mb-4">
            <Text size="sm" className="font-medium text-gray-600">
              Khóa học phổ biến:
            </Text>
          </Box>
          <Box className="flex flex-wrap justify-center gap-2">
            {popularTags.map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors bg-white/60 backdrop-blur-sm"
              >
                {tag}
              </Button>
            ))}
          </Box>
        </Box>

        <Box>
          <Box className="flex items-center justify-center space-x-2 mb-4">
            <Text className="text-sm font-medium text-gray-600">
              Xu hướng hot:
            </Text>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs"
            >
              🔥 HOT
            </Badge>
          </Box>
          <Box className="flex flex-wrap justify-center gap-2">
            {trendingTags.map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-700 transition-colors bg-gradient-to-r from-orange-50 to-red-50 backdrop-blur-sm"
              >
                {tag}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <SimpleGrid
        cols={{ base: 2, md: 4 }}
        spacing={{ base: 10, md: "xl" }}
        className="mb-16"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Box key={index} className="text-center">
              <Box className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Box className="flex justify-center mb-3">
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </Box>
                <Box className={`text-3xl  font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </Box>
                <Box className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
