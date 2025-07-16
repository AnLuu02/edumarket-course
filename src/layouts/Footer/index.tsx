import {
  ActionIcon,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { BiMapPin, BiPhone } from "react-icons/bi";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { SiEndeavouros } from "react-icons/si";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { bgPrimary } from "../../utils/constant";

export default function Footer() {
  return (
    <Box className="bg-gray-900 text-white relative bottom-0 left-0 right-0">
      <Container size="xl" className="md:py-8 py-8 pb-2">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          <Stack gap="md">
            <Logo />
            <Text className="text-gray-300">
              Nền tảng thương mại điện tử giáo dục kết nối người học và giảng
              viên trên toàn quốc. Cùng khám phá, học hỏi và phát triển với sự
              hỗ trợ của công nghệ hiện đại.
            </Text>
            <Group>
              <ActionIcon
                variant="subtle"
                size="lg"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="w-5 h-5" />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                size="lg"
                className="text-gray-400 hover:text-white"
              >
                <BsTwitter className="w-5 h-5" />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                size="lg"
                className="text-gray-400 hover:text-white"
              >
                <BsInstagram className="w-5 h-5" />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                size="lg"
                className="text-gray-400 hover:text-white"
              >
                <BsYoutube className="w-5 h-5" />
              </ActionIcon>
            </Group>
          </Stack>

          <Stack gap="md">
            <Text fw={600} size="lg">
              Courses
            </Text>
            <Stack gap="xs">
              {[
                "Kinh doanh & Khởi nghiệp",
                "Lập trình & Công nghệ",
                "Kỹ năng mềm",
                "Thiết kế đồ họa",
                "Phát triển bản thân",
                "Ngoại ngữ tổng hợp"
              ].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors no-underline"
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={600} size="lg">
              Công ty
            </Text>
            <Stack gap="xs">
              {[
                "Giới thiệu",
                "Giảng viên",
                "Câu chuyện thành công",
                "Tin tức & Blog",
                "Tuyển dụng",
                "Liên hệ"
              ].map((item) => (
                <Link
                  key={item}
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors no-underline"
                >
                  {item}
                </Link>
              ))}
            </Stack>
          </Stack>

          <Stack gap="md">
            <Text fw={600} size="lg">
              Liên hệ
            </Text>
            <Stack gap="sm">
              <Group gap="xs">
                <CgMail className="w-4 h-4 text-gray-400" />
                <Text size="sm" className="text-gray-300">
                  EduMarket@contact.com
                </Text>
              </Group>
              <Group gap="xs">
                <BiPhone className="w-4 h-4 text-gray-400" />
                <Text size="sm" className="text-gray-300">
                  +84 918 0646 18
                </Text>
              </Group>
              <Group gap="xs">
                <BiMapPin className="w-4 h-4 text-gray-400" />
                <Text size="sm" className="text-gray-300">
                  Hồ Chí Minh, Việt Nam
                </Text>
              </Group>
            </Stack>

            <Box>
              <Text fw={600} className="mb-3">
                Nhận bản tin
              </Text>
              <Group>
                <TextInput
                  placeholder="Your email"
                  className="flex-1"
                  styles={{
                    input: {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "white",
                      "&::placeholder": {
                        color: "rgba(255, 255, 255, 0.6)"
                      }
                    }
                  }}
                />
                <ActionIcon className={bgPrimary} size="lg" variant="gradient">
                  <SiEndeavouros className="w-4 h-4" />
                </ActionIcon>
              </Group>
            </Box>
          </Stack>
        </SimpleGrid>

        <Divider className="my-8 border-gray-700" />

        <Flex
          direction={{ base: "column-reverse", sm: "row", md: "row" }}
          justify="space-between"
          gap={"md"}
        >
          <Center className="mt-2 md:mt-0">
            <Text size="sm" className="text-gray-400">
              © 2025 EduMarket. All rights reserved.
            </Text>
          </Center>
          <Group>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors no-underline text-sm"
            >
              Chính sách bảo mật
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors no-underline text-sm"
            >
              Điều khoản dịch vụ
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white transition-colors no-underline text-sm"
            >
              Chính sách cookie
            </Link>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}
