import { Box, Center, Flex, Grid, GridCol, Text, Title } from "@mantine/core";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { PiBookOpenText } from "react-icons/pi";
import { TestimonialCard } from "../../../components/Card/Testimonial-card";
import { TitleCustom } from "../../../components/Title-custom";
import { testimonials } from "../../../utils/mock-data-render";

export function TestimonialSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: true
  });
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi]);

  return (
    <>
      <Flex
        align={"center"}
        justify={"center"}
        direction={"column"}
        className="py-12 bg-orange-50 text-center w-full"
      >
        <Box className="container px-4 md:px-6 text-center mb-12">
          <TitleCustom
            title="Gia sư tuyệt vời tiếp theo của bạn"
            className={"mb-2"}
          />

          <Text size="sm" c={"dimmed"} className="text-lg  max-w-2xl mx-auto">
            Tận hưởng sự hướng dẫn trực tiếp từ mạng lưới chuyên gia độc lập lớn
            nhất cả nước.
          </Text>
        </Box>
        <Box className="embla overflow-hidden  w-full" ref={emblaRef}>
          <Box className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <Box key={index} className="embla__slide flex-none min-w-0 px-4">
                <TestimonialCard {...testimonial} />
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>

      <Flex
        align="center"
        justify="center"
        className="relative py-12 md:py-24 lg:py-32 bg-[rgba(0,0,0,0.9)] text-white overflow-hidden"
      >
        <video
          id="background-video"
          autoPlay
          loop
          muted
          playsInline
          className="w-full absolute inset-0 z-0 opacity-30"
        >
          <source
            src="https://static1.wyzantcdn.com/homepage/hero-video.mp4"
            type="video/mp4"
          />
          Trình duyệt của bạn không hỗ trợ video.
        </video>

        <Box className="absolute inset-0 bg-[rgba(0,0,0,0.1)] z-0" />

        <Box className="container px-4 md:px-6 relative z-10">
          <Box className="max-w-3xl mx-auto text-center mb-12">
            <Title className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Học trực tuyến. <br />
              <span className="bg-green-500 px-3 py-2 mt-5 rounded-md inline-block ">
                Hiệu quả thực tế.
              </span>
            </Title>
          </Box>

          <Center>
            <Grid className=" mb-12" w={{ sm: "100%", md: "80%" }}>
              <GridCol span={{ base: 12, sm: 4 }}>
                <Box className="bg-white text-gray-900 p-6 sm:p-4 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <PiBookOpenText className="h-10 w-10 text-blue-600 mb-3" />
                  <Text className="text-3xl font-bold">12+ triệu</Text>
                  <Text className="text-lg text-muted-foreground">
                    Buổi học đã diễn ra
                  </Text>
                </Box>
              </GridCol>

              <GridCol span={{ base: 12, sm: 4 }}>
                <Box className="bg-white text-gray-900 p-6 sm:p-4 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <BiUser className="h-10 w-10 text-blue-600 mb-3" />
                  <Text className="text-3xl font-bold">3+ triệu</Text>
                  <Text className="text-lg text-muted-foreground">
                    Học viên toàn cầu
                  </Text>
                </Box>
              </GridCol>

              <GridCol span={{ base: 12, sm: 4 }}>
                <Box className="bg-white text-gray-900 p-6 sm:p-4 md:p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <BsFillStarFill className="h-10 w-10 text-blue-600 mb-3" />
                  <Text className="text-3xl font-bold">4.9</Text>
                  <Text className="text-lg text-muted-foreground">
                    Đánh giá trung bình
                  </Text>
                </Box>
              </GridCol>
            </Grid>
          </Center>

          <Text className="text-center text-lg md:text-xl text-gray-300">
            <span className="underline">Nền tảng học trực tuyến EduMarket</span>{" "}
            cung cấp lớp học tương tác, cá nhân hóa và hỗ trợ AI toàn diện cho
            mọi lĩnh vực.
          </Text>
        </Box>
      </Flex>
    </>
  );
}
