"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, Lock, User, BookOpen, GraduationCap } from "lucide-react";
import api from "../app/api/axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [tab, setTab] = useState("login");

  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (tab === "login") {
      try {
        const response = await api.post("/auth/login", { email, password });
        const { access_token, user } = response.data;

        console.log("Resposta do login:", response.data);

        const role = (user?.role || "").toUpperCase(); 

        localStorage.setItem("token", access_token);
        localStorage.setItem("name", user?.name || "");
        localStorage.setItem("role", role);

        if (role === "MENTOR") {
          router.push("/mentor");
        } else {
          router.push("/student");
        }
      } catch (err: any) {
        console.error("Erro no login:", err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await api.post("/auth/register", {
          email,
          password,
          name,
          role: userType.toUpperCase(),
        });

        console.log("Resposta do registro:", response.data);

        if (response.status === 201) {
          const { access_token } = response.data;
          const user = response.data.user ||
            response.data.usuario || {
              name: response.data.name,
              role: response.data.role,
            };

          localStorage.setItem("token", access_token);
          localStorage.setItem("name", user?.name || "");
          localStorage.setItem("role", user?.role || "");

          if (user?.role === "MENTOR") {
            router.push("/mentor");
          } else {
            router.push("/student");
          }

          setEmail("");
          setPassword("");
          setName("");
        }
      } catch (err: any) {
        console.error("Erro no cadastro:", err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Tabs
      defaultValue="login"
      className="w-full max-w-md"
      onValueChange={setTab}
    >
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="register">Cadastrar</TabsTrigger>
      </TabsList>

      {/* LOGIN */}
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Acesse sua conta</CardTitle>
            <CardDescription>
              Entre com seu e-mail e senha para acessar a plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      autoCapitalize="none"
                      autoComplete="email"
                      disabled={isLoading}
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      disabled={isLoading}
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Tipo de conta</Label>
                  <RadioGroup
                    defaultValue="student"
                    onValueChange={setUserType}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Aluno</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mentor" id="mentor" />
                      <Label htmlFor="mentor">Mentor</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Microsoft</Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* CADASTRO */}
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Crie sua conta</CardTitle>
            <CardDescription>
              Junte-se à comunidade Mentorize e comece a aprender.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      disabled={isLoading}
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="register-email">E-mail</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      disabled={isLoading}
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="register-password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      disabled={isLoading}
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="user-type">Você é</Label>
                    <div className="relative mt-2">
                      <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="user-type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm"
                        disabled={isLoading}
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                      >
                        <option value="student">Estudante</option>
                        <option value="mentor">Mentor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="education-level">Nível</Label>
                    <div className="relative mt-2">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="education-level"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm"
                        disabled={isLoading}
                      >
                        <option value="high-school">Ensino Médio</option>
                        <option value="undergraduate">Graduação</option>
                        <option value="graduate">Pós-graduação</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
