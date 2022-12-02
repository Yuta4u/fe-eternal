import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"

// COMPONENTs
import Profile from "../components/Profile"
import Titit from "../components/Titit"

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/x" element={<Titit />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
