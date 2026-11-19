import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import OrderSidebar from "./order-sidebar/OrderSidebar";

export default function Layout() {
  return (
    <>
      <Header />
      <OrderSidebar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col text-text">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
