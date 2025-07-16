import { Box, Group, rem } from "@mantine/core";

export const TypingIndicator = () => (
  <Group gap={4} w="max-content">
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        w={rem(8)}
        h={rem(8)}
        bg="gray.5"
        style={{
          borderRadius: "50%",
          animation: "bounce 1.4s infinite ease-in-out",
          animationDelay: `${i * 0.16}s`
        }}
      />
    ))}
  </Group>
);
