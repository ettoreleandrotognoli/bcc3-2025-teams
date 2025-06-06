// src/types/mentor.ts
export interface Mentor {
  id: string
  name: string
  avatar?: string
  subject?: string
  rating?: number
  reviews?: number
  availability?: string
  tags?: string[]
  university?: string
  role?: string
}
