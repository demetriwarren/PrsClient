import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Header from "../src/Header"
import IndexPage from "../src/IndexPage"
import NavPanel from "./NavPanel"
import {BrowserRouter, Routes, Route} from "react-router-dom" 
import { VendorPage } from "./vendors/VendorsPage"


function App() {

  return (
    <BrowserRouter>
    <>
      <div>
        <Header />
        <main className="d-flex">
          <NavPanel/>
          <section className="container-fluid pt-4 px-5 ms-0">
            <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="/vendors" element={<VendorPage />}/>
            

            

            </Routes>
          </section>
        </main>
      </div>
    </>
    </BrowserRouter>
  );
}

export default App
