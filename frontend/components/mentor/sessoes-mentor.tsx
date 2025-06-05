"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video } from "lucide-react"

interface SessoesMentorProps {
  limit?: number
}

export function SessoesMentor({ limit }: SessoesMentorProps) {
  const sessions = [
    {
      id: "1",
      student: {
        name: "João Silva",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
      },
      subject: "Cálculo I",
      topic: "Derivadas e Integrais",
      date: "Hoje",
      time: "18:00 - 19:30",
      status: "upcoming",
    },
    {
      id: "2",
      student: {
        name: "Maria Oliveira",
        avatar: "/placeholder.svg?height=40&width=40&text=MO",
      },
      subject: "Álgebra Linear",
      topic: "Transformações Lineares",
      date: "Amanhã",
      time: "14:00 - 15:30",
      status: "upcoming",
    },
    {
      id: "3",
      student: {
        name: "Pedro Santos",
        avatar: "/placeholder.svg?height=40&width=40&text=PS",
      },
      subject: "Cálculo II",
      topic: "Equações Diferenciais",
      date: "Quinta-feira",
      time: "16:00 - 17:30",
      status: "upcoming",
    },
    {
      id: "4",
      student: {
        name: "Carla Mendes",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
      },
      subject: "Cálculo I",
      topic: "Limites e Continuidade",
      date: "Sexta-feira",
      time: "10:00 - 11:30",
      status: "upcoming",
    },
    {
      id: "5",
      student: {
        name: "Lucas Ferreira",
        avatar: "/placeholder.svg?height=40&width=40&text=LF",
      },
      subject: "Estatística",
      topic: "Testes de Hipóteses",
      date: "Sábado",
      time: "15:00 - 16:30",
      status: "upcoming",
    },
  ]

  const displaySessions = limit ? sessions.slice(0, limit) : sessions

  return (
    <div className="space-y-4">
      {displaySessions.map((session) => (
        <Card key={session.id} className="overflow-hidden">
          <div className="h-1 bg-secondary" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={session.student.avatar || "/placeholder.svg"} alt={session.student.name} />
                  <AvatarFallback>
                    {session.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{session.student.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-secondary/10 text-secondary">
                      {session.subject}
                    </Badge>
                    <span className="text-xs">{session.topic}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:text-right">
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.time}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6 pt-0">
            <Button className="gap-2 bg-secondary hover:bg-secondary/90">
              <Video className="h-4 w-4" />
              Iniciar Sessão
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
