import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import type {
  Course,
  CourseReview,
  CurriculumItem,
  InstructorDetail
} from "./types/course";
import {
  bios,
  categories,
  descriptions,
  instructorNames,
  instructorTitles,
  learnOutcomes,
  levels,
  reasons,
  sampleComments,
  sampleCurriculumTitles,
  sampleSummaries,
  sampleTags,
  sampleTypes,
  sampleUsers,
  titles
} from "./utils/mock-data-render";

const mock = new MockAdapter(axios, { delayResponse: 500 });

//----------------------function handler ----------------------//

function getRandomMatchScore(): number {
  return Math.floor(Math.random() * 41) + 60;
}
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FAVORITE_KEY = "favorite-courses";
export function getLikedCourses(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleLikedCourse(courseId: string): boolean {
  const current = getLikedCourses();
  const isLiked = current.includes(courseId);
  const updated = isLiked
    ? current.filter((id) => id !== courseId)
    : [...current, courseId];
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
  return !isLiked;
}

function getRandomDateIn2024(): string {
  const month = Math.floor(Math.random() * 6 + 1)
    .toString()
    .padStart(2, "0");
  const day = Math.floor(Math.random() * 28 + 1)
    .toString()
    .padStart(2, "0");
  return `2024-${month}-${day}`;
}

function generateInstructorDetail(): InstructorDetail {
  const index = Math.floor(Math.random() * instructorNames.length);
  return {
    id: `i${index + 1}`,
    name: instructorNames[index],
    specialization: instructorTitles[index],
    rating: +(Math.random() * 0.5 + 4.5).toFixed(1),
    avatar: `/placeholder.svg?height=50&width=50`,
    students: Math.floor(Math.random() * 40000 + 10000),
    courses: Math.floor(Math.random() * 10 + 5),
    bio: bios[index]
  };
}

function generateCourseReviews(count = 4): CourseReview[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `r${i + 1}`,
    user: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
    avatar: `https://picsum.photos/seed/course-${i + 1 + 100}/300/200`,
    rating: Math.floor(Math.random() * 2 + 4), // 4 or 5 stars
    date: getRandomDateIn2024(),
    comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
    helpful: Math.floor(Math.random() * 50)
  }));
}

function generateMockCurriculum(count = 5): CurriculumItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: sampleCurriculumTitles[i % sampleCurriculumTitles.length],
    duration: `${Math.floor(Math.random() * 30 + 5)} phút`,
    type: sampleTypes[Math.floor(Math.random() * sampleTypes.length)],
    preview: Math.random() > 0.7,
    summary: sampleSummaries[Math.floor(Math.random() * sampleSummaries.length)]
  }));
}

function generateCourses(
  count = 10,
  type: "normal" | "suggestion" = "normal",
  q?: string
): Course[] {
  const likedIds = getLikedCourses();

  const filteredTitles = q
    ? titles.filter((t) => t.toLowerCase().includes(q.toLowerCase()))
    : titles;

  return Array.from({ length: count }, (_, i) => {
    const id = `c${i + 1}`;
    const isFavorite = likedIds.includes(id);
    const instructorDetail = generateInstructorDetail();

    let rawTitle = filteredTitles[i % filteredTitles.length];
    if (q && !rawTitle.toLowerCase().includes(q.toLowerCase())) {
      rawTitle = `${
        q.charAt(0).toUpperCase() + q.slice(1)
      } cho người mới bắt đầu`;
    }
    const base = {
      id,
      title: rawTitle,
      instructor: instructorDetail.name,
      instructorDetail,
      rating: +(Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: getRandomInt(100, 3000),
      students: getRandomInt(500, 20000),
      price: Math.floor(Math.random() * 41 + 10) * 10_000,
      originalPrice: Math.floor(Math.random() * 41 + 60) * 10_000,
      duration: `${getRandomInt(3, 12)}h`,
      level: levels[getRandomInt(0, levels.length - 1)],
      category: categories[getRandomInt(0, categories.length - 1)],
      image: `https://picsum.photos/seed/course-${i + 1}/300/200`,
      tags: sampleTags
        .sort(() => 0.5 - Math.random())
        .slice(0, getRandomInt(1, 3)),
      aiEnhanced: Math.random() > 0.3,
      certificate: Math.random() > 0.5,
      description: descriptions[i % descriptions.length],
      whatYouWillLearn: learnOutcomes
        .sort(() => 0.5 - Math.random())
        .slice(0, getRandomInt(3, 6)),
      curriculum: generateMockCurriculum(getRandomInt(5, 10)),
      courseReviews: generateCourseReviews(getRandomInt(3, 6)),
      isFavorite,
      bestseller: Math.random() > 0.7,
      new: Math.random() > 0.7,
      lastUpdated: `2023-${getRandomInt(1, 12)
        .toString()
        .padStart(2, "0")}-${getRandomInt(1, 28).toString().padStart(2, "0")}`,
      userBehavior: {
        viewed: true,
        liked: Math.random() > 0.5,
        addedToCart: Math.random() > 0.5,
        similarCoursesViewed: getRandomInt(1, 10)
      }
    };

    if (type === "suggestion") {
      return {
        ...base,
        reasonForSuggestion:
          reasons[Math.floor(Math.random() * reasons.length)],
        matchScore: getRandomMatchScore()
      };
    }
    if (q) {
      base.title = titles[i % titles.length].includes(q) ? base.title : "";
    }

    return base;
  });
}
function parseQueryParams(url: string) {
  const query = url.split("?")[1];
  if (!query) return {};
  return Object.fromEntries(new URLSearchParams(query));
}
//----------------------generator mock data  ----------------------//

const allCourses = generateCourses(50);

//----------------------enpoint mock api  ----------------------//
mock.onGet(/\/api\/courses.*/).reply((config) => {
  const params = parseQueryParams(config.url || "");
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "10");
  const t = params.t;
  const q = params.q;
  const minPrice = parseInt(params.minPrice || "0");
  const maxPrice = parseInt(params.maxPrice || "0");
  const level = params.level;

  const start = (page - 1) * limit;
  const end = start + limit;
  const categories = (params.categories?.split(",") || []).filter(Boolean);
  const rating = params.rating;

  let rspCourse = allCourses;

  if (t === "favorite") {
    rspCourse = rspCourse.filter((course) => course.isFavorite);
  }

  if (q) {
    rspCourse = rspCourse.filter((course) =>
      course.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (params.minPrice || params.maxPrice) {
    rspCourse = rspCourse.filter((course) => {
      const price = course.price;
      if (params.minPrice && !params.maxPrice) {
        return price >= minPrice;
      } else if (!params.minPrice && params.maxPrice) {
        return price <= maxPrice;
      } else {
        return price >= minPrice && price <= maxPrice;
      }
    });
  }
  if (level) {
    rspCourse = rspCourse.filter((course) => course.level.includes(level));
  }
  if (categories.length > 0) {
    rspCourse = rspCourse.filter((course) =>
      categories.includes(course.category)
    );
  }

  if (rating) {
    rspCourse = rspCourse.filter((course) => course.rating >= +rating);
  }
  const paginatedCourses = rspCourse.slice(start, end);

  return [
    200,
    {
      page,
      limit,
      total: rspCourse.length,
      totalPages: Math.ceil(rspCourse.length / limit),
      courses: paginatedCourses
    }
  ];
});

mock.onGet(/\/api\/suggestions.*/).reply((config) => {
  const params = parseQueryParams(config.url || "");
  const userId = parseInt(params.userId || "1");

  return [
    200,
    {
      userId,
      suggestions: generateCourses(5, "suggestion")
    }
  ];
});

mock.onPost("/api/like-course").reply((config) => {
  try {
    const { courseId, userId } = JSON.parse(config.data);

    const courseIndex = allCourses.findIndex(
      (course) => course.id === courseId
    );
    if (courseIndex === -1) {
      return [404, { message: "Course not found" }];
    }

    allCourses[courseIndex].isFavorite = !allCourses[courseIndex].isFavorite;

    return [
      200,
      {
        courseId,
        userId,
        isFavorite: allCourses[courseIndex].isFavorite
      }
    ];
  } catch (error) {
    return [400, { message: "Invalid request" }];
  }
});

mock.onPost("/api/ai-chat").reply((config) => {
  const { message } = JSON.parse(config.data);
  const keyword = message.toLowerCase();

  let reply = "Xin lỗi, tôi chưa hiểu câu hỏi của bạn.";
  let suggestions: Course[] = [];
  let quickReplies: string[] = [];

  if (keyword.includes("tiếng anh") || keyword.includes("english")) {
    reply = "Bạn muốn học tiếng Anh đúng không? Đây là một số khóa học gợi ý:";
    suggestions = generateCourses(5, "suggestion", "Tiếng Anh");
    quickReplies = [
      "Ngữ pháp tiếng Anh",
      "Tiếng Anh giao tiếp",
      "Tiếng Anh cho người mới bắt đầu"
    ];
  } else if (keyword.includes("ai") || keyword.includes("trí tuệ nhân tạo")) {
    reply = "Bạn quan tâm đến AI? Thử các khóa học sau:";
    suggestions = generateCourses(5, "suggestion", "AI");
    quickReplies = ["Khóa học AI cơ bản", "AI nâng cao", "Machine Learning"];
  } else if (keyword.includes("giảm giá") || keyword.includes("sale")) {
    reply = "Dưới đây là các khóa học đang giảm giá:";
    suggestions = generateCourses(5, "suggestion", "Giảm giá");
    quickReplies = [
      "Khóa học nổi bật",
      "Học thử miễn phí",
      "Xem tất cả khóa học"
    ];
  } else {
    reply =
      "Tôi không hiểu câu hỏi của bạn. Dưới đây là một số khóa học bán chạy nhất:";
    suggestions = generateCourses(5, "suggestion");
    quickReplies = [
      "Khóa học nổi bật",
      "Học thử miễn phí",
      "Xem tất cả khóa học"
    ];
  }
  return [200, { reply, suggestions, quickReplies }];
});

export default mock;
