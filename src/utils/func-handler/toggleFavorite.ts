import axios from "axios";
import { NotifyError, NotifySuccess } from "./notify";

export async function onToggleFavorite(courseId: string, userId: string) {
  try {
    const response = await axios.post("/api/like-course", { courseId, userId });
    if (response.data.isFavorite) {
      NotifySuccess("Thao tác thành công", "Đã thêm vào danh sách yêu thích");
    } else {
      NotifySuccess("Thao tác thành công", "Đã xóa khỏi danh sách yêu thích");
    }
  } catch (error) {
    console.error("Toggle like error", error);
    NotifyError("Thao tác thất bai", "Vui lòng thử lại sau");
    throw error;
  }
}
