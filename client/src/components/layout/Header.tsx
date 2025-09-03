import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import abkLogo from "@assets/Untitled Project (2)_1756879874861.png";

export function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <img 
                    src={abkLogo} 
                    alt="ABK Food Services Logo" 
                    className="w-12 h-12 hover:scale-105 transition-transform duration-200"
                  />
                  <h1 className="text-2xl font-heading font-bold text-primary">
                    ABK Food Services
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      isActive(item.href)
                        ? "text-primary font-semibold"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Contact CTA */}
              <Button size="sm" className="hidden sm:inline-flex">
                Call Now: +91 8341051124
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer ${
                        isActive(item.href)
                          ? "text-primary bg-orange-50"
                          : "text-gray-700 hover:text-primary hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>


    </>
  );
}
