import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Builds from "./pages/Builds";
import Other from "./pages/Other";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Approve from "./pages/Approve";
import MyBuild from "./pages/PartPicker";
import Products from "./pages/Products";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/approve" element={<Approve />} />
      <Route path="/components" element={<Components />} />
      <Route path="/products">
        <Route path=":id" element={<Products />} />
      </Route>
      <Route path="/product">
        <Route path=":id" element={<ProductDetail />} />
      </Route>

      <Route path="/builds" element={<Builds />} />
      <Route path="/other" element={<Other />} />
      <Route path="/mybuild" element={<MyBuild />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
