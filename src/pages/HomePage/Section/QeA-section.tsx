import { Accordion, Box, Button, Stack } from "@mantine/core";
import { BsQuestion } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { TitleCustom } from "../../../components/Title-custom";
import { QandA } from "../../../utils/mock-data-render";

export function QeASection() {
  return (
    <>
      <Box className="mb-20">
        <TitleCustom title="Câu hỏi thường gặp" className={"mb-10"} />

        <Box px={{ base: 0, sm: 50, lg: 200 }}>
          <Accordion>
            <Stack gap="md">
              {QandA.map((faq, index) => (
                <Accordion.Item
                  key={faq.question + index}
                  value={`faq-${index}`}
                >
                  <Accordion.Control icon={<BsQuestion size={30} />}>
                    {faq.question}
                  </Accordion.Control>
                  <Accordion.Panel>{faq.answer}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Stack>
          </Accordion>

          <Box className="text-center mt-8">
            <Button
              variant="outline"
              rightSection={
                <IoIosArrowForward className="w-4 h-4 bg-transparent" />
              }
            >
              Xem tất cả
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
