/** @format */

import Button from "../atoms/Button";

import { type SocmedDataProps } from "@/utils/types/socmed";
import { useSocmed } from "@/services/socmed/hook";
import { buildWhatsAppLink, WHATSAPP_TEMPLATES } from "@/utils/helper";
import { PhoneIcon } from "lucide-react";

export default function CTA({
  title = "Ready to Train Your Team?",
  description = "Get the full proposal and training details by clicking the button below.",
  cta = "Request Proposal",
  link,
  bgGradient = "bg-gradient-to-b from-[#FCFCFC] to-[#E0E0E0]",
}: Readonly<{
  title?: string;
  description?: string;
  cta?: string;
  link?: string;
  bgGradient?: string;
}>) {
  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();

  const contactList = socmedData.find(
    (item: SocmedDataProps) =>
      item.socmed_link && ["WHATSAPP"].includes(item.socmed_name),
  )?.socmed_link;

  const waLink = buildWhatsAppLink(contactList, WHATSAPP_TEMPLATES.general);

  const handleCTA = () => {
    // Link dari CMS diprioritaskan; fallback ke WhatsApp.
    const target = link?.trim() || waLink;
    if (/^(https?:|mailto:|tel:)/i.test(target)) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else if (target.startsWith("/")) {
      window.open(target, "_self", "noopener,noreferrer");
    }
  };

  return (
    <div className={`w-full ${bgGradient} px-[5%] md:px-[7%] lg:px-[10%] text-center pb-[5%] flex flex-col items-center`}>
      <h2 className="text-2xl md:text-[32px] font-semibold">{title}</h2>
      <p className="text-[14px] md:text-[16px] text-gray-600 mb-4">
        {description}
      </p>
      {socmedLoading ? (
        <Button label="Loading..." rounded type="disable" />
      ) : (
        <Button
          size="sm"
          onClick={handleCTA}
          label={
            <div className="flex gap-2">
              <PhoneIcon size={14} />
              <span>{cta}</span>
            </div>
          }
          rounded
          type="primary"
        />
      )}
    </div>
  );
}
