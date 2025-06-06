// src/types.ts

export interface Proposal {
  id: string
  student: {
    name: string
    avatar: string
    level: string
  }
  subject: string
  topic: string
  date: string
  message: string
  status: "pending" | "accepted"
  created: string
}
