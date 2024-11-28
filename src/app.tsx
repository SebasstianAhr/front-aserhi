import { AuthProvider } from "./context/auth-context"
import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./routes/all-routes"

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
