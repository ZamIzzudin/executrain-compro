import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

import { useSocmed } from "@/services/socmed/hook";
import { useSocmedLogo } from "@/hooks/useSocmedLogo";
import { type SocmedDataProps } from "@/utils/types/socmed";

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
    <section className="w-full px-[5%] md:px-[7%] lg:px-[10%] py-[15%] grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Left column */}
      <div>
        <img
          src="/logogray.png"
          alt="ExecuTrain"
          className="h-10 md:h-12 mb-8"
        />

        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Contact Us</h1>
        <p className="text-sm text-gray-500 mb-6">
          Ready to elevate your team's performance?
        </p>

        <div className="bg-[#ECECEC] rounded-2xl p-5">
          <p className="text-xs tracking-wide text-gray-400 mb-3">
            GET IN TOUCH
          </p>
          <div className="flex flex-col gap-3">
            {CONTACT_INFO.map(({ icon: Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-colors border border-primary-500 bg-white`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-primary-500" />
                  {label}
                </a>
              ) : (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium bg-white border border-primary-500"
                >
                  <Icon className="w-4 h-4 shrink-0 text-primary-500" />
                  {label}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-xs font-semibold tracking-wide text-gray-400 mb-3">
            FOLLOW US
          </p>
          {socmedLoading ? (
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : socmedList.length > 0 ? (
            <div className="flex gap-3">
              {socmedList.map((each, index) => (
                <a
                  key={index}
                  href={each.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={each.name}
                  className="w-9 h-9 rounded-xl bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors p-2"
                >
                  <img src={each.icon} alt={each.name || `socmed ${index}`} />
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

      {/* Right column: form */}
      <div className="border border-primary-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg md:text-xl font-bold mb-1">
          Any Question In Mind?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Have a question or want to discuss your training needs? Fill out the
          form below and our team will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
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
              className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
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
              className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your training or any question you may have"
              className="w-full rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-60 text-white text-sm font-medium rounded-full py-3 flex items-center justify-center gap-2 transition-colors"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
