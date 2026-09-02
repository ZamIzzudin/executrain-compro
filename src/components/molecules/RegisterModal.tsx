import { useState, type FormEvent } from "react";
import { X, ArrowRight } from "lucide-react";

import { ScheduleRegistrationSubmitService } from "@/services/schedule-registration/handler";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  scheduleType?: string;
}

export default function RegisterModal({
  open,
  onClose,
  productName,
  scheduleType,
}: RegisterModalProps) {
  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    email_address: "",
    phone_number: "",
    schedule_date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      await ScheduleRegistrationSubmitService({
        ...form,
        product_name: productName,
        schedule_type: scheduleType,
      });
      setStatus({
        type: "success",
        message:
          "Your registration has been received. Our team will contact you to confirm the schedule.",
      });
      setForm({
        full_name: "",
        company_name: "",
        email_address: "",
        phone_number: "",
        schedule_date: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to submit your registration. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-12 px-4 py-3 bg-gray-100 rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-300 text-sm font-normal text-neutral-800 placeholder:text-gray-400 focus:outline-rose-700 focus:bg-white transition-all duration-300 focus:ring-0";
  const labelClass = "text-neutral-800 text-sm font-medium";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="self-stretch flex justify-between items-start p-8 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-neutral-800 text-xl md:text-2xl font-semibold">
              Request Schedule
            </h2>
            <p className="text-zinc-500 text-sm font-normal">
              Register for{" "}
              <span className="text-rose-700 font-medium">{productName}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex flex-col gap-5 px-8 pb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="full_name" className={labelClass}>
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company_name" className={labelClass}>
                Company
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                required
                value={form.company_name}
                onChange={handleChange}
                placeholder="Enter your company name"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email_address" className={labelClass}>
                Email Address
              </label>
              <input
                id="email_address"
                name="email_address"
                type="email"
                required
                value={form.email_address}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone_number" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                required
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="schedule_date" className={labelClass}>
                Preferred Schedule Date
              </label>
              <input
                id="schedule_date"
                name="schedule_date"
                type="date"
                required
                value={form.schedule_date}
                onChange={handleChange}
                className={`${inputClass} max-w-full`}
              />
            </div>
          </div>

          {status && (
            <p
              className={`text-sm font-medium ${status.type === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="self-stretch h-10 px-3 py-2.5 bg-rose-700 rounded-[48px] inline-flex justify-center items-center gap-2.5 hover:bg-rose-800 disabled:opacity-60 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-white text-sm font-medium">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
