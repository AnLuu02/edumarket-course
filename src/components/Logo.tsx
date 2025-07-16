import { Box, Text } from "@mantine/core";
import { BsRainbow } from "react-icons/bs";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 no-underline">
      <Box className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <BsRainbow className="w-6 h-6 text-white" />
      </Box>
      <Box>
        <Text
          size="xl"
          fw={700}
          className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          EduMarket
        </Text>
        <Text size="xs" className="text-gray-500">
          Smart Learning Platform
        </Text>
      </Box>
    </Link>
  );
}
