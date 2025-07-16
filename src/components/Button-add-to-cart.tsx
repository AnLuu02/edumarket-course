import { ActionIcon, Button, Tooltip } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { CgShoppingCart } from "react-icons/cg";
import type { Course } from "../types/course";
import { NotifyError, NotifySuccess } from "../utils/func-handler/notify";

export function ButtonAddToCart({
  course,
  styles,
  variant = "default"
}: {
  course: Course;
  styles?: {
    c?: string;
    bg?: string;
    size?: string;
    w?: string | number;
    h?: string | number;
    variant?: "default" | "outline" | "light" | "transparent" | "subtle";
  };
  variant?: "default" | "icon";
}) {
  const [cart, setCart] = useLocalStorage<Course[]>({
    key: "cart",
    defaultValue: []
  });
  const onAddToCart = (courseId: string) => {
    const existingCourse = cart.find((item) => item.id === courseId);
    if (existingCourse) {
      NotifyError(
        "Khóa học đã có trong giỏ hàng!",
        "Khóa học đã có trong giỏ hàng. Vui lòng kiểm tra giỏ hàng."
      );
    } else {
      setCart([...cart, course]);
      NotifySuccess(
        "Thêm khóa học thành công!",
        "Khóa học đã được thêm vào giỏ hàng. Vui lòng kiểm tra giỏ hàng."
      );
    }
  };
  const courseExist = cart.some((item) => item.id === course.id);
  return (
    <Tooltip
      label={courseExist ? "Đã có trong giỏ hàng!" : "Thêm vào giỏ hàng"}
    >
      {variant === "icon" ? (
        <ActionIcon
          onClick={() => onAddToCart(course.id)}
          disabled={courseExist}
          variant="filled"
          {...styles}
        >
          <CgShoppingCart className="w-4 h-4" />
        </ActionIcon>
      ) : (
        <Button
          variant="filled"
          {...styles}
          disabled={courseExist}
          leftSection={<CgShoppingCart className="w-4 h-4" />}
          onClick={() => onAddToCart(course.id)}
        >
          Thêm
        </Button>
      )}
    </Tooltip>
  );
}
