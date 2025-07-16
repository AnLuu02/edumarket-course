import type { Course } from "./course";

export interface TestimonialCardProps {
  quote: string;
  reviewerName: string;
  lessons: number;
  tutorSubject: string;
  tutorSubjectColor: string;
  avatarSrc: string;
  bgColorClass: string;
}

export interface Message {
  sender: "Bot" | "User";
  text: string;
  suggestions?: Course[];
  quickReplies?: string[];
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  courseCount: number;
  trending?: boolean;
}
