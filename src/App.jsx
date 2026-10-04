import { Route, Routes } from "react-router"
import './App.css'
import Header from './components/header/Header'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/catalog" element={<h1>Catalog Page</h1>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/create" element={<h1>Create Page</h1>} />
        <Route path="/logout" element={<h1>Logout Page</h1>} />
      </Routes>
    </>
  )
}

export default App
