import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { AuthProvider } from "./context/AuthProvider"

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>

    </BrowserRouter>
  )
}
