"use client";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/images/logo.svg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/Aboutus", label: "About Us" },
  {
    href: "#",
    label: "Products",
    submenu: [
      {
        href: "/infrastructure",
        label: "Construction Solutions",
        subsubmenu: [
          { href: "/infrastructure", label: "Construction Solution" },
          { href: "/Products/steel-fibre", label: "Steel Fibre" },
          { href: "/Products/synthetic-fibre", label: "Synthetic Fibre" },
          { href: "/Products/cellulose-fiber-pellets", label: "Cellulose Fiber Pellets" },
          { href: "/Products/anti-stripping-agent", label: "Anti Stripping Agent" },
          { href: "/Products/silica-fume", label: "Silica Fume" },

        ]
      },
      { href: "/Coating", label: "Coating and Masterbatch Solutions" },
      { href: "https://indiapaper.com/", label: "Paper & Packaging" },
    ],
  },
  { href: "/Blog", label: "Knowledge Hub" },
  { href: "/Contact", label: "Contact Us" },
  // { href: "/login", label: "Admin" },
];  

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState<string | null>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const subSubmenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const subButtonRef = useRef<HTMLButtonElement>(null);

    
  const hideHeaderFooter = pathname?.includes("login") || pathname?.includes("dashboard");

    if(hideHeaderFooter)    return null;
  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // For mobile, we'll handle this differently since we don't need the complex ref logic
      if (window.innerWidth < 768) {
        return; // Let mobile handle clicks normally
      }

      // Desktop logic - close menus when clicking outside
      const isOutsideMainMenu = (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        (!submenuRef.current || !submenuRef.current.contains(event.target as Node))
      );

      const isOutsideSubMenu = (
        !subButtonRef.current ||
        !subButtonRef.current.contains(event.target as Node)
      ) && (
          !subSubmenuRef.current ||
          !subSubmenuRef.current.contains(event.target as Node)
        );

      if (isOutsideMainMenu) {
        setActiveSubmenu(null);
        setActiveSubSubmenu(null);
      } else if (isOutsideSubMenu && activeSubSubmenu) {
        setActiveSubSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeSubSubmenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = (label: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (activeSubmenu !== label) {
      setActiveSubSubmenu(null);
    }

    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  const toggleSubSubmenu = (label: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setActiveSubSubmenu(activeSubSubmenu === label ? null : label);
  };

  // Handle sub-submenu hover for Construction Solutions only
  const handleSubSubmenuMouseEnter = (label: string) => {
    if (window.innerWidth >= 768 && label === "Construction Solutions") { // Only on desktop and for Construction Solutions
      setActiveSubSubmenu(label);
    }
  };

  const handleSubSubmenuMouseLeave = () => {
    // Don't auto-close on mouse leave - let it stay open until clicked elsewhere
    return;
  };

  const navigateTo = (href: string) => {
    // Handle external links
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
    setMenuOpen(false);
    setActiveSubmenu(null);
    setActiveSubSubmenu(null);
  };

  const handleSubmenuClick = (href: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigateTo(href);
  };

  return (
    <header className="bg-Light shadow-md sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          <Image src={logo} alt="logo" className="w-[60px] h-[60px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isSubmenuOpen = activeSubmenu === link.label;

            return (
              <div
                key={link.label}
                className="relative"
              >
                {link.submenu ? (
                  <div className="relative">
                    <button
                      ref={buttonRef}
                      className={`text-Dark hover:text-primaryColor leading-5 md:px-3 lg:px-5 py-2 rounded-full duration-300 font-medium flex items-center gap-1 ${isActive ? "bg-primaryColor !text-Light" : ""}`}
                      onClick={(e) => toggleSubmenu(link.label, e)}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isSubmenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Desktop Submenu */}
                    {isSubmenuOpen && (
                      <div
                        ref={submenuRef}
                        className="absolute right-0 mt-4 w-34 bg-white  rounded-lg shadow-lg py-1 z-10"
                        style={{
                          display: 'block',
                          visibility: 'visible',
                          pointerEvents: 'auto',
                          minWidth: '200px',
                          position: 'absolute',
                        }}
                      >
                        {link.submenu.map((sub) => {
                          const hasSubSubmenu = 'subsubmenu' in sub;
                          const isSubSubmenuOpen = activeSubSubmenu === sub.label;

                          return (
                            <div
                              key={sub.href}
                              className="relative"
                              onMouseEnter={() => hasSubSubmenu && sub.label === "Construction Solutions" && handleSubSubmenuMouseEnter(sub.label)}
                            >
                              {hasSubSubmenu ? (
                                <>
                                  <button
                                    ref={subButtonRef}
                                    className={`w-full text-left flex justify-between items-center px-4 py-2 text-Dark hover:bg-primaryColor hover:text-Light duration-200 ${sub.label === "Construction Solutions" ? "font-semibold" : "font-normal"} ${pathname.startsWith(sub.href) ? "bg-primaryColor/10" : ""}`}
                                    onClick={(e) => {
                                      if (sub.label === "Construction Solutions") {
                                        // Navigate to construction solutions page
                                        navigateTo(sub.href);
                                      } else {
                                        // Toggle submenu for other items
                                        toggleSubSubmenu(sub.label, e);
                                      }
                                    }}
                                  >
                                    {sub.label}
                                    <ChevronDown
                                      size={16}
                                      className={`transition-transform duration-200 ${isSubSubmenuOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>

                                  {/* Desktop Sub-Submenu */}
                                  {isSubSubmenuOpen && (
                                    <div
                                      ref={subSubmenuRef}
                                      className="absolute left-full top-0 w-64 bg-white rounded-lg shadow-lg py-1 z-50"
                                      style={{
                                        display: 'block',
                                        visibility: 'visible',
                                        pointerEvents: 'auto',
                                        marginLeft: '5px',
                                        minWidth: '200px',
                                        position: 'absolute',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                      }}
                                    >
                                      {sub.subsubmenu?.map((subsub) => (
                                        <button
                                          key={subsub.href}
                                          onClick={() => navigateTo(subsub.href)}
                                          className={`w-full text-left block px-4 py-2 text-Dark hover:bg-primaryColor hover:text-Light duration-200 ${subsub.label === "Construction Solution" ? "font-semibold" : "font-normal"} ${pathname === subsub.href ? "bg-primaryColor/10" : ""}`}
                                        >
                                          {subsub.label}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <button
                                  onClick={() => navigateTo(sub.href)}
                                  className={`w-full text-left block px-4 py-2 text-Dark hover:bg-primaryColor hover:text-Light duration-200 ${sub.label === "Construction Solutions" ? "font-semibold" : "font-normal"} ${pathname === sub.href ? "bg-primaryColor/10" : ""}`}
                                >
                                  {sub.label}
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-Dark hover:text-primaryColor leading-5 md:px-3 lg:px-5 py-2 rounded-full duration-300 font-medium ${isActive ? "bg-primaryColor !text-Light" : ""}`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-800 hover:text-primaryColor focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 top-[72px] bg-black/50 backdrop-blur-sm z-40" />

          <nav className="fixed top-[72px] left-0 right-0 bg-white shadow-md z-50 max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="container mx-auto py-4 px-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isSubmenuOpen = activeSubmenu === link.label;

                return (
                  <div key={link.label} className="mb-2">
                    {link.submenu ? (
                      <>
                        <button
                          className={`w-full text-left text-Dark hover:text-primaryColor px-4 py-2 rounded-lg font-medium flex items-center justify-between cursor-pointer ${isActive ? "bg-primaryColor/10" : ""}`}
                          onClick={(e) => toggleSubmenu(link.label, e)}
                        >
                          {link.label}
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${isSubmenuOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Mobile Submenu */}
                        {isSubmenuOpen && (
                          <div className="mt-1 ml-4 space-y-1">
                            {link.submenu.map((sub) => {
                              const hasSubSubmenu = sub.subsubmenu && sub.subsubmenu.length > 0;
                              const isSubSubmenuOpen = activeSubSubmenu === sub.label;

                              return (
                                <div key={sub.href} className="mb-1">
                                  {hasSubSubmenu ? (
                                    <>
                                      <button
                                        className={`w-full text-left px-4 py-2 text-Dark hover:bg-primaryColor hover:text-Light duration-200 rounded-lg flex items-center justify-between ${sub.label === "Construction Solutions" ? "font-semibold" : "font-normal"} ${pathname.startsWith(sub.href) ? "bg-primaryColor/10" : ""}`}
                                        onClick={(e) => toggleSubSubmenu(sub.label, e)}
                                      >
                                        {sub.label}
                                        <ChevronDown
                                          size={16}
                                          className={`transition-transform duration-200 ${isSubSubmenuOpen ? "rotate-180" : ""} `}
                                        />
                                      </button>

                                      {/* Mobile Sub-Submenu */}
                                      {isSubSubmenuOpen && (
                                        <div className="mt-1 ml-4 space-y-1">
                                          {sub.subsubmenu.map((subsub) => (
                                            <button
                                              key={subsub.href}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                navigateTo(subsub.href);
                                              }}
                                              className={`w-full text-left block px-4 py-2 text-Dark hover:bg-primaryColor hover:text-Light duration-200 rounded-lg ${subsub.label === "Construction Solution" ? "font-semibold" : "font-normal"} ${pathname === subsub.href ? "bg-primaryColor/10" : ""}`}
                                            >
                                              {subsub.label}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <button
                                      onClick={() => navigateTo(sub.href)}
                                      className={`w-full text-left block px-4 py-2 text-Dark hover:bg-primaryColor hover:text-Light duration-200 rounded-lg ${sub.label === "Construction Solutions" ? "font-semibold" : "font-normal"} ${pathname === sub.href ? "bg-primaryColor/10" : ""}`}
                                    >
                                      {sub.label}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => navigateTo(link.href)}
                        className={`w-full text-left block text-Dark hover:text-primaryColor px-4 py-2 rounded-lg font-medium cursor-pointer ${isActive ? "bg-primaryColor !text-Light" : ""}`}
                      >
                        {link.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;