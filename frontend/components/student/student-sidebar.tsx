import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, Settings, UserCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface StudentSidebarProps {
  className?: string
}

export function StudentSidebar({ className = "" }: StudentSidebarProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      <div className="flex flex-col items-center space-y-2 py-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80&text=JS" alt="João Silva" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="font-bold">João Silva</h2>
          <p className="text-sm text-muted-foreground">Engenharia Civil • USP</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">3º Semestre</Badge>
        </div>
      </div>

      <nav className="flex flex-col space-y-1">
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/dashboard">
            <Users className="mr-2 h-4 w-4" />
            Encontrar Mentores
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student/sessions">
            <Calendar className="mr-2 h-4 w-4" />
            Minhas Sessões
            <Badge className="ml-auto bg-primary text-xs">2</Badge>
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student/profile">
            <UserCircle className="mr-2 h-4 w-4" />
            Perfil
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/student/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </Button>
      </nav>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Resumo</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sessões realizadas:</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Próximas sessões:</span>
            <span className="font-medium">2</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
