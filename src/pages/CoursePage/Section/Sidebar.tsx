import {
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text
} from "@mantine/core";
import { BiSearch } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { FilterCategories } from "../../../components/Filter/Filter-categories";
import { FilterLevel } from "../../../components/Filter/Filter-level";
import { FilterPriceChecked } from "../../../components/Filter/Filter-price-checked";
import { FilterPriceInput } from "../../../components/Filter/Filter-price-input";
import { FilterRating } from "../../../components/Filter/Filter-rating";
import { SearchSidebarSection } from "./Search-sidebar-section";

export function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFiltersCount = Array.from(searchParams.entries()).length || 0;

  return (
    <Card className="p-4 bg-gray-100 backdrop-blur-sm border-0 h-fit shadow-lg border-gray-100 sm:bg-white/60 ">
      <Tabs defaultValue="filters">
        <TabsList grow mb={20}>
          <TabsTab
            value="filters"
            fw={700}
            leftSection={<FiFilter fontWeight={700} size={16} />}
          >
            Bộ lọc
          </TabsTab>
          <TabsTab
            value="search"
            fw={700}
            leftSection={<BiSearch fontWeight={700} size={16} />}
          >
            Tìm kiếm
          </TabsTab>
        </TabsList>

        <TabsPanel value="filters">
          <Stack gap="md">
            {activeFiltersCount > 0 && (
              <Group justify="space-between" align="center">
                <Group gap={"xs"} align="center">
                  <Text size="sm" fw={700}>
                    Số bộ lọc:
                  </Text>
                  <Badge
                    size="xl"
                    color="blue"
                    variant="light"
                    radius="xl"
                    p={"xs"}
                  >
                    {activeFiltersCount}
                  </Badge>
                </Group>

                <Button
                  variant="light"
                  onClick={() => {
                    setSearchParams({}, { replace: true });
                  }}
                  w={"max-content"}
                  color="red"
                  size="xs"
                >
                  Xóa lọc
                </Button>
              </Group>
            )}
            <Stack mb={"md"}>
              <SimpleGrid cols={1} spacing="xs" w={"100%"} pos={"relative"}>
                <FilterPriceInput
                  errorMessage={(message) => (
                    <Text size="sm" c={"red"}>
                      {message}
                    </Text>
                  )}
                />
              </SimpleGrid>
              <FilterPriceChecked />
            </Stack>
            <Divider />
            <FilterCategories />
            <Divider />
            <FilterLevel />
            <Divider />
            <FilterRating />
          </Stack>
        </TabsPanel>
        <TabsPanel value="search">
          <SearchSidebarSection />
        </TabsPanel>
      </Tabs>
      <Center mt={"xl"}>
        <Text size="xs" c={"dimmed"}>
          © 2025 EduMarket. All rights reserved.
        </Text>
      </Center>
    </Card>
  );
}
