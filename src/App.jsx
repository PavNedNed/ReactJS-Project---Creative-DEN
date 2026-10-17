import { Route, Routes } from "react-router"

import Edit from "./components/edit/Edit"
import Catalog from "./components/catalog/Catalog"
import Login from "./components/login/Login"
import './App.css'
import NotFound from './components/notFound/NotFound'
import Header from './components/header/Header'
import Footer from "./components/footer/Footer"
import Home from './components/home/Home'
import Register from "./components/register/Register"
import Logout from "./components/logout/Logout"
import Create from "./components/create/Create"
import Details from "./components/details/Details"
import About from "./components/about/About"

import { UserProvider } from "./contexts/UserContext"

function App() {

  return (
    <>
      <UserProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/graphics/:graphicId" element={<Details />} />
          <Route path="/graphics/create" element={<Create />} />
          <Route path="/graphics/:graphicId/edit" element={<Edit />} />

          <Route path="/logout" element={<Logout />} />

          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </UserProvider>
    </>
  )
}

export default App
