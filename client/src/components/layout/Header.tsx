import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import abkLogo from "@assets/Picsart_25-09-04_00-07-35-061_1756924718344.png";

export function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Location", href: "/location" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header className="bg-gradient-to-r from-white via-orange-50 to-white shadow-lg backdrop-blur-md fixed w-full top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={abkLogo} 
                      alt="ABK Food Services Logo" 
                      className="w-14 h-14 hover:scale-110 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-red-700 transition-all duration-300">
                      ABK Food Services
                    </h1>
                    <p className="text-xs text-gray-600 font-medium">Fresh & Fast Delivery</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer relative overflow-hidden focus:outline-none ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 hover:text-orange-700"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-50 animate-pulse"></div>
                    )}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Business Hours Badge */}
              <div className="hidden lg:flex items-center">
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-2 lg:px-3 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-medium border border-blue-200 shadow-sm whitespace-nowrap">
                  <span className="mr-1">⏰</span>
                  10AM-11PM
                </div>
              </div>
              
              {/* Contact Button */}
              <button 
                onClick={() => window.open('tel:+918341051124', '_self')}
                className="hidden sm:flex items-center bg-white border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-2 lg:px-3 py-1 lg:py-2 rounded-lg font-semibold text-xs lg:text-sm transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap focus:outline-none focus:ring-0"
              >
                <span className="mr-1 lg:mr-2">📞</span>
                Call
              </button>
              
              {/* Order Button */}
              <Link href="/menu">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded-lg font-bold text-xs lg:text-sm shadow-lg hover:shadow-xl transition-all duration-300 border-none whitespace-nowrap focus:outline-none focus:ring-0">
                  <span className="mr-1 lg:mr-2">🍽️</span>
                  Order
                </button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 border border-gray-300 ml-2 focus:outline-none focus:ring-0"
              >
                {isMenuOpen ? <X className="h-4 w-4 text-gray-700" /> : <Menu className="h-4 w-4 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors cursor-pointer focus:outline-none ${
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
