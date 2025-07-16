export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorDetail: InstructorDetail;
  rating: number;
  reviews: number;
  students: number;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string; //
  category: string;
  image: string;
  tags: string[];
  aiEnhanced: boolean;
  certificate: boolean;
  description: string;
  isFavorite: boolean;
  userBehavior: {
    viewed: boolean;
    liked: boolean;
    addedToCart: boolean;
    similarCoursesViewed: number;
  }; //
  bestseller?: boolean;
  new?: boolean;
  lastUpdated?: string;
  whatYouWillLearn: string[];
  curriculum: CurriculumItem[];
  courseReviews: CourseReview[];
}

export interface CourseViewHistory extends Course {
  viewedAt: string;
  viewCount: number;
  lastViewedAt: string;
}

export interface SuggestedCourse extends Course {
  reasonForSuggestion: string;
  matchScore: number;
}

export interface CourseResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  courses: Course[];
}

export interface CourseCardProps<T extends Course = Course> {
  course: T;
  variant?: "default" | "suggestion" | "viewed";
  onViewDetails?: (course: T) => void;
  onToggleFavorite?: (courseId: string, userId: string) => void;
  onAddToCart?: (courseId: string) => void;
  onRemoveFromHistory?: (courseId: string) => void;
}

export interface CurriculumItem {
  id: string;
  title: string;
  duration: string;
  type: "video" | "quiz" | "assignment" | "reading";
  preview?: boolean;
  summary: string;
}

export interface CourseReview {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
}
export interface InstructorDetail {
  id: string;
  name: string;
  specialization: string;
  avatar?: string;
  rating: number;
  students: number;
  courses: number;
  bio: string;
}
