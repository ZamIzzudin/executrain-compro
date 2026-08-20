import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

import { useSocmed } from "@/services/socmed/hook";
import { useSocmedLogo } from "@/hooks/useSocmedLogo";
import { type SocmedDataProps } from "@/utils/types/socmed";
import { handleImageError } from "@/utils/helper";

export default function ContactUs() {
  const { data: socmedData = [], isLoading: socmedLoading } = useSocmed();
  const socmedList = useSocmedLogo(socmedData);

  const whatsapp = socmedData.find(
    (each: SocmedDataProps) => each.socmed_name === "WHATSAPP",
  )?.socmed_link;
  const email =
    socmedData.find((each: SocmedDataProps) => each.socmed_name === "GMAIL")
      ?.socmed_link || "sales@executrain.co.id";

  const CONTACT_INFO = [
    {
      icon: Phone,
      label: whatsapp ? `+ ${whatsapp}` : "+ 62-8129-2506-850",
      href: whatsapp ? `tel:${whatsapp}` : "tel:+6281292506850",
    },
    {
      icon: Mail,
      label: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      label: "Setiabudi Atrium, 2nd Floor - Suite 203",
      href: undefined,
    },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: sambungkan ke endpoint kirim pesan kamu
      // await sendContactMessage(form);
      setForm({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full min-h-screen px-[5%] md:px-[7%] lg:px-[10%] pt-28 md:pt-32 pb-12 lg:pb-16 bg-gradient-to-b from-[#FCFCFC] from-[85%] to-[#E0E0E0] flex flex-col lg:flex-row justify-center items-center gap-12 bg-[#FCFCFC]">
      {/* Left column */}
      <div className="flex-1 flex flex-col justify-start items-start gap-8">
        {/* Logo */}
        <img
          src="/logogray.png"
          alt="ExecuTrain"
          className="h-12 w-48 object-contain"
        />

        {/* Title */}
        <div className="flex flex-col justify-start items-start gap-2">
          <h1 className="text-neutral-800 text-3xl font-semibold">
            Contact Us
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Ready to elevate your team's performance?
          </p>
        </div>

        {/* GET IN TOUCH card */}
        <div className="self-stretch p-6 bg-stone-50 rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-3">
          <p className="text-neutral-400 text-sm font-medium tracking-wide">
            GET IN TOUCH
          </p>

          <div className="self-stretch flex flex-col justify-center items-start gap-2.5">
            {CONTACT_INFO.map(({ icon: Icon, label, href }, index) => {
              const cardBase =
                "self-stretch py-3 px-5 rounded-full shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] inline-flex justify-start items-center gap-3 transition-all duration-300 cursor-pointer group";
              const defaultStyle =
                "bg-white outline outline-1 outline-offset-[-1px] outline-gray-200 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 hover:outline-rose-700";

              const content = (
                <>
                  <Icon
                    className={`w-5 h-5 shrink-0 text-neutral-400 group-hover:text-rose-700 transition-colors duration-300 ${index === 0 ? "group-hover:text-rose-700" : ""}`}
                  />
                  <div className="flex-1 flex flex-col justify-start items-start gap-2">
                    <span
                      className={`text-base font-semibold transition-colors duration-300 text-neutral-800 group-hover:text-rose-700`}
                    >
                      {label}
                    </span>
                  </div>
                </>
              );

              if (href) {
                return (
                  <a
                    key={label}
                    href={href}
                    className={`${cardBase} ${defaultStyle}`}
                  >
                    {content}
                  </a>
                );
              }
              return (
                <div key={label} className={`${cardBase} ${defaultStyle}`}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* FOLLOW US */}
        <div className="flex flex-col justify-start items-start gap-3">
          <p className="text-neutral-400 text-sm font-medium tracking-wide">
            FOLLOW US
          </p>
          {socmedLoading ? (
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-2xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : socmedList.length > 0 ? (
            <div className="flex gap-4">
              {socmedList.map((each, index) => (
                <a
                  key={index}
                  href={each.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={each.name}
                  className="p-4 bg-rose-700 rounded-2xl flex justify-center items-center hover:bg-rose-800 transition-colors duration-300"
                >
                  <img
                    src={each.icon}
                    alt={each.name || `socmed ${index}`}
                    onError={handleImageError}
                    className="w-6 h-6 object-contain brightness-0 invert"
                  />
                </a>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-400">
              No social media available
            </span>
          )}
        </div>
      </div>

      {/* Right column: form card */}
      <div className="w-full lg:w-[560px] p-6 bg-white rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-rose-700 flex flex-col justify-center items-start gap-8">
        {/* Form header */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <h2 className="text-neutral-800 text-2xl font-semibold">
            Any Question In Mind?
          </h2>
          <p className="text-neutral-400 text-base font-normal">
            Have a question or want to discuss your training needs? Fill out the
            form below and our team will get back to you shortly.
          </p>
        </div>

        {/* Form fields */}
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex flex-col justify-start items-start gap-4"
        >
          {/* Name */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <label
              htmlFor="name"
              className="text-neutral-800 text-sm font-medium"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="self-stretch h-12 px-4 py-3 bg-gray-100 rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-300 text-sm font-normal text-neutral-800 placeholder:text-gray-400 focus:outline-rose-700 focus:bg-white transition-all duration-300 focus:ring-0"
            />
          </div>

          {/* Email */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <label
              htmlFor="email"
              className="text-neutral-800 text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="self-stretch h-12 px-4 py-3 bg-gray-100 rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-300 text-sm font-normal text-neutral-800 placeholder:text-gray-400 focus:outline-rose-700 focus:bg-white transition-all duration-300 focus:ring-0"
            />
          </div>

          {/* Message */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <label
              htmlFor="message"
              className="text-neutral-800 text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your training or any question you may have"
              className="self-stretch h-20 px-4 py-3 bg-stone-50 rounded-2xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 text-sm font-normal text-neutral-800 placeholder:text-gray-400 resize-none focus:outline-rose-700 transition-all duration-300 focus:ring-0"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="self-stretch h-10 px-3 py-2.5 bg-rose-700 rounded-[48px] inline-flex justify-center items-center gap-2.5 hover:bg-rose-800 disabled:opacity-60 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-white text-sm font-medium">
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>
      </div>
    </section>
  );
}
