import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Este middleware simula a verificação de autenticação e redirecionamento
// baseado no tipo de usuário. Em uma aplicação real, você usaria
// um sistema de autenticação como NextAuth.js ou similar.

export function middleware(request: NextRequest) {
  // Simulação de verificação de autenticação
  const isAuthenticated = true // Em uma aplicação real, isso seria verificado com cookies/sessão

  // Simulação de verificação do tipo de usuário
  // Em uma aplicação real, isso seria obtido de um token JWT ou sessão
  const userType = getUserType(request.cookies)

  // Rota atual
  const { pathname } = request.nextUrl

  // Se não estiver autenticado e não estiver na página inicial, redireciona para login
  if (!isAuthenticated && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Se estiver autenticado e tentar acessar a página inicial, redireciona para o dashboard apropriado
  if (isAuthenticated && pathname === "/") {
    if (userType === "mentor") {
      return NextResponse.redirect(new URL("/mentor", request.url))
    } else {
      return NextResponse.redirect(new URL("/student", request.url))
    }
  }

  // Se for mentor tentando acessar área de aluno
  if (userType === "mentor" && pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/mentor", request.url))
  }

  // Se for aluno tentando acessar área de mentor
  if (userType === "student" && pathname.startsWith("/mentor")) {
    return NextResponse.redirect(new URL("/student", request.url))
  }

  return NextResponse.next()
}

// Função auxiliar para simular a obtenção do tipo de usuário
function getUserType(cookies: any) {
  // Em uma aplicação real, você obteria isso de um cookie ou token JWT
  // Para este exemplo, vamos simular um cookie 'userType'
  return "student" // ou 'mentor'
}

// Configuração para aplicar o middleware apenas em rotas específicas
export const config = {
  matcher: ["/", "/mentor/:path*", "/student/:path*"],
}
