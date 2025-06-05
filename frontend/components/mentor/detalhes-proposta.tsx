"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MessageSquare, User, BookOpen, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Student {
  name: string
  avatar: string
  level: string
}

interface Proposal {
  id: string
  student: Student
  subject: string
  topic: string
  date: string
  message: string
  status: string
  created: string
}

interface DetalhesPropostaProps {
  proposal: Proposal
  onClose: () => void
}

export function DetalhesProposta({ proposal, onClose }: DetalhesPropostaProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  const handleAccept = () => {
    setIsSubmitting(true)

    // Simulação de aceitação
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
      // Aqui você poderia mostrar uma notificação de sucesso
    }, 1500)
  }

  const handleReject = () => {
    setIsSubmitting(true)

    // Simulação de rejeição
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
      // Aqui você poderia mostrar uma notificação de rejeição
    }, 1500)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Proposta</DialogTitle>
          <DialogDescription>
            Revise os detalhes da proposta de monitoria antes de aceitar ou recusar.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="student">Aluno</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={proposal.student.avatar || "/placeholder.svg"} alt={proposal.student.name} />
                <AvatarFallback>
                  {proposal.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{proposal.student.name}</h4>
                <p className="text-sm text-muted-foreground">{proposal.student.level}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>Disciplina</span>
                  </div>
                  <p className="font-medium">{proposal.subject}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>Tópico</span>
                  </div>
                  <p className="font-medium">{proposal.topic}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Data e Horário</span>
                </div>
                <p className="font-medium">{proposal.date}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>Mensagem do Aluno</span>
                </div>
                <div className="bg-muted p-3 rounded-md text-sm">{proposal.message}</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sua resposta (opcional)</label>
                <Textarea
                  placeholder="Escreva uma mensagem para o aluno..."
                  className="resize-none"
                  rows={3}
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="student" className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4 py-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={proposal.student.avatar || "/placeholder.svg"} alt={proposal.student.name} />
                <AvatarFallback>
                  {proposal.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h4 className="font-bold text-lg">{proposal.student.name}</h4>
                <p className="text-sm text-muted-foreground">{proposal.student.level}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Novo Aluno</Badge>
                <Badge variant="outline">3 Sessões</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Curso</span>
                  </div>
                  <p className="font-medium">Engenharia Civil</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>Universidade</span>
                  </div>
                  <p className="font-medium">USP</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Disciplinas de Interesse</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline">Cálculo I</Badge>
                  <Badge variant="outline">Cálculo II</Badge>
                  <Badge variant="outline">Álgebra Linear</Badge>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>Sobre</span>
                </div>
                <div className="bg-muted p-3 rounded-md text-sm">
                  Estudante de Engenharia Civil no 3º semestre. Tenho dificuldades com matérias que envolvem cálculo e
                  busco ajuda para melhorar meu desempenho acadêmico.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReject} disabled={isSubmitting}>
            Recusar
          </Button>
          <Button onClick={handleAccept} disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
            {isSubmitting ? "Processando..." : "Aceitar Proposta"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
