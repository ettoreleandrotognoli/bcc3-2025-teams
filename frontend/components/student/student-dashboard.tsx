"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { SessoesEstudante } from "@/components/student/sessoes-estudante"
import { MentoresRecomendados } from "@/components/student/mentores-recomendados"
import { Calendar, Search } from "lucide-react"
import Link from "next/link"

export function StudentDashboard() {
  return (
    <div className="flex-1 container grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
      <StudentSidebar className="hidden md:block" />

      <main className="md:col-span-3 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Olá, João!</h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta. Você tem 2 sessões de monitoria agendadas esta semana.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard">
                <Search className="h-4 w-4" />
                Buscar mentores
              </Link>
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90" asChild>
              <Link href="/dashboard">
                <Calendar className="h-4 w-4" />
                Agendar sessão
              </Link>
            </Button>
          </div>
        </div>

        {/* Estatísticas básicas */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Agendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Este semestre</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Próximas Sessões</TabsTrigger>
            <TabsTrigger value="recommended">Mentores Recomendados</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Sessões Agendadas</h2>
            </div>
            <SessoesEstudante limit={5} />
          </TabsContent>
          <TabsContent value="recommended" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mentores Recomendados</h2>
            </div>
            <MentoresRecomendados limit={5} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
