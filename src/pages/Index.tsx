
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Button } from '@/components/Button';

const Index = () => {
  useEffect(() => {
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <Layout>
      <Hero />
      <Features />
      
      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="subtle-text">Our Philosophy</p>
              <h2 className="heading-lg mt-3">Less, But Better</h2>
              <p className="paragraph mt-4">
                We believe that the best design solution is always the simplest one. By removing the unnecessary, 
                we allow the essential to speak. Our approach is rooted in the principle that good design is 
                as little design as possible.
              </p>
              <p className="paragraph mt-4">
                Every detail is considered, every element has purpose, and nothing is arbitrary. 
                This discipline creates products that are intuitive, elegant, and timeless.
              </p>
              <Button className="mt-6" variant="outline">Learn Our Process</Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-secondary rounded-2xl overflow-hidden shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-primary/5">
                  <div className="w-3/4 aspect-square bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                    <div className="text-center p-8">
                      <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" x2="8" y1="13" y2="13" />
                          <line x1="16" x2="8" y1="17" y2="17" />
                          <line x1="10" x2="8" y1="9" y2="9" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium mb-2">Design Guidelines</h3>
                      <p className="text-sm text-muted-foreground">
                        Our comprehensive approach to creating cohesive, beautiful experiences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section-padding bg-secondary/30">
        <div className="container-wrapper">
          <div className="max-w-2xl mx-auto text-center">
            <p className="subtle-text">Get In Touch</p>
            <h2 className="heading-lg mt-3">Ready to Create Something Beautiful?</h2>
            <p className="paragraph mx-auto mt-4">
              Let's collaborate to create experiences that are both beautiful and functional. 
              Reach out to start a conversation about your next project.
            </p>
            <div className="mt-8 inline-flex flex-col sm:flex-row gap-4">
              <Button size="lg">Contact Us</Button>
              <Button variant="outline" size="lg">View Portfolio</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
