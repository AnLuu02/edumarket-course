import { Badge, Box, Card, CardSection, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { TitleCustom } from "../../../components/Title-custom";
import { categoriesHot } from "../../../utils/mock-data-render";
export function CourseCategoriesSection() {
  return (
    <Box>
      <Box className="text-center mb-8">
        <TitleCustom title="Khóa học phổ biến" />
        <Text size="sm" c={"dimmed"} className="text-lg  max-w-2xl mx-auto">
          Lựa chọn từ hàng trăm khóa học chất lượng cao trong các lĩnh vực hot
          nhất hiện nay
        </Text>
      </Box>
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing={{ base: 8, md: "xl" }}>
        {categoriesHot.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <Link
              to={`/courses?category=${encodeURIComponent(category.title)}`}
            >
              <Card
                radius={"md"}
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${category.borderColor} ${category.bgColor} hover:scale-105 cursor-pointer`}
              >
                <CardSection className="p-6 text-center">
                  <Box
                    className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </Box>
                  <Text size="lg" className=" font-bold text-gray-900 mb-2">
                    {category.title}
                  </Text>
                  <Badge
                    variant="secondary"
                    size="lg"
                    className="bg-white/80 text-gray-600 hover:bg-white"
                  >
                    {category.courses}
                  </Badge>
                </CardSection>
              </Card>
            </Link>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
