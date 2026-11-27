/** @format */

import { lazy, Suspense } from "react";

import "@/styles/disco-taco-report.css";

const DiscQuestionnaire = lazy(
  () => import("@/components/organisms/disco-taco/DiscQuestionnaire"),
);

export default function DiscTacoPage() {
  return (
    <div className="bg-[#15202D] mt-18">
      <Suspense fallback={null}>
        <DiscQuestionnaire />
      </Suspense>
    </div>
  );
}
