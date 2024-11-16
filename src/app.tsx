import { BrowserRouter } from "react-router-dom"
import LayoutGeneral from "./layouts/layout-general/layout-general"

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
    <LayoutGeneral>
    </LayoutGeneral>
    </BrowserRouter>
  )
}

export default App
