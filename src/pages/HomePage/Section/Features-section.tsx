import { Box, Paper, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import { TitleCustom } from "../../../components/Title-custom";
import { features } from "../../../utils/mock-data-render";

export function FeaturesSection() {
  return (
    <Box className="mb-20">
      <Box className="text-center mb-8">
        <TitleCustom title="Vì sao nên chọn EduMarket?" />
        <Text size="sm" c={"dimmed"} className="text-lg  max-w-2xl mx-auto">
          Khám phá những tính năng độc đáo giúp bạn học tập hiệu quả và đạt được
          mục tiêu của mình
        </Text>
      </Box>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, lg: "xl" }}
      >
        {features.map((feature, index) => (
          <Paper
            key={index}
            shadow="md"
            withBorder
            radius={"md"}
            className={`bg-white/10 border border-white/20 backdrop-blur-sm p-6 flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 shadow-lg group`}
          >
            <ThemeIcon
              size={60}
              radius="xl"
              variant="gradient"
              gradient={feature.gradient}
              className="mx-auto mb-4"
            >
              <feature.icon className="w-8 h-8" />
            </ThemeIcon>
            <Title order={3} className="mb-4">
              {feature.title}
            </Title>
            <Text className="text-gray-600">{feature.message}</Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
}
