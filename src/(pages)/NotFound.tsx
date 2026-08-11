import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Button from "@/components/atoms/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FCFCFC]">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Compass className="h-12 w-12 text-brand-600" />
        <h1 className="mt-4 text-3xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-slate-600">
          The page you are looking for does not exist.
        </p>
        <Button label="Back to home" onClick={() => navigate("/")} />
      </div>
    </section>
  );
}
