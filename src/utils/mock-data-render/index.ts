import {
  BiBarChart,
  BiCategory,
  BiCode,
  BiHome,
  BiLogoDiscourse,
  BiPalette,
  BiQuestionMark,
  BiUser
} from "react-icons/bi";

import {
  BiAward,
  BiBookOpen,
  BiBriefcase,
  BiMessageSquare,
  BiMoney,
  BiTrophy,
  BiVideo
} from "react-icons/bi";
import { BsClipboardCheck, BsClock, BsPuzzle, BsRainbow } from "react-icons/bs";
import { CgPresentation } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GiLightBulb } from "react-icons/gi";
import type { Category } from "../../types/other";

export const categoriesHot = [
  {
    icon: CgPresentation,
    title: "Giao tiếp & Thuyết trình",
    courses: "120+ khóa học",
    color: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: BiPalette,
    title: "Thiết kế & Sáng tạo",
    courses: "85+ khóa học",
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    icon: BiCode,
    title: "Lập trình & Công nghệ",
    courses: "95+ khóa học",
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  {
    icon: BiBriefcase,
    title: "Kinh doanh & Khởi nghiệp",
    courses: "60+ khóa học",
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  }
];

export const learningOptions = [
  {
    icon: FaUsers,
    title: "1 kèm 1 bởi chuyên gia",
    description:
      "Kết nối với giảng viên và chuyên gia hàng đầu trong lĩnh vực của bạn. Được hướng dẫn cá nhân hóa theo lộ trình học phù hợp.",
    features: [
      "Lịch học linh hoạt",
      "Tương tác trực tiếp",
      "Phản hồi chi tiết"
    ],
    buttonText: "Tìm giảng viên phù hợp",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    badge: "Phổ biến",
    badgeColor: "bg-red-100 text-red-700"
  },
  {
    icon: BiVideo,
    title: "Lớp học nhóm trực tuyến",
    description:
      "Tham gia các lớp học nhóm thú vị, đặc sắc và tương tác cùng bạn bè bốn phương, do giảng viên giàu kinh nghiệm hướng dẫn.",
    features: ["Học cùng bạn bè", "Thảo luận nhóm", "Chi phí tiết kiệm"],
    buttonText: "Xem tất cả lớp học",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badge: "Tương tác cao",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  {
    icon: BiCode,
    title: "Thực hành miễn phí",
    description:
      "Tham gia cộng đồng học viên năng động, tươi trẻ cùng nhau chia sẻ và thực hành miễn phí với hàng nghìn người từ khắp nơi.",
    features: ["Không giới hạn thời gian", "Cộng đồng hỗ trợ", "Dự án thực tế"],
    buttonText: "Khám phá cộng đồng",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    badge: "Miễn phí",
    badgeColor: "bg-green-100 text-green-700"
  }
];

export const features = [
  {
    icon: BsRainbow,
    title: "Học tập cá nhân hóa với AI",
    gradient: { from: "blue", to: "cyan" },
    message:
      "Tối ưu lộ trình học tập dựa trên sở thích, năng lực và tốc độ riêng của từng học viên nhờ trí tuệ nhân tạo."
  },
  {
    icon: BiMessageSquare,
    title: "Tương tác học tập linh hoạt",
    gradient: { from: "purple", to: "pink" },
    message:
      "Trao đổi trực tiếp với giảng viên hoặc trợ lý AI để giải đáp thắc mắc và hỗ trợ kịp thời trong suốt quá trình học."
  },
  {
    icon: BiAward,
    title: "Lộ trình rõ ràng & chứng chỉ uy tín",
    gradient: { from: "orange", to: "red" },
    message:
      "Theo dõi tiến độ học tập dễ dàng và nhận chứng chỉ chất lượng sau khi hoàn thành khóa học."
  },
  {
    icon: BiMoney,
    title: "Chi phí hợp lý, linh hoạt",
    gradient: { from: "green", to: "lime" },
    message:
      "Học tập chất lượng cao với mức chi phí phù hợp. Nhiều ưu đãi và chính sách học bổng dành cho học viên."
  }
];

export const interactiveContent = [
  {
    id: 1,
    title: "Kiểm tra trình độ học tập",
    description:
      "Đánh giá kiến thức hiện tại của bạn thông qua bài trắc nghiệm đa dạng, sát với thực tế.",
    icon: BsClipboardCheck,
    buttonText: "Bắt đầu kiểm tra",
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    title: "Giải đố học thuật thú vị",
    description:
      "Phát triển tư duy logic và khả năng phản xạ qua các câu đố thông minh, gần gũi với kiến thức phổ thông.",
    icon: BsPuzzle,
    buttonText: "Khám phá ngay",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 3,
    title: "Khám phá tri thức mỗi ngày",
    description:
      "Mở rộng hiểu biết thông qua những sự thật thú vị, bổ ích về giáo dục, khoa học và đời sống.",
    icon: GiLightBulb,
    buttonText: "Tìm hiểu ngay",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    title: "Thử thách kỹ năng thực tiễn",
    description:
      "Áp dụng kiến thức vào các tình huống đời sống để nâng cao kỹ năng tư duy và xử lý vấn đề.",
    icon: BiTrophy,
    buttonText: "Tham gia ngay",
    color: "from-pink-500 to-rose-500"
  }
];

export const popularTags = [
  "JavaScript",
  "React",
  "Python",
  "UI/UX Design",
  "Digital Marketing",
  "Data Science",
  "Photoshop",
  "Excel"
];

export const trendingTags = [
  "AI & ChatGPT",
  "Blockchain",
  "Cloud Computing",
  "Mobile Development"
];

export const stats = [
  {
    number: "100K+",
    label: "Học viên",
    color: "text-blue-600",
    icon: FiUsers
  },
  {
    number: "500+",
    label: "Đa lĩnh vực",
    color: "text-purple-600",
    icon: BiBookOpen
  },
  {
    number: "95%",
    label: "Tỷ lệ hài lòng",
    color: "text-green-600",
    icon: BiAward
  },
  {
    number: "24/7",
    label: "Hỗ trợ học viên",
    color: "text-orange-600",
    icon: BsClock
  }
];

export const QandA = [
  {
    question: "Nền tảng EduMarket hoạt động như thế nào?",
    answer:
      "EduMarket là sàn thương mại điện tử giáo dục tích hợp công nghệ AI, giúp bạn tiếp cận khóa học từ nhiều lĩnh vực như ngoại ngữ, công nghệ, kỹ năng mềm... Hệ thống sẽ gợi ý lộ trình phù hợp với năng lực và mục tiêu cá nhân."
  },
  {
    question: "Tôi có thể học bao nhiêu khóa một lúc?",
    answer:
      "Bạn có thể đăng ký học nhiều khóa cùng lúc và theo dõi tiến trình riêng biệt của từng khóa. Nền tảng hỗ trợ học linh hoạt theo lịch cá nhân."
  },
  {
    question: "Tôi có thể tin tưởng chất lượng khóa học chứ?",
    answer:
      "Chúng tôi chọn lọc giảng viên và đơn vị đào tạo uy tín, có đánh giá từ người học thực tế, kèm theo chính sách đảm bảo chất lượng nội dung và hỗ trợ học tập."
  },
  {
    question: "Làm sao để trở thành giảng viên trên EduMarket?",
    answer:
      "Bạn chỉ cần có kinh nghiệm giảng dạy, nội dung đào tạo phù hợp và hồ sơ xác thực. Sau đó, bạn có thể tạo khóa học và sử dụng các công cụ AI để hỗ trợ quản lý, giảng dạy và theo dõi học viên."
  }
];

export const testimonials = [
  {
    quote:
      "Mỗi buổi học đều mới mẻ và thú vị, giúp tôi tiến bộ rõ rệt sau mỗi lần học. Điều quan trọng nhất là cô Rashida đã giúp tôi yêu giọng nói của chính mình và không còn cố gắng bắt chước giọng người khác. Tôi rất mong được tiếp tục đồng hành cùng cô ấy để hoàn thiện bản thân hơn nữa. Tôi vô cùng biết ơn cô ấy. Cô ấy xứng đáng được đánh giá cao nhất!",
    reviewerName: "Ngọc Linh",
    lessons: 19,
    tutorSubject: "Gia sư Thanh nhạc",
    tutorSubjectColor: "text-orange-600",
    avatarSrc: "https://picsum.photos/seed/course-66/300/200",
    bgColorClass: "bg-orange-50"
  },
  {
    quote:
      "Thầy Charles là một gia sư tuyệt vời cho con gái 17 tuổi của tôi trong môn Hóa học. Thầy giảng bài rất dễ hiểu và tạo được môi trường học tập tích cực. Kể từ khi học với thầy, con bé hiểu bài hơn rất nhiều và điểm số cũng cải thiện rõ rệt! Thầy rất linh hoạt trong việc sắp xếp lịch học và luôn sẵn sàng giải đáp thắc mắc. Gia đình tôi đánh giá rất cao thầy Charles!",
    reviewerName: "Anh Thư",
    lessons: 104,
    tutorSubject: "Gia sư Hóa học",
    tutorSubjectColor: "text-green-600",
    avatarSrc: "https://picsum.photos/seed/course-12/300/200",
    bgColorClass: "bg-green-50"
  },
  {
    quote:
      "Con trai tôi là học sinh lớp 10 và gặp khó khăn với môn Hình học. Thầy Danny là một gia sư Hình học rất giỏi. Từ điểm D, con đã vươn lên điểm B chỉ sau một học kỳ. Gia đình tôi rất hài lòng với thầy.",
    reviewerName: "Thùy Linh",
    lessons: 8,
    tutorSubject: "Gia sư Hình học",
    tutorSubjectColor: "text-yellow-500",
    avatarSrc: "https://picsum.photos/seed/course-32/300/200",
    bgColorClass: "bg-yellow-50"
  },
  {
    quote:
      "Cô Mikayla là một gia sư tuyệt vời! Cô ấy rất hiểu biết và cực kỳ kiên nhẫn! Tôi đã tìm một gia sư có đủ hai yếu tố này và cô ấy hoàn toàn phù hợp! Tôi đang rất mong chờ cô ấy sẽ tiếp tục hướng dẫn con gái tôi sau khi đã giúp con trai tôi cải thiện rõ rệt kỹ năng viết luận.",
    reviewerName: "Mẫn Nhật",
    lessons: 10,
    tutorSubject: "Gia sư Viết luận",
    tutorSubjectColor: "text-blue-600",
    avatarSrc: "https://picsum.photos/seed/course-43/300/200",
    bgColorClass: "bg-blue-50"
  },
  {
    quote:
      "Gia sư này rất giỏi, sâu sắc và chuẩn bị bài kỹ lưỡng. Hơn nữa lại vô cùng thân thiện. Con trai 10 tuổi của tôi luôn hào hứng với từng buổi học kéo dài một tiếng. Thật sự ấn tượng!",
    reviewerName: "Quốc Định",
    lessons: 5,
    tutorSubject: "Gia sư Toán học",
    tutorSubjectColor: "text-purple-600",
    avatarSrc: "https://picsum.photos/seed/course-30/300/200",
    bgColorClass: "bg-purple-50"
  }
];

export const categories = [
  "Ngoại ngữ",
  "Lập trình & Công nghệ",
  "Giao tiếp & Thuyết trình",
  "Kinh doanh & Khởi nghiệp",
  "Kinh doanh & Khởi nghiệp",
  "Marketing & Bán hàng",
  "Kỹ năng mềm",
  "Phát triển bản thân",
  "Thiết kế & Sáng tạo",
  "Tài chính & Đầu tư",
  "Chăm sóc sức khỏe & Thể chất",
  "Âm nhạc & Nghệ thuật",
  "Khoa học & Kỹ thuật",
  "Khóa học phổ thông (K12)",
  "Luyện thi & Chứng chỉ",
  "Giáo dục mầm non",
  "Tâm lý học & Nuôi dạy con",
  "Nghề nghiệp & Định hướng"
];

export const levels = ["Cơ bản", "Trung cấp", "Nâng cao"];
export const instructors = [
  "Sarah Johnson",
  "Dr. Michael Chen",
  "Emma Thompson",
  "James Wilson",
  "Lisa Anderson",
  "David Brown",
  "Maria Garcia",
  "Prof. Robert Taylor"
];
export const popularSearches = [
  "Toán 12",
  "Hóa hữu cơ",
  "Con trỏ",
  "Học IELTS hiệu quả",
  "Tiếng Anh giao tiếp",
  "Tiếng Anh cơ bản",
  "Lập trình từ con số 0",
  "Digital Marketing cho sinh viên",
  "Thiết kế thuyết trình với Canva",
  "Đầu tư chứng khoán cơ bản cho học sinh - sinh viên",
  "Phát triển kỹ năng học tập hiệu quả",
  "Ôn thi môn Toán",
  "Tư duy phản biện"
];

export const instructorNames = [
  "Dr. Michael Chen",
  "Maria Rodriguez",
  "Nguyen Van An",
  "David Kim",
  "Emily Tran",
  "Prof. John Smith"
];

export const instructorTitles = [
  "Chuyên gia Tiếng Anh Thương Mại & Học Tập Ứng Dụng AI",
  "Tư vấn viên Công nghệ Giáo dục",
  "Giảng viên Kỹ thuật Phần mềm",
  "Chuyên gia Khoa học Dữ liệu & Học máy",
  "Người hướng dẫn đào tạo Doanh nghiệp",
  "Huấn luyện viên Giao tiếp Tiếng Anh"
];

export const bios = [
  "Tiến sĩ Michael Chen là chuyên gia nổi tiếng trong lĩnh vực giáo dục tiếng Anh thương mại với hơn 15 năm kinh nghiệm đào tạo doanh nghiệp và giảng dạy ngôn ngữ. Ông có bằng Tiến sĩ Ngôn ngữ học Ứng dụng và đã hợp tác với các công ty trong danh sách Fortune 500 để phát triển chiến lược giao tiếp quốc tế.",
  "Maria Rodriguez đã giúp hàng ngàn chuyên gia cải thiện kỹ năng giao tiếp và thuyết trình. Cô chuyên về các giải pháp học tập kết hợp sử dụng công cụ AI.",
  "Nguyễn Văn An là một nhà giáo tận tâm trong ngành công nghệ, nổi tiếng với khả năng giúp người học tiếp cận dễ dàng các chủ đề lập trình phức tạp.",
  "David Kim là tác giả của hơn 10 cuốn sách kỹ thuật và đã đào tạo nhiều kỹ sư tại Thung lũng Silicon và khắp châu Á.",
  "Emily Trần là một giáo viên đầy nhiệt huyết với nền tảng trong thiết kế đào tạo và các nền tảng học trực tuyến số.",
  "Giáo sư John Smith kết hợp kiến thức học thuật với kinh nghiệm tư vấn thực tế để mang lại các chương trình đào tạo kinh doanh hiệu quả."
];

export const sampleUsers = [
  "Maria Rodriguez",
  "John Nguyen",
  "Emily Chen",
  "David Lee",
  "Nguyen Thi Mai",
  "Alex Johnson",
  "Pham Quang",
  "Tran Bao Anh"
];

export const sampleComments = [
  "Khóa học tuyệt vời! Tính năng phản hồi bằng AI thực sự giúp tôi cải thiện phát âm.",
  "Bài học rõ ràng và ngắn gọn. Rất đáng để học!",
  "Nội dung và cách trình bày rất tốt. Tôi đã học được rất nhiều!",
  "Tôi rất thích các bài tập và câu đố tương tác.",
  "Giảng viên giải thích mọi thứ rất rõ ràng và bài tập thì rất thực tế.",
  "Cấu trúc khóa học được thiết kế tốt và dễ theo dõi.",
  "Tôi cảm thấy tự tin hơn sau khi học xong khóa này.",
  "Giá trị vượt trội so với chi phí. Sẽ tiếp tục học các khóa khác của giảng viên này!"
];

export const descriptions = [
  "Khóa học này được thiết kế dành cho người mới bắt đầu muốn nắm vững kiến thức nền tảng một cách bài bản. Nội dung bao gồm lý thuyết cô đọng, ví dụ minh họa thực tế và các bài kiểm tra nhanh để đánh giá tiến độ học tập. Bạn sẽ học theo lộ trình rõ ràng, giúp tiếp cận kiến thức hiệu quả và dễ ghi nhớ hơn.",

  "Với sự hỗ trợ của công nghệ AI, khóa học mang đến trải nghiệm học tập cá nhân hóa, giúp bạn xác định điểm mạnh, điểm yếu và đề xuất nội dung phù hợp. Ngoài ra, bạn sẽ thực hành thông qua các bài tập tương tác, tình huống mô phỏng thực tế và phản hồi tự động từ hệ thống nhằm cải thiện kỹ năng nhanh chóng.",

  "Bạn sẽ được tiếp cận với những kiến thức cốt lõi thông qua các chủ đề được sắp xếp logic, từ dễ đến khó. Mỗi chương học đều có phần tổng kết, bài tập ứng dụng và phần hỏi đáp để đảm bảo bạn thực sự hiểu và vận dụng được kiến thức trong công việc hoặc học tập.",

  "Khóa học này cung cấp một cái nhìn toàn diện về chủ đề, từ lý thuyết nền tảng đến các ứng dụng thực tế. Được thiết kế bởi các chuyên gia đầu ngành, nội dung học luôn được cập nhật mới, phù hợp với nhu cầu thị trường và xu hướng hiện tại. Bạn sẽ không chỉ học, mà còn rèn luyện được kỹ năng giải quyết vấn đề.",

  "Trong khóa học, bạn sẽ tham gia vào chuỗi hoạt động như video hướng dẫn, bài tập thực hành, quiz tự động và dự án cuối khóa. Tất cả đều được xây dựng để tăng cường khả năng ghi nhớ và tạo cảm hứng học tập. Nội dung thân thiện với người học ở mọi trình độ, đặc biệt là người bận rộn.",

  "Thông qua việc kết hợp giữa bài giảng ngắn gọn, tài liệu minh họa và công cụ hỗ trợ trực quan, khóa học giúp bạn dễ dàng nắm bắt kiến thức phức tạp một cách đơn giản. Ngoài ra, bạn còn được hỗ trợ trong suốt quá trình học thông qua cộng đồng học viên và phần hỏi đáp trực tiếp với giảng viên.",

  "Khóa học này đặc biệt phù hợp cho những ai đang chuẩn bị bước vào môi trường học thuật hoặc công việc đòi hỏi tư duy phân tích. Bạn sẽ học cách nghiên cứu, lập luận và trình bày ý tưởng một cách rõ ràng và thuyết phục. Kỹ năng bạn học được sẽ là nền tảng vững chắc cho nhiều lĩnh vực khác nhau.",

  "Nếu bạn đang tìm kiếm một khóa học ngắn hạn nhưng hiệu quả, đây là lựa chọn lý tưởng. Nội dung học tập được tinh gọn, tập trung vào thực hành nhiều hơn lý thuyết. Bạn sẽ hoàn thành khóa học trong thời gian ngắn và đạt được kết quả rõ rệt, đặc biệt hữu ích cho người đi làm cần nâng cao nhanh một kỹ năng.",

  "Khóa học kết hợp giữa học truyền thống và hiện đại, sử dụng trí tuệ nhân tạo để điều chỉnh nội dung dựa trên tốc độ học của từng người. Bạn có thể học mọi lúc, mọi nơi, từ laptop đến điện thoại di động. Mỗi bài học đều kèm theo ví dụ thực tế, giúp bạn liên kết kiến thức với cuộc sống hàng ngày.",

  "Với mục tiêu không chỉ truyền đạt kiến thức mà còn truyền cảm hứng học tập, khóa học này sẽ giúp bạn chủ động hơn trong quá trình học. Bạn sẽ tự đặt mục tiêu, theo dõi tiến trình cá nhân và nhận phản hồi ngay lập tức. Sự tương tác cao giữa người học và nội dung sẽ khiến việc học trở nên thú vị và hiệu quả hơn."
];

export const learnOutcomes = [
  "Hiểu các khái niệm cơ bản và nâng cao",
  "Áp dụng kiến thức vào thực tế",
  "Phát triển kỹ năng giải quyết vấn đề",
  "Sử dụng công cụ và thư viện phổ biến",
  "Xây dựng dự án thực tế từ đầu",
  "Nâng cao tư duy lập trình",
  "Hiểu cách tối ưu hóa hiệu suất",
  "Tự tin ứng tuyển vào các vị trí liên quan",
  "Làm quen với quy trình làm việc chuyên nghiệp",
  "Thành thạo các kỹ thuật và mẹo chuyên sâu"
];
export const sampleCurriculumTitles = [
  "Giới thiệu khóa học",
  "Lý thuyết nền tảng",
  "Thực hành cơ bản",
  "Bài tập nhóm",
  "Tình huống thực tế",
  "Kiểm tra đánh giá",
  "Phản hồi và cải thiện",
  "Tổng kết và định hướng"
];

export const sampleSummaries = [
  "Hiểu khái niệm cơ bản và ứng dụng thực tiễn.",
  "Khám phá phương pháp giải nhanh và hiệu quả.",
  "Thảo luận tình huống thực tế trong lớp học.",
  "Tổng kết kiến thức trọng tâm chương này.",
  "Đánh giá kỹ năng qua bài kiểm tra ngắn."
];

export const sampleTypes = ["video", "quiz", "assignment", "reading"] as const;

export const titles = [
  "Thành thạo ngữ pháp tiếng Anh với giải thích bằng AI",
  "Mở rộng vốn từ vựng cùng công cụ thông minh và luyện tập mỗi ngày",
  "Thực hành nói tiếng Anh cho người đi làm trong tình huống thực tế",
  "Trợ lý viết bằng AI cho bài luận học thuật và kinh doanh",
  "Tăng cường kỹ năng nghe tiếng Anh với phản hồi AI tương tác",
  "Tiếng Anh thương mại đơn giản hóa cho giao tiếp nơi làm việc",
  "Chiến lược đọc IELTS cùng mô phỏng bài thi thực tế",
  "Luyện từ vựng TOEIC với Flashcard và Quiz thông minh",
  "Đối thoại với AI để phát triển khả năng nói tiếng Anh lưu loát",
  "Luyện phát âm tiếng Anh với phân tích giọng nói bằng AI",
  "Lập trình Python cho người mới bắt đầu với ví dụ thực tế",
  "Thiết kế Canva chuyên nghiệp cho học sinh và sinh viên",
  "Quản lý tài chính cá nhân dành cho sinh viên đại học",
  "Kỹ năng mềm: Làm việc nhóm và giải quyết xung đột",
  "Tư duy phản biện trong học tập và cuộc sống"
];

export const sampleTags = [
  "reading",
  "comprehension",
  "ai",
  "listening",
  "writing",
  "speaking",
  "ielts",
  "toeic",
  "grammar",
  "vocabulary",
  "programming",
  "finance",
  "presentation",
  "critical-thinking",
  "design",
  "teamwork"
];

export const reasons = [
  "Phù hợp với nhu cầu học tiếng Anh giao tiếp",
  "Có nội dung liên quan đến AI bạn vừa hỏi",
  "Phù hợp với trình độ hiện tại của bạn",
  "Khóa học phổ biến với người có nhu cầu như bạn",
  "Gợi ý dựa trên các khóa học tương tự đã xem"
];

export const categoriesNavigationHeader = [
  { name: "JavaScript", icon: BiCode, color: "text-yellow-600" },
  { name: "React", icon: BiCode, color: "text-blue-600" },
  { name: "Python", icon: BiCode, color: "text-green-600" },
  { name: "UI/UX Design", icon: BiPalette, color: "text-purple-600" },
  { name: "Digital Marketing", icon: BiBarChart, color: "text-red-600" },
  { name: "Data Science", icon: BiBarChart, color: "text-indigo-600" },
  { name: "Photoshop", icon: BiPalette, color: "text-blue-500" },
  { name: "Excel", icon: BiBarChart, color: "text-green-500" }
];

export const trendingTopics = [
  { name: "AI & ChatGPT", hot: true },
  { name: "Blockchain", hot: false },
  { name: "Cloud Computing", hot: false },
  { name: "Mobile Development", hot: true }
];

export const navigations = [
  { name: "Trang chủ", path: "/", icon: BiHome },
  { name: "Danh mục", path: "/categories", icon: BiCategory },
  { name: "Khóa học", path: "/courses", icon: BiLogoDiscourse },
  { name: "Giảng viên", path: "/teachers", icon: BiUser },
  { name: "Giải đáp", path: "/qa", icon: BiQuestionMark }
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Nói và trò chuyện",
    icon: "💬",
    courseCount: 45,
    trending: true
  },
  {
    id: "2",
    name: "Business English",
    icon: "💼",
    courseCount: 32
  },
  {
    id: "3",
    name: "IELTS Preparation",
    icon: "📝",
    courseCount: 28,
    trending: true
  },
  {
    id: "4",
    name: "Grammar Fundamentals",
    icon: "📚",
    courseCount: 38
  }
];

export const trendingSearches = [
  { term: "Gia sư tiếng Anh AI", trend: "+25%" },
  { term: "IELTS speaking", trend: "+18%" },
  { term: "Viết văn bản kinh doanh", trend: "+12%" },
  { term: "Phát âm", trend: "+8%" }
];
