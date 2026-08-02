/** @format */

import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

import { type SocmedDataProps } from "@/utils/types/socmed";
import { useSocmed } from "@/services/socmed/hook";
import { buildWhatsAppLink, WHATSAPP_TEMPLATES } from "@/utils/helper";
import { PhoneIcon } from "lucide-react";

export default function CTA() {
  const navigate = useNavigate();

  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();

  const contactList = socmedData.find(
    (item: SocmedDataProps) =>
      item.socmed_link && ["WHATSAPP"].includes(item.socmed_name),
  )?.socmed_link;

  const handleCTA = () =>
    navigate(buildWhatsAppLink(contactList, WHATSAPP_TEMPLATES.general));

  return (
    <div className="w-full bg-gradient-to-b from-white to-primary-100 px-[5%] md:px-[7%] lg:px-[10%] text-center pb-[5%] flex flex-col items-center">
      <h2 className="text-2xl md:text-[32px] font-semibold">Ready to Train Your Team?</h2>
      <p className="text-[14px] md:text-[16px] text-gray-600 mb-4">
        Get the full proposal and training details by clicking the button below.
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
              <span>Request Proposal</span>
            </div>
          }
          rounded
          type="primary"
        />
      )}
    </div>
  );
}
