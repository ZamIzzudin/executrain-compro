import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AssetProvider } from "./AssetProvider";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

import { PhoneIcon } from "lucide-react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC] text-slate-900">
      <ScrollToTop />
      <AssetProvider>
        <Navbar />
        <main className="flex-1 mt-[-7%] overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
        <FloatingContact />
      </AssetProvider>
    </div>
  );
}

function FloatingContact() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/contact")}
      type="button"
      className="bg-primary-500 fixed bottom-5 right-5 z-40 text-white flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer shadow-lg hover:bg-primary-600 transition-colors"
    >
      <PhoneIcon size={14} />
      Contact Us
    </button>
  );
}
