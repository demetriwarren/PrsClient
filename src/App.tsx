import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Header from "../src/Header"
import IndexPage from "../src/IndexPage"
import NavPanel from "./NavPanel"
import {BrowserRouter, Route, Router} from "react-router-dom" 


function App() {

  return (
    <BrowserRouter>
    <>
      <div>
        <Header />
        <main className="d-flex">
          <NavPanel/>
          <section className="container-fluid pt-4 px-5 ms-0">
            <Route>
            <Router path="/" element={<IndexPage/>}/>
            

            

            </Route>
          </section>
        </main>
      </div>
    </>
    </BrowserRouter>
  );
}

export default App
