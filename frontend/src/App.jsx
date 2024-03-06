import { Button, Container } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from "./components/Header"
import Signup from "./components/Signup"
import Login from "./components/Login"

const App = () => {
  return (
    <>
      <Container maxWidth={"620px"}>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
