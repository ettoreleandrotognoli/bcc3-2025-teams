import { MentorHeader } from "@/components/mentor/mentor-header"
import { MentorSidebar } from "@/components/mentor/mentor-sidebar"
import { PropostasMentor } from "@/components/mentor/propostas-mentor"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

export default function ProposalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MentorHeader />

      <div className="flex-1 container grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
        <MentorSidebar className="hidden md:block" />

        <main className="md:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Propostas de Monitoria</h1>
              <p className="text-muted-foreground">Gerencie as solicitações de monitoria recebidas dos alunos.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar propostas..." className="pl-9 w-full" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Todas as disciplinas
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                Esta semana
              </Button>
            </div>
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">Pendentes (5)</TabsTrigger>
              <TabsTrigger value="accepted">Aceitas (8)</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-4">
              <PropostasMentor />
            </TabsContent>
            <TabsContent value="accepted" className="space-y-4">
              <div className="flex justify-center items-center p-8 text-center">
                <div className="max-w-md">
                  <h3 className="text-lg font-medium">Propostas aceitas</h3>
                  <p className="text-muted-foreground mt-2">
                    Aqui você verá as propostas que aceitou. Elas serão automaticamente adicionadas à sua agenda.
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
