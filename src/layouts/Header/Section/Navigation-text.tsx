import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Popover,
  rem,
  SimpleGrid,
  Stack,
  Text
} from "@mantine/core";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../../components/Logo";
import useScrollPosition from "../../../hooks/use-scroll-point";
import {
  categoriesNavigationHeader,
  navigations,
  trendingTopics
} from "../../../utils/mock-data-render";
import { SearchDropdownSection } from "./Search-dropdown-section";

const HEIGHT_CONSTANT = 80;
export function NavigationText({
  drawerOpened,
  onCloseDrawer
}: {
  drawerOpened?: boolean;
  onCloseDrawer?: any;
}) {
  const { pathname } = useLocation();
  const scroll = useScrollPosition(HEIGHT_CONSTANT);
  const isSticky = scroll >= HEIGHT_CONSTANT;
  return (
    <Flex
      direction={{ base: "column", xl: "row" }}
      align={{ base: "center", xl: "center" }}
      justify={{ base: "center", xl: "space-between" }}
      wrap={"wrap"}
      w={{ base: "100%", xl: "auto" }}
      gap={{ base: "lg", sm: "xl", xl: "xs" }}
    >
      {isSticky && (
        <Box className="animate-fadeTop hidden xl:block mr-10">
          <Logo />
        </Box>
      )}

      {navigations.map((item, index) =>
        item.path !== "#" ? (
          <Link
            key={index}
            to={item.path}
            onClick={() => {
              drawerOpened && onCloseDrawer();
            }}
          >
            <Group className="border-b border-gray-500 rounded-xl p-2 xl:border-none xl:rounded-none xl:p-0 ">
              {item.icon && (
                <Box className="xl:hidden">
                  <item.icon
                    size={30}
                    className={`${
                      pathname === item.path
                        ? "text-[#2563eb]"
                        : "text-[#4b5563]"
                    }`}
                  />
                </Box>
              )}
              <Button
                size="md"
                pl={0}
                variant="transparent"
                className={` text-lg bg-transparent xl:text-base hover:text-blue-600 ${
                  pathname === item.path ? "text-[#2563eb]" : "text-[#4b5563]"
                }`}
              >
                {item.name}
              </Button>
            </Group>
          </Link>
        ) : (
          <Menu
            key={index}
            width={300}
            shadow="md"
            position="bottom-start"
            withArrow
            offset={6}
            withinPortal
          >
            <MenuTarget>
              <Group className=" border-b border-gray-500 rounded-xl p-2  xl:border-none xl:rounded-none xl:p-0 ">
                {item.icon && (
                  <Box className="xl:hidden">
                    <item.icon
                      size={30}
                      className={`${
                        pathname === item.path
                          ? "text-[#2563eb]"
                          : "text-[#4b5563]"
                      }`}
                    />
                  </Box>
                )}

                <Button
                  variant="transparent"
                  rightSection={<BiChevronDown size={16} />}
                  size="sm"
                  px={0}
                  className={`text-gray-600 text-lg bg-transparent xl:text-base hover:text-blue-600`}
                >
                  Danh mục
                </Button>
              </Group>
            </MenuTarget>

            <MenuDropdown>
              <Box px="sm" py="xs">
                <Text size="sm" fw={600} c="dark" mb={6}>
                  Danh mục phổ biến
                </Text>
                <SimpleGrid spacing="xs" cols={2}>
                  {categoriesNavigationHeader.map((category: any) => (
                    <MenuItem
                      key={category.name}
                      leftSection={
                        <category.icon size={16} className={category.color} />
                      }
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </SimpleGrid>
              </Box>

              <Divider my="xs" />

              <Box px="sm" py="xs">
                <Text size="sm" fw={600} c="dark" mb={6}>
                  Chủ đề đang hot
                </Text>
                <Stack gap={4}>
                  {trendingTopics.map((topic: any) => (
                    <MenuItem key={topic.name}>
                      <Group justify="space-between" wrap="nowrap">
                        <Text size="sm">{topic.name}</Text>
                        {topic.hot && (
                          <Text
                            size="xs"
                            px={6}
                            py={2}
                            style={{
                              backgroundColor: "#ffedd5",
                              color: "#ea580c",
                              borderRadius: rem(9999),
                              fontWeight: 500
                            }}
                          >
                            HOT
                          </Text>
                        )}
                      </Group>
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            </MenuDropdown>
          </Menu>
        )
      )}

      {isSticky && (
        <Box className="animate-fadeTop hidden xl:block">
          <Popover width={500} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="outline"
                size="sm"
                radius={"xl"}
                leftSection={<BiSearch className="w-5 h-5" />}
              >
                Tìm kiếm
              </Button>
            </Popover.Target>
            <Popover.Dropdown className="border-none">
              <SearchDropdownSection />
            </Popover.Dropdown>
          </Popover>
        </Box>
      )}
    </Flex>
  );
}
