import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Loader,
  Menu,
  Paper,
  rem,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Spoiler,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton
} from "@mantine/core";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { BiDotsHorizontal, BiTrash, BiUser } from "react-icons/bi";
import { BsRobot, BsSend } from "react-icons/bs";
import type { Message } from "../types/other";
import { NotifyError } from "../utils/func-handler/notify";
import { scrollToBottom } from "../utils/func-handler/scrollToBottomChatbox";
import { ButtonAddToCart } from "./Button-add-to-cart";
import { TypingIndicator } from "./Typing-indicator";

export function Chatbox() {
  const initialMessage: Message = {
    sender: "Bot",
    text: "Tôi là chatbox của EduMarket. Tôi có thể giúp gì cho bạn?",
    quickReplies: [
      "Tôi muốn học tiếng Anh",
      "Khóa học AI",
      "Có gì giảm giá?",
      "Tư vấn chọn khóa học"
    ],
    suggestions: [],
    timestamp: new Date().toISOString()
  };
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  useEffect(() => {
    scrollToBottom(scrollAreaRef as any);
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "User",
        text: message,
        timestamp: new Date().toISOString()
      }
    ]);

    setMessage("");
    setLoading(true);
    scrollToBottom();

    try {
      const res = await axios.post("/api/ai-chat", {
        message: message
      });

      if (res.status === 200) {
        const botMessage: Message = {
          sender: "Bot",
          text: res.data.reply,
          suggestions: res.data.suggestions,
          quickReplies: res.data.quickReplies,
          timestamp: new Date().toISOString()
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        NotifyError("Lỗi gửi tin nhắn", "Đã có lỗi không mong muốn xảy ra.");
      }
    } catch (error) {
      NotifyError("Lỗi gửi tin nhắn", "Đã có lỗi không mong muốn xảy ra.");
      setMessages((prev) => [
        ...prev,
        {
          sender: "Bot",
          text: "Lỗi hệ thống, thử lại sau.",
          suggestions: [],
          quickReplies: [],
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      w={{ base: 335, sm: 450, md: 450, lg: 400 }}
      h={{ base: 400, sm: 500, md: 500, lg: 500 }}
      className="dark:bg-dark-card flex flex-col overflow-hidden bg-gray-100"
    >
      <UnstyledButton
        p={"xs"}
        style={{
          background: "linear-gradient(135deg, #228be6 0%, #7048e8 100%)"
        }}
      >
        <Flex align={"center"} gap={"xs"} justify={"space-between"}>
          <Group>
            <Avatar src={`/bot.jpg`} radius="xl" />

            <Box style={{ flex: 1 }}>
              <Text size="md" fw={700} className="text-white">
                Chat support
              </Text>

              <Text className="text-white" size="xs">
                EduMarket@contact.com
              </Text>
            </Box>
          </Group>
          <Menu width={200} shadow="md" zIndex={1000000} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="transparent" size={30} color="white">
                <BiDotsHorizontal color="white" size={20} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<BiTrash size={14} color="red" />}
                onClick={() => setMessages([initialMessage])}
              >
                Xóa đoạn chat
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </UnstyledButton>
      <ScrollArea
        className="mb-4 flex-grow"
        scrollbarSize={7}
        viewportRef={scrollAreaRef}
      >
        <Box p="md" w={"100%"}>
          <Stack gap="md">
            {messages.map((message, index) => (
              <Flex
                key={index}
                direction={message.sender === "User" ? "row-reverse" : "row"}
                align="flex-start"
                gap="sm"
              >
                <Avatar
                  size="sm"
                  radius="xl"
                  color={message.sender === "Bot" ? "blue" : "violet"}
                  variant="filled"
                >
                  {message.sender === "Bot" ? (
                    <BsRobot size="1rem" />
                  ) : (
                    <BiUser size="1rem" />
                  )}
                </Avatar>

                <Box maw="80%">
                  <Paper
                    p="sm"
                    radius="lg"
                    style={{
                      background:
                        message.sender === "Bot"
                          ? "white"
                          : "linear-gradient(135deg, #4dabf7 0%, #9775fa 100%)",
                      color: message.sender === "Bot" ? "#000" : "#fff",
                      borderRadius:
                        message.sender === "Bot"
                          ? "1rem 1rem 1rem 0.25rem"
                          : "1rem 1rem 0.25rem 1rem"
                    }}
                  >
                    <Text
                      size="sm"
                      c={message.sender === "Bot" ? "dark" : "white"}
                      style={{ wordBreak: "break-word" }}
                    >
                      {message.text}
                    </Text>
                  </Paper>
                  <Box mb={"md"}>
                    <Spoiler
                      maxHeight={140}
                      showLabel="Xem thêm"
                      hideLabel="Ẩn"
                      classNames={{ control: "text-sm" }}
                    >
                      {message.suggestions &&
                        message.suggestions.length > 0 && (
                          <SimpleGrid spacing={10} mt={6}>
                            {message.suggestions.map((course) => (
                              <Flex
                                key={course.id}
                                gap="sm"
                                p="xs"
                                bg="gray.0"
                                pos={"relative"}
                                style={{
                                  border: "1px solid #ddd",
                                  borderRadius: 8
                                }}
                              >
                                <Box
                                  w={80}
                                  h={80}
                                  className="rounded-lg object-cover"
                                  pos={"relative"}
                                >
                                  <Skeleton
                                    w={80}
                                    h={80}
                                    pos={"absolute"}
                                    className="inset-0 z-[-1] rounded-lg "
                                  />
                                  <Image
                                    src={course.image}
                                    alt={course.title}
                                    w={80}
                                    h={80}
                                    style={{
                                      objectFit: "cover",
                                      flexShrink: 0
                                    }}
                                    className="rounded-lg object-cover z-1 absolute"
                                  />
                                </Box>
                                <Stack gap={4} style={{ flex: 1 }}>
                                  <Tooltip label={course.title}>
                                    <Text size="sm" fw={600} lineClamp={2}>
                                      {course.title}
                                    </Text>
                                  </Tooltip>
                                  <Text size="xs" c="dimmed" lineClamp={2}>
                                    {course.description}
                                  </Text>
                                  <Group>
                                    <Button
                                      size="xs"
                                      radius="md"
                                      variant="light"
                                      color="blue"
                                      w="fit-content"
                                      classNames={{
                                        root: "hover:bg-blue-200"
                                      }}
                                      onClick={() =>
                                        alert(`Xem khóa học: ${course.title}`)
                                      }
                                    >
                                      Xem khóa học
                                    </Button>
                                    <ButtonAddToCart
                                      variant="icon"
                                      course={course}
                                    />
                                  </Group>
                                  {course.originalPrice &&
                                    course.originalPrice > 0 && (
                                      <Badge
                                        className="absolute top-1 left-3 bg-red-400"
                                        size="xs"
                                      >
                                        -{" "}
                                        {(
                                          (course.price /
                                            course.originalPrice) *
                                          100
                                        ).toFixed(2)}
                                        %
                                      </Badge>
                                    )}
                                </Stack>
                              </Flex>
                            ))}
                          </SimpleGrid>
                        )}
                    </Spoiler>
                  </Box>
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <Group wrap="wrap" gap="xs">
                      {message.quickReplies.map((reply, idx) => (
                        <Button
                          key={idx}
                          variant="light"
                          color="blue"
                          size="xs"
                          radius={"xl"}
                          classNames={{
                            root: "capitalize bg-gray-200 hover:bg-gray-50 text-gray-600"
                          }}
                          onClick={() => {
                            sendMessage(reply);
                          }}
                        >
                          {reply}
                        </Button>
                      ))}
                    </Group>
                  )}

                  <Text
                    size="xs"
                    c="dimmed"
                    ta={message.sender === "User" ? "right" : "left"}
                    mt={4}
                    px="sm"
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </Text>
                </Box>
              </Flex>
            ))}

            {loading && (
              <Flex align="flex-start" gap="sm">
                <Avatar size="sm" radius="xl" color="blue" variant="filled">
                  <BsRobot size="1rem" />
                </Avatar>
                <Box>
                  <Paper
                    p="sm"
                    radius="lg"
                    bg="gray.1"
                    style={{ borderRadius: "1rem 1rem 1rem 0.25rem" }}
                  >
                    <TypingIndicator />
                  </Paper>
                  <Text size="xs" c="dimmed" mt={4} px="sm">
                    Chatbox đang nhập...
                  </Text>
                </Box>
              </Flex>
            )}
          </Stack>
        </Box>
      </ScrollArea>
      <Stack p={"xs"} gap={2}>
        <Flex align={"center"} gap={"xs"} justify={"space-between"}>
          <TextInput
            value={message}
            radius={"xl"}
            size="xs"
            className="flex-grow"
            placeholder="Type your message..."
            disabled={loading}
            rightSection={
              <ActionIcon
                onClick={() => {
                  if (!loading) {
                    sendMessage(message);
                  }
                }}
                disabled={loading || !message}
                variant="transparent"
                size="sm"
                radius="xl"
                style={{ marginRight: rem(4) }}
              >
                {loading ? (
                  <Loader size="xs" color="white" />
                ) : (
                  <BsSend size="1rem" />
                )}
              </ActionIcon>
            }
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (!loading) {
                  sendMessage(message);
                }
              }
            }}
          />
        </Flex>
      </Stack>
    </Box>
  );
}
