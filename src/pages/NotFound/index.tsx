import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title
} from "@mantine/core";
import { BiHome, BiSearch } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { bgPrimary } from "../../utils/constant";

export default function NotFound() {
  return (
    <Container size="md" className="py-16">
      <Stack align="center" gap="xl" className="text-center">
        <ThemeIcon
          size={100}
          radius="xl"
          variant="light"
          color="blue"
          className="mx-auto"
        >
          <BsRobot className="w-12 h-12" />
        </ThemeIcon>

        <Stack align="center" gap="md">
          <Title order={1} c={"red"} className="text-7xl">
            404
          </Title>
          <Text size="xl" fw={700} className="text-gray-900">
            Trang không có sẵn.
          </Text>
          <Text size="lg" className="text-gray-600 max-w-lg">
            Trang này hiện đang được cập nhật. Vui lòng duyệt qua các khóa học
            của chúng tôi và thử lại sau.
          </Text>
        </Stack>

        <Group justify="center" gap="md">
          <Link to="/courses" className="no-underline">
            <Button
              size="lg"
              radius={"md"}
              leftSection={<BiSearch className="w-5 h-5" />}
              variant="gradient"
              className={bgPrimary}
            >
              Tìm khóa học
            </Button>
          </Link>
          <Link to="/" className="no-underline">
            <Button
              radius={"md"}
              size="lg"
              variant="outline"
              leftSection={<BiHome className="w-5 h-5 bg-transparent" />}
            >
              Về trang chủ
            </Button>
          </Link>
        </Group>
      </Stack>
    </Container>
  );
}
