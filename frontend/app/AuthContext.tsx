// "use client"

// import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

// interface User {
//   id: number
//   email: string
//   name: string
//   role: string
// }

// interface AuthContextType {
//   user: User | null
//   token: string | null
//   login: (token: string, user: User) => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)

//   useEffect(() => {
//     // Carrega dados do localStorage ao iniciar
//     const storedToken = localStorage.getItem("token")
//     const storedUser = localStorage.getItem("user")

//     if (storedToken && storedUser) {
//       setToken(storedToken)
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   function login(newToken: string, newUser: User) {
//     setToken(newToken)
//     setUser(newUser)
//     localStorage.setItem("token", newToken)
//     localStorage.setItem("user", JSON.stringify(newUser))
//   }

//   function logout() {
//     setToken(null)
//     setUser(null)
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//   }

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // Hook para usar contexto em componentes
// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
