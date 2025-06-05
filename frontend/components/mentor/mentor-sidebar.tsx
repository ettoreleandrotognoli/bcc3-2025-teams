import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, FileText, Settings, UserCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface MentorSidebarProps {
  className?: string
}

export function MentorSidebar({ className = "" }: MentorSidebarProps) {
  return (
    <aside className={`space-y-6 ${className}`}>
      <div className="flex flex-col items-center space-y-2 py-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80&text=AP" alt="Ana Paula" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="font-bold">Ana Paula</h2>
          <p className="text-sm text-muted-foreground">Matemática • USP</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">4.9 ★</Badge>
          <Badge variant="outline">124 avaliações</Badge>
        </div>
      </div>

      <nav className="flex flex-col space-y-1">
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/mentor">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/mentor/proposals">
            <FileText className="mr-2 h-4 w-4" />
            Propostas
            <Badge className="ml-auto bg-primary text-xs">5</Badge>
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/mentor/sessions">
            <Calendar className="mr-2 h-4 w-4" />
            Sessões
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/mentor/profile">
            <UserCircle className="mr-2 h-4 w-4" />
            Perfil
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start" asChild>
          <Link href="/mentor/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </Button>
      </nav>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Resumo</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sessões este mês:</span>
            <span className="font-medium">18</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Propostas pendentes:</span>
            <span className="font-medium">5</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
