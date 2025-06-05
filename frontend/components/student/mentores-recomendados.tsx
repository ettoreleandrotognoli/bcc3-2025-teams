"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star } from "lucide-react"
import { AgendarSessao } from "@/components/agendar-sessao"

interface MentoresRecomendadosProps {
  limit?: number
}

export function MentoresRecomendados({ limit }: MentoresRecomendadosProps) {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null)

  const mentors = [
    {
      id: "1",
      name: "Ana Paula",
      avatar: "/placeholder.svg?height=80&width=80&text=AP",
      subject: "Cálculo",
      rating: 4.9,
      reviews: 124,
      availability: "Hoje, 18:00 - 20:00",
      tags: ["Matemática", "Cálculo I", "Cálculo II"],
      university: "USP",
    },
    {
      id: "2",
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=80&width=80&text=CM",
      subject: "Física",
      rating: 4.7,
      reviews: 98,
      availability: "Amanhã, 14:00 - 18:00",
      tags: ["Física I", "Física II", "Mecânica"],
      university: "UNICAMP",
    },
    {
      id: "3",
      name: "Juliana Silva",
      avatar: "/placeholder.svg?height=80&width=80&text=JS",
      subject: "Programação",
      rating: 4.8,
      reviews: 156,
      availability: "Hoje, 19:00 - 21:00",
      tags: ["Python", "Java", "Algoritmos"],
      university: "UFRJ",
    },
    {
      id: "4",
      name: "Rafael Costa",
      avatar: "/placeholder.svg?height=80&width=80&text=RC",
      subject: "Química",
      rating: 4.6,
      reviews: 87,
      availability: "Quinta, 16:00 - 20:00",
      tags: ["Química Orgânica", "Bioquímica"],
      university: "UFMG",
    },
  ]

  const displayMentors = limit ? mentors.slice(0, limit) : mentors

  return (
    <div className="space-y-4">
      {displayMentors.map((mentor) => (
        <Card key={mentor.id} className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {mentor.subject} • {mentor.university}
                  </p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({mentor.reviews} avaliações)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:text-right">
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{mentor.availability}</span>
                </div>
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Disponível para agendamento</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 pt-0">
            <Button variant="outline" className="w-1/2">
              Ver perfil
            </Button>
            <Button className="w-1/2 bg-primary hover:bg-primary/90" onClick={() => setSelectedMentor(mentor.id)}>
              Agendar
            </Button>
          </CardFooter>
        </Card>
      ))}

      {selectedMentor && (
        <AgendarSessao mentor={mentors.find((m) => m.id === selectedMentor)!} onClose={() => setSelectedMentor(null)} />
      )}
    </div>
  )
}
