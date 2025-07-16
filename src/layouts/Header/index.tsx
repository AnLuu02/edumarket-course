import { Box, Button, Group, rem } from "@mantine/core";
import { GiTeacher } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { bgPrimary } from "../../utils/constant";
import { NavigationMobileSection } from "./Section/Navigation-mobile-section";
import { NavigationSection } from "./Section/Navigation-section";
import { SearchDropdownSection } from "./Section/Search-dropdown-section";

export default function Header() {
  return (
    <>
      <Box
        h={70}
        className="border-b border-gray-200 bg-white/80 backdrop-blur-md  z-50 fixed top-0 sm:relative"
        top={0}
        left={0}
        right={0}
      >
        <Group
          justify="space-between"
          w={"100%"}
          className="h-full"
          px={{ base: 16, sm: 24, md: 50, lg: 120 }}
        >
          <Logo />

          <Box className="flex-1 lg:max-w-md lg:mx-8 hidden md:block">
            <SearchDropdownSection />
          </Box>

          <Link
            to="/teach"
            style={{
              fontSize: rem(14),
              fontWeight: 500,
              color: "#4b5563"
            }}
            className=" hidden md:flex"
          >
            <Button
              radius={"md"}
              leftSection={<GiTeacher size={16} />}
              variant="gradient"
              className={bgPrimary}
            >
              Trở thành giảng viên
            </Button>
          </Link>

          <Box className="md:hidden ">
            <NavigationMobileSection />
          </Box>
        </Group>
      </Box>

      <Box pos={"sticky"} top={0} className="z-40 hidden md:block" h={70}>
        <NavigationSection />
      </Box>
    </>
  );
}
