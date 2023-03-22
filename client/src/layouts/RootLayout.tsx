import Navbar from "src/components/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
