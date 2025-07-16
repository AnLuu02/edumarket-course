import {
  Box,
  Button,
  Divider,
  Drawer,
  ScrollAreaAutosize,
  Title
} from "@mantine/core";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import SortByComponent from "../../../components/Filter/Sort-component";
import { bgPrimary } from "../../../utils/constant";
import { Sidebar } from "./Sidebar";

export function SidebarSection() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <Button
        variant="gradient"
        onClick={() => setOpenSidebar(true)}
        leftSection={<FiFilter size={16} />}
        className={`${bgPrimary} lg:hidden z-[100] md:z-0`}
      >
        Lọc
      </Button>
      <Box className="hidden lg:block">
        <Sidebar />
      </Box>
      <Drawer
        opened={openSidebar}
        onClose={() => setOpenSidebar(false)}
        title={<Title order={3}>Bộ lọc</Title>}
        position="left"
        size="sm"
      >
        <ScrollAreaAutosize className="h-full">
          {openSidebar && (
            <>
              <SortByComponent label="Sắp xếp theo" />
              <Divider my="sm" />
              <Sidebar />
            </>
          )}
        </ScrollAreaAutosize>
      </Drawer>
    </>
  );
}
