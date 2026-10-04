import { Route, Routes } from "react-router"
import './App.css'
import Header from './components/header/Header'
import Footer from "./components/footer/Footer"
import Home from './components/home/Home'
import Register from "./components/register/Register"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<h1>Catalog Page</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<h1>Create Page</h1>} />
        <Route path="/details" element={<h1>Details Page</h1>} />
        <Route path="/logout" element={<h1>Logout Page</h1>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
