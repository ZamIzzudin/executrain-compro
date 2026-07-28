import { Outlet } from "react-router-dom";
import { AssetProvider } from "./AssetProvider";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <AssetProvider>
        <Navbar />
        <main className="flex-1 mt-[-7%] overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </AssetProvider>
    </div>
  );
}
