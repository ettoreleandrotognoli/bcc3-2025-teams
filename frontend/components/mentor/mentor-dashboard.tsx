"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MentorSidebar } from "@/components/mentor/mentor-sidebar"
import { PropostasMentor } from "@/components/mentor/propostas-mentor"
import { SessoesMentor } from "@/components/mentor/sessoes-mentor"
import { CalendarIcon, ClockIcon } from "lucide-react"

export function MentorDashboard() {
  return (
    <div className="flex-1 container grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
      <MentorSidebar className="hidden md:block" />

      <main className="md:col-span-3 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard do Mentor</h1>
            <p className="text-muted-foreground">
              Bem-vindo(a) de volta, Ana. Você tem 5 novas propostas de monitoria.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <ClockIcon className="h-4 w-4" />
              Definir disponibilidade
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <CalendarIcon className="h-4 w-4" />
              Ver agenda
            </Button>
          </div>
        </div>

        {/* Estatísticas básicas */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propostas Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Aguardando resposta</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Agendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="proposals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="proposals">Propostas Recentes</TabsTrigger>
            <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
          </TabsList>
          <TabsContent value="proposals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Propostas de Monitoria</h2>
            </div>
            <PropostasMentor limit={5} />
          </TabsContent>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Próximas Sessões</h2>
            </div>
            <SessoesMentor limit={5} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
