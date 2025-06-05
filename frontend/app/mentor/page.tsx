import { MentorHeader } from "@/components/mentor/mentor-header"
import { MentorDashboard } from "@/components/mentor/mentor-dashboard"

export default function MentorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MentorHeader />
      <MentorDashboard />
    </div>
  )
}
