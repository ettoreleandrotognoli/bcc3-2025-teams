import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, Settings, Home } from "lucide-react"

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className = "" }: DashboardSidebarProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      <nav className="flex flex-col space-y-1">
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            Encontrar Mentores
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student">
            <Calendar className="mr-2 h-4 w-4" />
            Minhas Sessões
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student/subjects">
            <BookOpen className="mr-2 h-4 w-4" />
            Disciplinas
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </Button>
      </nav>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Informações</h3>
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Monitoria Gratuita</h4>
          <p className="text-sm text-muted-foreground">
            Conecte-se com mentores qualificados e agende sessões de monitoria sem custos.
          </p>
        </div>
      </div>
    </aside>
  )
}
