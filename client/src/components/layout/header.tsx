import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location === "/";
  const getHashLink = (hash: string) => isHomePage ? `#${hash}` : `/${hash}`;

  return (
    <nav className="bg-primary shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-heading font-bold text-xl">
                CyberLockX
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href={getHashLink("features")} className="text-white hover:text-accent border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </Link>
              <Link href={getHashLink("solution")} className="text-neutral-100 hover:text-accent border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Solution
              </Link>
              <Link href={getHashLink("sos2a")} className="text-neutral-100 hover:text-accent border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                SOS2A
              </Link>
              <Link href={getHashLink("patents")} className="text-neutral-100 hover:text-accent border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Patents
              </Link>
              <Link href={getHashLink("pricing")} className="text-neutral-100 hover:text-accent border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Pricing
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/sos2a-tool" className="bg-secondary hover:bg-orange-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out">
              Get Started
            </Link>
          </div>
          <div className="flex items-center sm:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white hover:text-accent"
              aria-label="Toggle mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href={getHashLink("features")} onClick={closeMobileMenu} className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
            Features
          </Link>
          <Link href={getHashLink("solution")} onClick={closeMobileMenu} className="text-neutral-100 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
            Solution
          </Link>
          <Link href={getHashLink("sos2a")} onClick={closeMobileMenu} className="text-neutral-100 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
            SOS2A
          </Link>
          <Link href={getHashLink("patents")} onClick={closeMobileMenu} className="text-neutral-100 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
            Patents
          </Link>
          <Link href={getHashLink("pricing")} onClick={closeMobileMenu} className="text-neutral-100 hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
            Pricing
          </Link>
          <Link href="/sos2a-tool" onClick={closeMobileMenu} className="bg-secondary text-white block text-center mt-3 px-3 py-2 rounded-md text-base font-medium">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
