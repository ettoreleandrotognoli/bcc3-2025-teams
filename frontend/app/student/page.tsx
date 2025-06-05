import { StudentHeader } from "@/components/student/student-header"
import { StudentDashboard } from "@/components/student/student-dashboard"

export default function StudentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StudentHeader />
      <StudentDashboard />
    </div>
  )
}
