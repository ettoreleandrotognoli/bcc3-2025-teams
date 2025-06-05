import { MentorHeader } from "@/components/mentor/mentor-header"
import { MentorSidebar } from "@/components/mentor/mentor-sidebar"
import { SessoesMentor } from "@/components/mentor/sessoes-mentor"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"

export default function SessionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MentorHeader />

      <div className="flex-1 container grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
        <MentorSidebar className="hidden md:block" />

        <main className="md:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Sessões de Monitoria</h1>
              <p className="text-muted-foreground">Gerencie suas sessões de monitoria agendadas.</p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <CalendarIcon className="h-4 w-4" />
              Exportar Agenda
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar sessões..." className="pl-9 w-full" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Todas as disciplinas
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Próximas (5)</TabsTrigger>
                  <TabsTrigger value="completed">Concluídas (12)</TabsTrigger>
                  <TabsTrigger value="canceled">Canceladas (2)</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                  <SessoesMentor />
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
                <TabsContent value="canceled" className="space-y-4">
                  <div className="flex justify-center items-center p-8 text-center">
                    <div className="max-w-md">
                      <h3 className="text-lg font-medium">Sessões canceladas</h3>
                      <p className="text-muted-foreground mt-2">
                        Aqui você verá as sessões que foram canceladas por você ou pelos alunos.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="p-4">
                <h3 className="font-medium mb-4">Calendário</h3>
                <Calendar
                  mode="single"
                  className="rounded-md border"
                  selected={new Date()}
                  disabled={{ before: new Date() }}
                />
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Sessões de hoje</h4>
                  <div className="space-y-2">
                    <div className="bg-secondary/10 p-2 rounded-md text-sm">
                      <div className="font-medium">João Silva - Cálculo I</div>
                      <div className="text-xs text-muted-foreground">18:00 - 19:30</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
