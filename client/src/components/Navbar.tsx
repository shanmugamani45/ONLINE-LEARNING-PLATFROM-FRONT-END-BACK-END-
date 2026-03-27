import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Instructors", path: "/instructors" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-display tracking-tight text-white">
              Nova<span className="text-primary">Learn</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <div className="relative cursor-pointer py-1 group">
                <span className={`text-sm font-medium transition-colors ${
                  location === link.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}>
                  {link.name}
                </span>
                {location === link.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          ))}
          <Link href="/courses">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
        >
          <div className="container px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div 
                  className={`text-sm font-medium p-2 rounded-md cursor-pointer ${
                    location === link.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </div>
              </Link>
            ))}
            <Link href="/courses">
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsOpen(false)}>
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
