"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Menu, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function MentorHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center gap-2 mb-6">
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
              <nav className="flex flex-col gap-4">
                <Link href="/mentor" className="flex items-center gap-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/mentor/proposals" className="flex items-center gap-2 text-sm font-medium">
                  Propostas
                </Link>
                <Link href="/mentor/sessions" className="flex items-center gap-2 text-sm font-medium">
                  Sessões
                </Link>
                <Link href="/mentor/students" className="flex items-center gap-2 text-sm font-medium">
                  Alunos
                </Link>
                <Link href="/mentor/earnings" className="flex items-center gap-2 text-sm font-medium">
                  Ganhos
                </Link>
                <Link href="/mentor/profile" className="flex items-center gap-2 text-sm font-medium">
                  Perfil
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/mentor" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Mentorize Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hidden md:inline-block">
              Mentorize
            </span>
            <Badge variant="outline" className="ml-2 bg-secondary/10 text-secondary">
              Mentor
            </Badge>
          </Link>
        </div>

        <div className={`${isSearchOpen ? "flex" : "hidden"} md:flex items-center gap-2 flex-1 max-w-md mx-4`}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar alunos, disciplinas..." className="pl-9 w-full" />
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            <span className="sr-only">Notificações</span>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=AP" alt="@user" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ana Paula</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Disponibilidade</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
