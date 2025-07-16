import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "../../components/Scroll-to-top";
import { ModalProvider } from "../../contexts/ModalContext";
import Footer from "../Footer";
import Header from "../Header";

export default function Layout() {
  return (
    <ModalProvider>
      <Box
        pos={"relative"}
        className="inset-0 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen z-50"
      >
        <Header />
        <Box className="pt-[80px] sm:pt-0">
          <Outlet />
        </Box>
        <Footer />
      </Box>
      <ScrollToTop />
    </ModalProvider>
  );
}
