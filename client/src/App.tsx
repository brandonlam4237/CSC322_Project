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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/components" element={<Components />} />
      <Route path="/builds" element={<Builds />} />
      <Route path="/other" element={<Other />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
