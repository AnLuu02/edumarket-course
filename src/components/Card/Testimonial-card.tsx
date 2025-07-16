import { Box, Flex, Image, Skeleton, Text } from "@mantine/core";
import type { TestimonialCardProps } from "../../types/other";

export function TestimonialCard({
  quote,
  reviewerName,
  lessons,
  tutorSubject,
  tutorSubjectColor,
  avatarSrc,
  bgColorClass
}: TestimonialCardProps) {
  return (
    <Box
      className={`
        "flex flex-col items-start p-6 rounded-xl shadow-md min-w-[100px] md:min-w-[500px] lg:min-w-[700px] max-w-[340px]  md:max-w-sm border-white border-[14px] 
        ${bgColorClass}`}
    >
      <Box className={`text-3xl font-bold mb-4 ${tutorSubjectColor}`}>
        “ {reviewerName}
      </Box>
      <Flex
        align={"center"}
        direction={{ base: "column", sm: "row" }}
        className=" mb-4"
      >
        <Box
          w={120}
          h={120}
          className="rounded-full object-cover mr-4"
          pos={"relative"}
        >
          <Image
            src={avatarSrc || "/placeholder.svg"}
            alt={reviewerName}
            w={120}
            h={120}
            className="rounded-full object-cover mr-4 z-10 absolute"
          />
          <Skeleton
            w={120}
            h={120}
            circle
            pos={"absolute"}
            className="inset-0 z-1"
          />
        </Box>
        <Text className="text-gray-700 text-base text-left flex-1">
          {quote}
        </Text>
      </Flex>
      <Text size="sm" className="text-sm text-gray-600 mb-2">
        {reviewerName}, {lessons} bài học với {reviewerName.split(" ")[0]}
      </Text>
      <Text className={`text-sm font-semibold ${tutorSubjectColor}`}>
        {tutorSubject}
      </Text>
    </Box>
  );
}
