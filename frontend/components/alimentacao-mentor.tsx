"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Star } from "lucide-react"

interface Mentor {
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

export default function AlimentacaoMentor() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get<Mentor[]>("http://localhost:3001/users")
      .then((res) => {
        const mentorList = res.data.filter((user) => user.role?.toUpperCase() === "MENTOR")
        setMentors(mentorList)
      })
      .catch((err) => {
        console.error("Erro ao buscar mentores:", err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Carregando mentores...</div>

  return (
    <div className="space-y-4">
      {mentors.map((mentor) => (
        <Card key={mentor.id} className="overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {mentor.subject || "Área não informada"} • {mentor.university || "Universidade não informada"}
                  </p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium">{mentor.rating ?? "—"}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({mentor.reviews ?? 0} avaliações)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:text-right">
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{mentor.availability || "Horário não informado"}</span>
                </div>
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Disponível para agendamento</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(mentor.tags || []).map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6 pt-0">
            <Button variant="outline" className="w-full md:w-auto">
              Ver perfil
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
