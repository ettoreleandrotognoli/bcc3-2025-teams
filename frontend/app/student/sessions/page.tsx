import { StudentHeader } from "@/components/student/student-header"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { SessoesEstudante } from "@/components/student/sessoes-estudante"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

export default function StudentSessionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <StudentHeader />

      <div className="flex-1 container grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
        <StudentSidebar className="hidden md:block" />

        <main className="md:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Minhas Sessões</h1>
              <p className="text-muted-foreground">Gerencie suas sessões de monitoria agendadas.</p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90" asChild>
              <Link href="/dashboard">
                <CalendarIcon className="h-4 w-4" />
                Agendar Nova Sessão
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Próximas (2)</TabsTrigger>
              <TabsTrigger value="completed">Concluídas (12)</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              <SessoesEstudante />
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              <div className="flex justify-center items-center p-8 text-center">
                <div className="max-w-md">
                  <h3 className="text-lg font-medium">Sessões concluídas</h3>
                  <p className="text-muted-foreground mt-2">
                    Aqui você verá o histórico de sessões que já foram realizadas.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
