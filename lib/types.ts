export type PostType = "poem" | "art" | "video" | "text"

export interface Post {
  id: string
  title: string
  content: string | null
  type: PostType
  media_url: string | null
  thumbnail_url: string | null
  created_at: string
  updated_at: string
  published: boolean
  user_id: string
  title_en: string | null
  content_en: string | null
}
