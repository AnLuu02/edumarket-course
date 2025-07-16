import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Flex,
  Text
} from "@mantine/core";

import { IoIosArrowForward } from "react-icons/io";
import { TitleCustom } from "../../../components/Title-custom";
import { learningOptions } from "../../../utils/mock-data-render";

export function EduMarketOfferSection() {
  return (
    <>
      <Box className="mb-20 mt-20">
        <Box className="text-center mb-4 md:mb-8">
          <TitleCustom title="EduMarket dành cho bạn" />
          <Text size="sm" c={"dimmed"} className="text-lg  max-w-2xl mx-auto">
            Lựa chọn phương thức học tập phù hợp với nhu cầu và mục tiêu của bạn
          </Text>
        </Box>
        <Box className="flex items-center justify-end gap-2 mb-2 lg:hidden">
          <Text size="sm" c="gray">
            Vuốt sang phải
          </Text>
          <span className="animate-bounce text-xl">➡️</span>
        </Box>
        <Flex
          gap={"md"}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
          className="mb-16 snap-x snap-mandatory flex overflow-x-auto lg:overflow-visible "
        >
          {learningOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Box
                key={index}
                className="min-w-[90%] sm:min-w-[70%] lg:min-w-[30%] snap-start"
              >
                <Card
                  radius={"md"}
                  p={{ base: "md", md: 0, lg: "md" }}
                  className={`group hover:shadow-2xl transition-all duration-500 border-2 ${option.borderColor} ${option.bgColor} xl:hover:scale-105 relative overflow-hidden`}
                >
                  <Box
                    className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></Box>

                  <CardSection className="p-8 relative z-10">
                    <Box className="flex justify-between items-start mb-6">
                      <Badge className={`${option.badgeColor} font-medium`}>
                        {option.badge}
                      </Badge>
                      <Box
                        className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </Box>
                    </Box>

                    <Text
                      size="xl"
                      className=" font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors"
                    >
                      {option.title}
                    </Text>

                    <Text className="text-gray-600 leading-relaxed mb-6">
                      {option.description}
                    </Text>

                    <Box className="space-y-3 mb-8">
                      {option.features.map((feature, featureIndex) => (
                        <Box
                          key={featureIndex}
                          className="flex items-center space-x-3"
                        >
                          <Box
                            className={`w-2 h-2 bg-gradient-to-r ${option.color} rounded-full`}
                          ></Box>
                          <Text className="text-sm text-gray-700 font-medium">
                            {feature}
                          </Text>
                        </Box>
                      ))}
                    </Box>

                    <Button
                      radius={"md"}
                      className={`w-full bg-gradient-to-r ${option.color} hover:shadow-lg text-white transition-all duration-300 group-hover:scale-105`}
                    >
                      {option.buttonText}
                      <IoIosArrowForward className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardSection>
                </Card>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
