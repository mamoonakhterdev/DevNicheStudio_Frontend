import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { PageNotFound } from "./pages/PageNotFound";
const App = ()=>{
  const company_name = "Sandhu Tech";
  return (
    <>
      <BrowserRouter>
        <Navbar company_name={company_name}/>
        <Routes>
          <Route path="/" element={<Home company_name={company_name} />}/>
          <Route path="/about" element={<About company_name={company_name} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer company_name={company_name} />
      </BrowserRouter>
    </>
  )
}

export default App;