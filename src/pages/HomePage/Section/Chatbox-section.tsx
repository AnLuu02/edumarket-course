import {
  Badge,
  Box,
  Center,
  Menu,
  MenuDropdown,
  MenuTarget,
  Text
} from "@mantine/core";
import { FiMessageCircle } from "react-icons/fi";
import { Chatbox } from "../../../components/Chat-box";
import { bgPrimary } from "../../../utils/constant";

export function ChatboxSection() {
  return (
    <Box pos={"fixed"} left={20} bottom={"14%"} className="z-[200]">
      <Menu shadow="md" width={"max-content"} position="top-start" offset={0}>
        <MenuTarget>
          <Center className=" rounded-full">
            <Badge
              radius={"xl"}
              p={0}
              m={0}
              w={50}
              h={50}
              variant="gradient"
              className={`hover:cursor-pointer hover:opacity-90 duration-75 ${bgPrimary}`}
            >
              <FiMessageCircle size={24} className="animate-wiggle" />
            </Badge>
            <Text className="absolute z-[-1] h-full w-full animate-ping rounded-full bg-blue-600 opacity-10"></Text>
            <Text className="absolute z-[-1] h-[80%] w-[80%] animate-ping rounded-full bg-purple-600  opacity-20"></Text>
            <Text className="absolute z-[-1] h-[60%] w-[60%] animate-ping rounded-full bgblue-600  opacity-30"></Text>
          </Center>
        </MenuTarget>

        <MenuDropdown
          className="overflow-hidden rounded-md bg-white shadow-md"
          ml={{ base: 0, sm: 40, md: 40, lg: 40 }}
          p={0}
        >
          <Chatbox />
        </MenuDropdown>
      </Menu>
    </Box>
  );
}
