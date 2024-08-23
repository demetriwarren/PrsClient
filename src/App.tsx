import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "../src/IndexPage";
import NavPanel from "./NavPanel";
import { Header } from "../src/Header";
import { SignInPage } from "./account/SignInPage";
import { VendorsPage } from "./vendors/VendorsPage";
import { VendorCreatePage } from "./vendors/VendorCreatePage";
import { VendorEditPage } from "./vendors/VendorEditPage";
import { UsersPage } from "./users/UsersPage";
import { UserCreatePage } from "./users/UserCreatePage";
import { UserEditPage } from "./users/UserEditPage";
import { RequestsPage } from "./requests/RequestsPage";
import { RequestCreatePage } from "./requests/RequestCreatePage";
import { RequestEditPage } from "./requests/RequestEditPage";
import { ProductsPage } from "./products/ProductsPage";
import { ProductCreatePage } from "./products/ProductCreatePage";
import { ProductEditPage } from "./products/ProductEditPage";
import { Toaster } from "react-hot-toast";
import { RequestDetailPage } from "./requests/RequestDetailPage";
import { RequestLineCreatePage } from "./requestLines/RequestLineCreatePage";
import { RequestLineEditPage } from "./requestLines/RequestLineEditPage";

function App() {
  return (
    <BrowserRouter>
      <>
        <div>
          <Header />
          <main className="d-flex">
          <Toaster
            toastOptions={{
              success: {
                iconTheme: {
                  primary: "#0d6efd",
                  secondary: "white",
                },
              },
              style: {
                maxWidth: 500,
              },
            }}
          />
            <NavPanel />
            <section className="container-fluid pt-4 px-5 ms-0">
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="sign-in" element={<SignInPage />}/>

                <Route path="vendors" element={<VendorsPage />} />
                <Route path="vendors/create" element={<VendorCreatePage />}/>
                <Route path="vendors/edit/:id" element={<VendorEditPage />}/>

                <Route path="users" element={<UsersPage/>}/>
                <Route path="users/create" element={<UserCreatePage/>}/>
                <Route path="users/edit/:id" element={<UserEditPage/>}/>

                <Route path="products" element={<ProductsPage/>}/>
                <Route path="products/create" element={<ProductCreatePage/>}/>
                <Route path="products/edit/:id" element={<ProductEditPage/>}/>
                
                <Route path="requests" element={<RequestsPage/>}/>
                <Route path="requests/create" element={<RequestCreatePage/>}/>
                <Route path="requests/edit/:id" element={<RequestEditPage/>}/>
                <Route path="requests/detail/:requestId" element={<RequestDetailPage/>}/>
                <Route path="requests/detail/:requestId/requestline/create" element={<RequestLineCreatePage/>}/>
                <Route path="requests/detail/:requestId/requestline/edit/:requestLineId" element={<RequestLineEditPage/>}/>

              </Routes>
            </section>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
