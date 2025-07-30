# 📚 EduMarket - Nền tảng học trực tuyến với AI

## 📝 Giới Thiệu
EduMarket là nền tảng học trực tuyến hiện đại, hỗ trợ người học tìm kiếm và khám phá khóa học thông minh bằng **trợ lý AI**.

- 💬 Chatbot AI tư vấn khóa học theo từ khóa, sở thích, hành vi.
- ❤️ Yêu thích khóa học.
- 🛒 Thêm vào giỏ hàng (mock).
- 🔍 Lọc theo cấp độ, giá, tìm kiếm từ khóa. v.v
- 📱 Responsive giao diện mobile/tablet/desktop.


## 🚀 Công Nghệ Sử Dụng

- ⚛️ React 18
- 🧭 React Router v6
- ⚡ Vite
- 🧠 TypeScript
- 🎨 Mantine v7 (UI library)
- 💨 Tailwind CSS (Styling)
- 🔧 Axios Mock Adapter (giả lập API AI)


## 📂 Cấu Trúc Dự Án
```
📦 edumarket
├── 📂 src
│ ├── 📂 assets # Hình ảnh, dữ liệu giả
│ ├── 📂 components # Component UI (ChatBox, CourseCard, ...)
│ ├── 📂 contexts # Context toàn cục (ví dụ: ModalContext)
│ ├── 📂 hooks # Custom React Hooks
│ ├── 📂 layouts # Layout trang
│ ├── 📂 pages # Trang chính (Home, Courses, ...)
│ ├── 📂 routes # Định tuyến
│ ├── 📂 types # TypeScript types
│ ├── 📂 utils # Hàm tiện ích (generateCourses, formatter, ...)
│ ├── App.tsx # Gốc ứng dụng
│ ├── main.tsx # Mount vào DOM
│ ├── mockApi.ts # File mock logic AI chatbot
│ ├── vite-env.d.ts # Type cho Vite
├── 📄 index.css # Tailwind + Mantine base style
├── 📄 .gitignore
└── 📄 README.md   
```


## 🛠 Cài Đặt

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AnLuu02/edumarket-course.git
#
cd edumarket-course
```

### 2️⃣ Cài Đặt Dependencies
```bash
npm install
# hoặc
yarn install
```

### 3️⃣ Chạy Dự Án
```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt tại: http://localhost:5173


## 🌐 Triển Khai
Dự án đã được triển khai tại:
🔗 https://edumarket-course.vercel.app/


## ✅ Tính Năng
 - ✅ Giao diện thân thiện, dễ sử dụng.

 - ✅ Chatbot AI tư vấn khóa học.

 - ✅ Gợi ý thông minh theo hành vi người dùng (mock).

 - ✅ Lọc khóa học theo cấp độ, giá, danh mục,...

 - ✅ Giao diện responsive cho mobile/tablet/desktop.

 - ✅ Sử dụng Tailwind kết hợp Mantine v7.

 - ✅ Không cần backend — API được mock bằng Axios Adapter.


 ## 📌 Ghi chú
 - Dự án không yêu cầu .env, vì toàn bộ API đều được giả lập cục bộ bằng mockApi.ts.

 - Các dữ liệu như khóa học, giảng viên, gợi ý... đều được sinh ngẫu nhiên bằng hàm generateCourses()


## 📥 Đóng Góp
 - Mọi đóng góp đều được hoan nghênh!
 - Fork, tạo branch và gửi pull request ❤️
