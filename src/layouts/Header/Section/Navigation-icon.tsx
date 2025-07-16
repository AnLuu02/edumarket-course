import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Text,
  ThemeIcon,
  Tooltip
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { BiChevronDown, BiHeart, BiHistory, BiUser } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ModalHistory } from "../../../components/Modal-history";
import { useGlobalModal } from "../../../contexts/ModalContext";
import type { Course, CourseViewHistory } from "../../../types/course";

export function NavigationIcon({
  drawerOpened,
  onCloseDrawer
}: {
  drawerOpened?: boolean;
  onCloseDrawer?: any;
}) {
  const { openModal } = useGlobalModal();
  const [viewHistory] = useLocalStorage<CourseViewHistory[]>({
    key: "view-history",
    defaultValue: []
  });
  const [favorites] = useLocalStorage<string[]>({
    key: "favorite-courses",
    defaultValue: []
  });
  const [cart] = useLocalStorage<Course[]>({
    key: "cart",
    defaultValue: []
  });

  const onViewHistory = () => {
    openModal(
      <ModalHistory />,
      <Group gap="xs">
        <ThemeIcon variant="light" color="blue" size="sm">
          <BiHistory className="w-4 h-4" />
        </ThemeIcon>
        <Text fw={600} size="lg">
          Lịch sử xem
        </Text>
      </Group>
    );
  };
  return (
    <Flex
      gap={"xl"}
      w={{ base: "100%", sm: "auto" }}
      align="center"
      justify={"space-between"}
      direction={{ base: "row-reverse", sm: "row" }}
      className="border-b border-gray-200 border-t py-4 sm:border-none sm:py-0"
    >
      <Group gap={0}>
        <Tooltip label="Lịch sử xem" withArrow arrowSize={10}>
          <Button
            onClick={() => {
              onViewHistory();
            }}
            variant="transparent"
            radius={"md"}
            className="relative hover:bg-blue-50 transition-colors overflow-visible"
          >
            <FaHistory className="w-4 h-4 text-gray-600" />
            {viewHistory.length > 0 && (
              <Box className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></Box>
            )}
          </Button>
        </Tooltip>

        <Tooltip label="Khóa học yêu thích" withArrow arrowSize={10}>
          <Link to="/favorites" className="no-underline">
            <Button
              variant="transparent"
              radius={"md"}
              onClick={() => drawerOpened && onCloseDrawer()}
              className="relative  hover:bg-red-100 transition-colors overflow-visible"
            >
              <BiHeart className="w-5 h-5 text-gray-600" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1  -right-0 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-bounce">
                  {favorites.length}
                </Badge>
              )}
            </Button>
          </Link>
        </Tooltip>

        <Tooltip label="Giỏ hàng" withArrow arrowSize={10}>
          <Link to="/cart" className="no-underline">
            <Button
              variant="transparent"
              radius={"md"}
              onClick={() => drawerOpened && onCloseDrawer()}
              className="relative hover:bg-blue-100 transition-colors overflow-visible"
            >
              <CgShoppingCart className="w-5 h-5 text-gray-600" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-0 w-5 h-5 p-0 bg-blue-500 text-white text-xs flex items-center justify-center">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </Link>
        </Tooltip>
      </Group>

      <Menu shadow="md" width={200}>
        <MenuTarget>
          <Box>
            <Button
              p={0}
              variant="subtle"
              leftSection={
                <Box className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <BiUser className="w-4 h-4 text-white" />
                </Box>
              }
              rightSection={<BiChevronDown className="w-4 h-4" />}
            >
              <Text size="sm">Tài khoản</Text>
            </Button>
          </Box>
        </MenuTarget>

        <MenuDropdown>
          <MenuLabel>Học tập</MenuLabel>
          <MenuItem
            leftSection={<BiHistory className="w-4 h-4" />}
            onClick={onViewHistory}
          >
            Lịch sử xem
          </MenuItem>
          <MenuItem leftSection={<BiHeart className="w-4 h-4" />}>
            <Link to="/favorites" className="no-underline text-inherit">
              Yêu thích
            </Link>
          </MenuItem>
          <MenuItem leftSection={<CgShoppingCart className="w-4 h-4" />}>
            <Link to="/cart" className="no-underline text-inherit">
              Giỏ hàng
            </Link>
          </MenuItem>

          <MenuItem>Cài đặt tài khoản</MenuItem>
          <MenuItem>Tiến độ học tập</MenuItem>
          <MenuItem>Giấy chứng nhận</MenuItem>

          <MenuItem color="red">Đăng xuất</MenuItem>
        </MenuDropdown>
      </Menu>
    </Flex>
  );
}
