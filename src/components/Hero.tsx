
import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el) => {
        const depth = parseFloat((el as HTMLElement).dataset.depth || '10');
        const moveX = x * depth;
        const moveY = y * depth;
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-40"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl parallax-element" data-depth="20"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl parallax-element" data-depth="15"></div>
      </div>
      
      <div className="container-wrapper relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p 
            className="subtle-text animate-slide-up opacity-0" 
            style={{ '--index': '0' } as React.CSSProperties}
          >
            Minimalist Design Philosophy
          </p>
          <h1 
            className="heading-xl mt-4 animate-slide-up opacity-0" 
            style={{ '--index': '1' } as React.CSSProperties}
          >
            Design is not just what it looks like, design is how it works
          </h1>
          <p 
            className="paragraph mx-auto mt-6 animate-slide-up opacity-0" 
            style={{ '--index': '2' } as React.CSSProperties}
          >
            An elegant fusion of form and function, creating experiences that are both beautiful and intuitive. 
            We believe in the power of simplicity and attention to detail.
          </p>
          
          <div 
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up opacity-0" 
            style={{ '--index': '3' } as React.CSSProperties}
          >
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
