import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./router/AppRoutes"
import { Footer, Header } from "./components"
import { AuthProvider } from "./context/AuthProvider"

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}
