import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Mentorize Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Mentorize
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Explorar</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">Sobre</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container grid md:grid-cols-2 gap-8 py-8 md:py-12">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Aprenda com os melhores
            <span className="text-primary"> mentores</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Conecte-se com estudantes experientes e melhore seu desempenho acadêmico através de monitorias
            personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Começar agora
            </Button>
            <Button size="lg" variant="outline">
              Saiba mais
            </Button>
          </div>
          <div className="flex items-center pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-muted overflow-hidden border-2 border-background">
                  <Image
                    src={`/placeholder.svg?height=32&width=32&text=${i}`}
                    alt={`Usuário ${i}`}
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">+2.500 estudantes já se conectaram</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <LoginForm />
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2023 Mentorize. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Termos
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
