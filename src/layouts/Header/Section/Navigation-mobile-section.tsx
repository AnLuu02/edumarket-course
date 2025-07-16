import { ActionIcon, Box, Drawer, Group, Text } from "@mantine/core";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import { Logo } from "../../../components/Logo";
import { NavigationIcon } from "./Navigation-icon";
import { NavigationText } from "./Navigation-text";
import { SearchDropdownSection } from "./Search-dropdown-section";

export function NavigationMobileSection() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <>
      <Group gap={"xl"}>
        <ActionIcon variant="transparent" onClick={() => setDrawerOpened(true)}>
          <BiSearch className="w-10 h-10 sm:text-gray-600" />
        </ActionIcon>
        <ActionIcon variant="transparent" onClick={() => setDrawerOpened(true)}>
          <IoMdMenu className="w-10 h-10 sm:text-gray-600" />
        </ActionIcon>
      </Group>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={<Logo />}
      >
        <SearchDropdownSection />
        <Box my={{ base: "md", sm: "xl", xl: "0" }}>
          <NavigationIcon
            drawerOpened={drawerOpened}
            onCloseDrawer={() => setDrawerOpened(false)}
          />
        </Box>
        <NavigationText
          drawerOpened={drawerOpened}
          onCloseDrawer={() => setDrawerOpened(false)}
        />
        <Box className="absolute bottom-0 left-0 right-0">
          <Text size="xs" c="gray" ta="center" py="sm">
            © 2025 EduMarket. All rights reserved.
          </Text>
        </Box>
      </Drawer>
    </>
  );
}
