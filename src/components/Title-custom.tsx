import { Title } from "@mantine/core";

export function TitleCustom({
  title,
  className
}: {
  title: string;
  className?: string | any | undefined;
}) {
  return (
    <Title
      order={2}
      h={45}
      className={`text-center text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}
    >
      {title}
    </Title>
  );
}
