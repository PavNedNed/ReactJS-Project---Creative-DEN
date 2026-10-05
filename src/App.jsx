import { Route, Routes } from "react-router"
import Edit from "./components/edit/Edit"
import Catalog from "./components/catalog/Catalog"
import Login from "./components/login/Login"
import './App.css'
import Header from './components/header/Header'
import Footer from "./components/footer/Footer"
import Home from './components/home/Home'
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import Create from "./components/create/Create"
import Details from "./components/details/Details"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/details" element={<Details />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
