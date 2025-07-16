import {
  Box,
  Button,
  Center,
  Container,
  Stack,
  Text,
  ThemeIcon,
  Title
} from "@mantine/core";
import { GiHeartOrgan } from "react-icons/gi";
import { Link } from "react-router-dom";
import { bgPrimary } from "../utils/constant";

export function EmptyView({
  title,
  content
}: {
  title: string;
  content: string;
}) {
  return (
    <Container size="xl" className="py-16">
      <Center className="min-h-96">
        <Stack align="center" gap="xl">
          <ThemeIcon size={80} radius="xl" variant="light" color="gray">
            <GiHeartOrgan className="w-10 h-10" />
          </ThemeIcon>
          <Box className="text-center">
            <Title order={2} className="mb-4">
              {title || "No Favorite Courses Yet"}
            </Title>
            <Text className="text-gray-600 mb-6">
              {content || "You have not added any favorite courses yet."}
            </Text>
            <Link to="/courses">
              <Button size="lg" variant="gradient" className={bgPrimary}>
                Tìm kiếm khóa học
              </Button>
            </Link>
          </Box>
        </Stack>
      </Center>
    </Container>
  );
}
