import { Box, Card, Group, Skeleton, Stack } from "@mantine/core";

export function CardSkeleton({ horizontal }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <Group align="flex-start" gap="md">
          <Box className="relative">
            <Skeleton className="w-64 h-36 rounded-lg" />
          </Box>

          <Box className="flex-1">
            <Group justify="space-between" align="flex-start" mb="xs">
              <Box className="mb-2 flex-1">
                <Group gap="xs" mb="xs">
                  <Skeleton height={20} width={70} radius="xl" />
                  <Skeleton height={20} width={50} radius="xl" />
                </Group>

                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={12} width="40%" className="mb-2" />
                <Skeleton height={14} width="90%" />
              </Box>

              <Box className="text-right">
                <Skeleton height={20} width={60} className="mb-1" />
                <Skeleton height={14} width={40} />
              </Box>
            </Group>

            <Group justify="space-between" align="center">
              <Group gap="lg">
                <Skeleton height={16} width={120} />
                <Skeleton height={16} width={100} />
                <Skeleton height={16} width={60} />
                <Skeleton height={16} width={90} />
              </Group>

              <Group gap="xs">
                <Skeleton height={32} width={32} radius="xl" />
                <Skeleton height={32} width={32} radius="xl" />
                <Skeleton height={32} width={100} radius="xl" />
              </Group>
            </Group>
          </Box>
        </Group>
      </Card>
    );
  }
  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Card.Section>
        <Box className="relative">
          <Skeleton height={192} />
        </Box>
      </Card.Section>

      <Stack gap="sm" py={"xs"}>
        <Box>
          <>
            <Skeleton height={16} width="80%" className="mb-2" />
            <Skeleton height={12} width="50%" />
          </>
        </Box>

        <Group justify="space-between" className="text-sm">
          <Skeleton height={16} width="60%" />

          <Skeleton height={16} width="20%" />
        </Group>

        <Group gap="xs">
          <Skeleton height={20} width={40} radius="xl" />
          <Skeleton height={20} width={40} radius="xl" />
        </Group>

        <Group justify="space-between" align="center" className="mt-auto pt-3">
          <Box>
            <>
              <Skeleton height={20} width={60} />
            </>
          </Box>
          <Skeleton height={32} width={90} radius="xl" />
        </Group>
      </Stack>
    </Card>
  );
}
