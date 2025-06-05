"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react"
import { DetalhesProposta } from "@/components/mentor/detalhes-proposta"

interface PropostasMentorProps {
  limit?: number
}

export function PropostasMentor({ limit }: PropostasMentorProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)

  const proposals = [
    {
      id: "1",
      student: {
        name: "João Silva",
        avatar: "/placeholder.svg?height=40&width=40&text=JS",
        level: "Graduação - 3º semestre",
      },
      subject: "Cálculo I",
      topic: "Derivadas e Integrais",
      date: "Hoje, 18:00 - 19:30",
      message:
        "Preciso de ajuda com exercícios de derivadas parciais e integrais múltiplas para a prova da próxima semana.",
      status: "pending",
      created: "Há 2 horas",
    },
    {
      id: "2",
      student: {
        name: "Maria Oliveira",
        avatar: "/placeholder.svg?height=40&width=40&text=MO",
        level: "Graduação - 2º semestre",
      },
      subject: "Álgebra Linear",
      topic: "Transformações Lineares",
      date: "Amanhã, 14:00 - 15:30",
      message:
        "Estou com dificuldades para entender transformações lineares e suas aplicações. Preciso de exemplos práticos.",
      status: "pending",
      created: "Há 5 horas",
    },
    {
      id: "3",
      student: {
        name: "Pedro Santos",
        avatar: "/placeholder.svg?height=40&width=40&text=PS",
        level: "Graduação - 4º semestre",
      },
      subject: "Cálculo II",
      topic: "Equações Diferenciais",
      date: "Quinta, 16:00 - 17:30",
      message: "Preciso revisar equações diferenciais de primeira e segunda ordem para um projeto de engenharia.",
      status: "pending",
      created: "Há 1 dia",
    },
    {
      id: "4",
      student: {
        name: "Carla Mendes",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
        level: "Graduação - 1º semestre",
      },
      subject: "Cálculo I",
      topic: "Limites e Continuidade",
      date: "Sexta, 10:00 - 11:30",
      message: "Sou iniciante e estou tendo dificuldades com os conceitos básicos de limites e continuidade.",
      status: "pending",
      created: "Há 1 dia",
    },
    {
      id: "5",
      student: {
        name: "Lucas Ferreira",
        avatar: "/placeholder.svg?height=40&width=40&text=LF",
        level: "Graduação - 5º semestre",
      },
      subject: "Estatística",
      topic: "Testes de Hipóteses",
      date: "Sábado, 15:00 - 16:30",
      message: "Preciso de ajuda para entender como aplicar testes de hipóteses em um projeto de pesquisa.",
      status: "pending",
      created: "Há 2 dias",
    },
  ]

  const displayProposals = limit ? proposals.slice(0, limit) : proposals

  return (
    <div className="space-y-4">
      {displayProposals.map((proposal) => (
        <Card key={proposal.id} className="overflow-hidden">
          <div className="h-1 bg-primary" />
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src={proposal.student.avatar || "/placeholder.svg"} alt={proposal.student.name} />
                  <AvatarFallback>
                    {proposal.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">{proposal.student.name}</h3>
                  <p className="text-sm text-muted-foreground">{proposal.student.level}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {proposal.subject}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{proposal.created}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:text-right">
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{proposal.date}</span>
                </div>
                <div className="flex items-center md:justify-end text-sm gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>1h30min</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm line-clamp-2">{proposal.message}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 pt-0">
            <Button variant="outline" className="w-1/2" onClick={() => setSelectedProposal(proposal.id)}>
              Ver detalhes
            </Button>
            <div className="flex gap-2 w-1/2">
              <Button variant="outline" className="w-1/2" size="icon">
                <XCircle className="h-4 w-4 text-destructive" />
              </Button>
              <Button className="w-1/2 bg-primary hover:bg-primary/90" size="icon">
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      {selectedProposal && (
        <DetalhesProposta
          proposal={proposals.find((p) => p.id === selectedProposal)!}
          onClose={() => setSelectedProposal(null)}
        />
      )}
    </div>
  )
}
