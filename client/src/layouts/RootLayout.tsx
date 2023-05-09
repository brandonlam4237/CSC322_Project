import Navbar from "src/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
