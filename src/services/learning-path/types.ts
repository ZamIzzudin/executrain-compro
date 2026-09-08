/** @format */

export interface LearningPathCourse {
  id: string;
  title: string;
  code?: string;
  description?: string;
  banner?: { public_id: string; url: string } | null;
  framework_type?: string;
  category?: string;
  /** Terisi bila course ini lanjutan dari course lain di path yg sama. */
  continuation_course_id?: string;
  continuation_title?: string;
  /** Keluarga (rantai continuation) utk highlight saat hover. */
  family_id?: string;
}

export interface LearningPathStage {
  id: string;
  name: string;
  description: string;
  course_ids: string[];
  courses: LearningPathCourse[];
}

export interface LearningPathItem {
  id: string;
  title: string;
  description: string;
  banner?: { public_id: string; url: string } | null;
  framework: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  stages: LearningPathStage[];
}

export interface LearningPathListParams {
  framework?: string;
  category?: string;
  search?: string;
}

export interface LearningPathListResponse {
  status: number;
  message: string;
  data: LearningPathItem[];
}