/** @format */
"use client";

import { useState, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Desktop hover dropdown state (single active menu)
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Mobile sidebar accordion states
  const [isTrainingOpen, setIsTrainingOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isAdvisoryOpen, setIsAdvisoryOpen] = useState(false);
  const [isInsightsOpen, setIsInsightsOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Pages without a hero should always show a solid navbar
  const noHeroMatches = [
    useMatch("/skill-accelerator/:id"),
    useMatch("/course-catalog/:id"),
    useMatch("/it-product/:id"),
    useMatch("/app-development/:id"),
    useMatch("/licensing/:id"),
    useMatch("/article/:id"),
    useMatch("/case-study/:id"),
    useMatch("/contact"),
  ];
  const isNoHeroPage = noHeroMatches.some(Boolean);
  const showSolid = isScrolled || isNoHeroPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsTrainingOpen(false);
    setIsTechOpen(false);
    setIsAdvisoryOpen(false);
    setIsInsightsOpen(false);
  };

  // Desktop dropdown menu data
  const dropdownMenus = [
    {
      key: "training",
      label: "Training & Skills",
      items: [
        { label: "Skill Accelerator ", path: "/skill-accelerator" },
        { label: "Learning Paths", path: "/learning-path" },
        { label: "Course Catalog", path: "/course-catalog" },
      ],
    },
    {
      key: "tech",
      label: "Tech Solutions",
      items: [
        { label: "Ready-to-Use IT Products", path: "/it-product" },
        { label: "Custom App Development", path: "/app-development" },
        { label: "Technology & Cloud Licensing", path: "/licensing" },
      ],
    },
    {
      key: "advisory",
      label: "Advisory Support",
      items: [
        { label: "Tech Advisory", path: "/tech-advisory" },
        { label: "Implementation & Support", path: "/implementation-support" },
        { label: "IT Talent Placement", path: "/talent-placement" },
      ],
    },
    {
      key: "insights",
      label: "Insights",
      items: [
        { label: "Case Studies", path: "/case-study" },
        { label: "Article", path: "/article" },
      ],
    },
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50">
        {/* Navbar */}
        <div
          className={`flex justify-between text-white items-center px-[3%] md:px-[7%] lg:px-[3%] py-2 transition-all duration-300 ${
            showSolid
              ? "bg-[#be0f34] shadow-lg backdrop-blur-md"
              : "bg-primary-500 md:bg-transparent"
          }`}
        >
          <Link to="/" onClick={closeSidebar}>
            <img
              src="/logo.png"
              alt="logo"
              className={`duration-300 py-3 h-auto ${showSolid ? "w-[60px] lg:w-[120px]" : "w-[120px] lg:w-[200px]"}`}
            />
          </Link>

          {/* Desktop Menu with hover dropdowns */}
          <div className="hidden md:flex space-x-3 md:space-x-6 lg:space-x-10 items-center text-xs md:text-sm lg:text-sm">
            {dropdownMenus.map((menu) => (
              <DesktopDropdown
                key={menu.key}
                label={menu.label}
                isOpen={openMenu === menu.key}
                onHover={() => setOpenMenu(menu.key)}
                onLeave={() => setOpenMenu(null)}
              >
                {menu.items.map((item) => (
                  <DropdownLink key={item.label} to={item.path}>
                    {item.label}
                  </DropdownLink>
                ))}
              </DesktopDropdown>
            ))}

            {/* About - flat link */}
            <Link
              to="/about"
              className="flex items-center gap-1 hover:text-gray-200 transition-colors relative pb-1"
            >
              About
            </Link>
          </div>

          <button
            className="md:hidden px-2 py-5 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`bg-white/80 backdrop-blur-md fixed top-0 left-0 h-full w-[280px] shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <Link to="/" onClick={closeSidebar}>
              <img src="/logo.png" alt="logo" />
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Sidebar Menu */}
          <nav className="flex-1 overflow-y-auto py-5">
            {/* Training & Skills Accordion */}
            <SidebarAccordion
              label="Training & Skills"
              isOpen={isTrainingOpen}
              onToggle={() => setIsTrainingOpen(!isTrainingOpen)}
            >
              {dropdownMenus[0].items.map((item) => (
                <SidebarLink
                  key={item.label}
                  to={item.path}
                  onClick={closeSidebar}
                >
                  {item.label}
                </SidebarLink>
              ))}
            </SidebarAccordion>

            {/* Tech Solutions Accordion */}
            <SidebarAccordion
              label="Tech Solutions"
              isOpen={isTechOpen}
              onToggle={() => setIsTechOpen(!isTechOpen)}
            >
              {dropdownMenus[1].items.map((item) => (
                <SidebarLink
                  key={item.label}
                  to={item.path}
                  onClick={closeSidebar}
                >
                  {item.label}
                </SidebarLink>
              ))}
            </SidebarAccordion>

            {/* Advisory Support Accordion */}
            <SidebarAccordion
              label="Advisory Support"
              isOpen={isAdvisoryOpen}
              onToggle={() => setIsAdvisoryOpen(!isAdvisoryOpen)}
            >
              {dropdownMenus[2].items.map((item) => (
                <SidebarLink
                  key={item.label}
                  to={item.path}
                  onClick={closeSidebar}
                >
                  {item.label}
                </SidebarLink>
              ))}
            </SidebarAccordion>

            {/* Insights Accordion */}
            <SidebarAccordion
              label="Insights"
              isOpen={isInsightsOpen}
              onToggle={() => setIsInsightsOpen(!isInsightsOpen)}
            >
              {dropdownMenus[3].items.map((item) => (
                <SidebarLink
                  key={item.label}
                  to={item.path}
                  onClick={closeSidebar}
                >
                  {item.label}
                </SidebarLink>
              ))}
            </SidebarAccordion>

            {/* About */}
            <Link
              to="/about"
              className="block px-6 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
              onClick={closeSidebar}
            >
              About
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}

/* ---------- Desktop hover dropdown ---------- */

function DesktopDropdown({
  label,
  isOpen,
  onHover,
  onLeave,
  children,
}: {
  label: string;
  isOpen: boolean;
  onHover: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button
        className={`flex items-center gap-1 hover:text-gray-200 transition-colors relative pb-1 ${
          isOpen
            ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:rounded-full"
            : ""
        }`}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 min-w-[220px] ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function DropdownLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="block px-6 py-3 text-gray-800 hover:bg-primary-200 hover:font-semibold transition-colors border-b border-gray-100 last:border-b-0"
    >
      {children}
    </Link>
  );
}

/* ---------- Mobile sidebar accordion ---------- */

function SidebarAccordion({
  label,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
          isOpen
            ? "text-primary-500 bg-blue-50 border-l-4 border-primary-500 font-semibold"
            : "text-gray-800 hover:bg-gray-100"
        }`}
        onClick={onToggle}
      >
        <span className="text-left">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function SidebarLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="block pl-12 pr-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-500 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
