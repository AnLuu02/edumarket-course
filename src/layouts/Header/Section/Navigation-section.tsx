import { Box, Flex, Group } from "@mantine/core";
import { Logo } from "../../../components/Logo";
import useScrollPosition from "../../../hooks/use-scroll-point";
import { NavigationIcon } from "./Navigation-icon";
import { NavigationMobileSection } from "./Navigation-mobile-section";
import { NavigationText } from "./Navigation-text";

const HEIGHT_CONSTANT = 80;
export function NavigationSection() {
  const scroll = useScrollPosition(HEIGHT_CONSTANT);
  const isSticky = scroll >= HEIGHT_CONSTANT;
  return (
    <>
      <Box
        w="100%"
        h={70}
        py="sm"
        className={`${
          isSticky
            ? "border-b border-gray-200 bg-white z-50 animate-fadeTop"
            : ""
        } `}
      >
        <Box px={{ base: 0, sm: 24, md: 50, lg: 120 }}>
          <Flex
            direction={{ base: "column-reverse", sm: "row" }}
            justify={{
              base: "space-between",
              sm: isSticky ? "space-between" : "center",
              xl: "space-between"
            }}
            gap={"md"}
            align={{ base: "start", sm: "center" }}
          >
            <Box className="hidden xl:block">
              <NavigationText />
            </Box>
            <Group
              flex={isSticky ? 1 : ""}
              justify="space-between"
              className="hidden sm:flex xl:hidden"
            >
              {isSticky && (
                <Box className="animate-fadeTop hidden sm:block">
                  <Logo />
                </Box>
              )}
              <NavigationMobileSection />
            </Group>
            <NavigationIcon />
          </Flex>
        </Box>
      </Box>
    </>
  );
}
