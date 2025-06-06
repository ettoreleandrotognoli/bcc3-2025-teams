"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react"

interface Proposal {
  id: number | string
  createdAt: string
  updatedAt: string
  description: string
  duration: number
  isConfirmed: boolean
  student: {
    id: number
    email: string
    avatar?: string
  }
  mentor: {
    id: number
    email: string
  }
}

interface PropostasMentorProps {
  limit?: number
}

function getInitials(email?: string) {
  if (!email) return "??"
  return email.split("@")[0].substring(0, 2).toUpperCase()
}

function formatDate(dateString?: string) {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function formatDuration(minutes?: number) {
  if (!minutes) return "Duração não informada"
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h${mins > 0 ? `${mins}min` : ""}`
  }
  return `${mins}min`
}

export function PropostasMentor({ limit }: PropostasMentorProps) {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProposals() {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("Usuário não autenticado")

        const response = await axios.get("http://localhost:3001/mentorships", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!Array.isArray(response.data)) {
          throw new Error("Formato inesperado dos dados: esperado um array")
        }

        setProposals(response.data)
      } catch (err: any) {
        setError(err.message || "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  async function confirmarProposta(id: number | string) {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token não encontrado")

      await axios.patch(
        `http://localhost:3001/mentorships/${id}/confirm`,
        {}, // Não precisa enviar isConfirmed no body se a API só espera o patch para confirmar
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === id ? { ...proposal, isConfirmed: true } : proposal
        )
      )
      alert("Proposta confirmada com sucesso!")
    } catch (error: any) {
      alert(`Erro ao confirmar proposta: ${error.message || "Erro desconhecido"}`)
    }
  }

  const displayProposals = limit ? proposals.slice(0, limit) : proposals
  const selected = proposals.find((p) => p.id.toString() === selectedProposal)

  if (loading) {
    return <p>Carregando propostas...</p>
  }

  if (error) {
    return <p className="text-destructive">Erro: {error}</p>
  }

  return (
    <div className="space-y-4">
      {displayProposals.map((proposal) => {
        if (!proposal.student) {
          // Ignorar propostas inválidas
          return null
        }

        return (
          <Card key={proposal.id} className="overflow-hidden">
            <div className="h-1 bg-primary" />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={proposal.student.avatar || "/placeholder.svg"} alt={proposal.student.email} />
                    <AvatarFallback>{getInitials(proposal.student.email)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{proposal.student.email || "Email indisponível"}</h3>
                    <p className="text-sm text-muted-foreground">Estudante</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Mentoria
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(proposal.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:text-right">
                  <div className="flex items-center md:justify-end text-sm gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(proposal.updatedAt)}</span>
                  </div>
                  <div className="flex items-center md:justify-end text-sm gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDuration(proposal.duration)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm line-clamp-2">{proposal.description || "Sem descrição disponível"}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-6 pt-0">
              <Button variant="outline" className="w-1/2" onClick={() => setSelectedProposal(proposal.id.toString())}>
                Ver detalhes
              </Button>
              <div className="flex gap-2 w-1/2">
                <Button variant="outline" className="w-1/2" size="icon" onClick={() => alert("Rejeitar não implementado")}>
                  <XCircle className="h-4 w-4 text-destructive" />
                </Button>
                <Button
                  className="w-1/2 bg-primary hover:bg-primary/90"
                  size="icon"
                  onClick={() => confirmarProposta(proposal.id)}
                  disabled={proposal.isConfirmed}
                  title={proposal.isConfirmed ? "Confirmado" : "Confirmar proposta"}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        )
      })}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="font-bold text-lg mb-4">Detalhes da Proposta</h3>
            <div className="space-y-3">
              <p>
                <strong>Estudante:</strong> {selected.student.email}
              </p>
              <p>
                <strong>Descrição:</strong> {selected.description || "Sem descrição"}
              </p>
              <p>
                <strong>Duração:</strong> {formatDuration(selected.duration)}
              </p>
              <p>
                <strong>Data:</strong> {formatDate(selected.createdAt)}
              </p>
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedProposal(null)}>
                Fechar
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  confirmarProposta(selected.id)
                  setSelectedProposal(null)
                }}
                disabled={selected.isConfirmed}
              >
                {selected.isConfirmed ? "Confirmado" : "Aceitar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
