
import AlimentacaoMentor from "@/components/alimentacao-mentor"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex-1 container grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
        <DashboardSidebar className="hidden md:block" />

        <main className="md:col-span-3 space-y-6">
          <h1 className="text-3xl font-bold">Monitores Disponíveis</h1>
          <p className="text-muted-foreground">
            Encontre os melhores monitores para suas disciplinas e agende uma sessão de monitoria gratuita.
          </p>

          <AlimentacaoMentor />
        </main>
      </div>
    </div>
  )
}
