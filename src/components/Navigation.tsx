
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-out-expo',
        isScrolled ? 'py-3 glass-effect' : 'py-5 bg-transparent'
      )}
    >
      <div className="container-wrapper flex items-center justify-between">
        <Link to="/" className="relative z-10">
          <div className="font-medium text-lg">
            <span className="text-primary">Concise</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Home
            </Link>
            <Link 
              to="#features" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Features
            </Link>
            <Link 
              to="#about" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              About
            </Link>
            <Link 
              to="#contact" 
              className="text-sm font-medium transition-colors hover:text-primary/80"
            >
              Contact
            </Link>
          </nav>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>

        <button
          className="relative z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col justify-center items-center w-8 h-8">
            <span 
              className={cn(
                "w-5 h-0.5 bg-primary rounded-full transition-all duration-300",
                isMobileMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
              )} 
            />
            <span 
              className={cn(
                "w-5 h-0.5 bg-primary rounded-full transition-all duration-300",
                isMobileMenuOpen ? "-rotate-45" : "translate-y-1"
              )} 
            />
          </div>
        </button>

        {/* Mobile menu */}
        <div 
          className={cn(
            "fixed inset-0 flex flex-col justify-center items-center bg-background transition-all duration-300 ease-out-expo",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-center space-y-8 mb-12">
            <Link 
              to="/" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#features" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#about" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="#contact" 
              className="text-lg font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
          <div className="flex flex-col space-y-4">
            <Button variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
              Sign In
            </Button>
            <Button onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
