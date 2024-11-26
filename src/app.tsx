import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./routes/all-routes"

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AllRoutes/>
    </BrowserRouter>
  )
}

export default App
