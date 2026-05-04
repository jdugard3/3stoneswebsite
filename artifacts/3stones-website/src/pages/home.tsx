import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@assets/jpeg_(1)_1777904451511.png";
import { ChevronRight, ArrowRight, Server, Zap, Brain, CheckCircle, Mail, Phone, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Add dark class to document
    document.documentElement.classList.add("dark");
    
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "hero";
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "hero";
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground relative">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(to right, hsl(var(--primary)/0.1) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)/0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <img src={logo} alt="3 Stones Services" className="h-10 w-10 object-contain" />
            <span className="font-mono font-bold tracking-wider hidden sm:block text-xl">3STONES.DEV</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            {['services', 'portfolio', 'tech', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item)}
                className={`uppercase tracking-widest transition-colors hover:text-primary ${
                  activeSection === item ? "text-primary drop-shadow-[0_0_8px_rgba(20,255,0,0.5)]" : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          
          <Button 
            onClick={() => scrollTo('contact')}
            className="font-mono rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(20,255,0,0.15)] hover:shadow-[0_0_25px_rgba(20,255,0,0.4)]"
          >
            INIT_CONTACT
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-[90vh] flex flex-col justify-center items-start max-w-7xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary font-mono text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SYSTEM.STATUS: ONLINE
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 max-w-5xl leading-tight">
              WE BUILD THE <span className="text-primary bg-none drop-shadow-[0_0_15px_rgba(20,255,0,0.3)]">AUTOMATION LAYER</span> BETWEEN YOUR TOOLS AND YOUR GOALS.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-mono leading-relaxed">
              Precision engineering for complex workflows. We eliminate manual steps so your business can scale.
            </p>
            
            <div className="pt-8 flex flex-wrap gap-6">
              <Button 
                size="lg"
                onClick={() => scrollTo('services')}
                className="font-mono text-lg rounded-none border border-primary bg-primary text-black hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(20,255,0,0.3)] hover:shadow-[0_0_30px_rgba(20,255,0,0.6)] h-14 px-8"
              >
                EXPLORE.SERVICES <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-32 border-t border-primary/10 bg-black/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-mono text-primary mb-4 tracking-widest">// CORE_SERVICES</h2>
              <h3 className="text-4xl md:text-5xl font-bold">What we build.</h3>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Server className="h-10 w-10 text-primary mb-6" />,
                  title: "Custom Web Applications",
                  desc: "Bespoke full-stack platforms built to fit your exact workflow. No bloated templates, just clean, secure code that works."
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary mb-6" />,
                  title: "Workflow Automation",
                  desc: "Zapier, Make, Power Automate, Pipedream. We map and eliminate the manual steps between your siloed apps."
                },
                {
                  icon: <Brain className="h-10 w-10 text-primary mb-6" />,
                  title: "AI Integrations",
                  desc: "GPT-4 Vision, AI document processing, intelligent routing, and more baked directly into your operations."
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 border border-primary/20 bg-card/50 hover:bg-card hover:border-primary/50 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {service.icon}
                  <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="portfolio" className="py-32 border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-mono text-primary mb-4 tracking-widest">// CASE_STUDIES</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Recent Deployments.</h3>
            </motion.div>

            <div className="space-y-12">
              {[
                {
                  name: "Secure2Send",
                  status: "NEARLY COMPLETE",
                  tech: ["Cloudflare R2", "DocuSeal", "GPT-4 Vision", "ClickUp"],
                  desc: "Document management and merchant onboarding platform: AES-256-GCM field-level encryption, self-hosted e-signature on Railway, SOC 2 audit logging, OCR/AI document processing, and UAT feedback pipeline."
                },
                {
                  name: "Life Saver Pool Fence",
                  status: "LIVE",
                  tech: ["Gravity Forms", "Pipedream", "Calendly", "ClickUp"],
                  desc: "Complex dual-system lead routing: matched ZIP codes to franchise booking pages with prefilled fields, and a full Zapier-to-Pipedream migration replicating their entire lead workflow."
                },
                {
                  name: "Toys 2000",
                  status: "IN DEVELOPMENT",
                  tech: ["MarketTime API", "React", "Node.js"],
                  desc: "Custom wholesale ordering platform built on the MarketTime API: catalog sync, bulk cart with case-pack enforcement, order submission, customer accounts, and admin dashboard."
                },
                {
                  name: "Avology",
                  status: "COMPLETED",
                  tech: ["Pipedrive", "SharePoint", "Jetbuilt"],
                  desc: "Multi-phase integration: sequential project numbering, structured folder creation, deal-stage triggers, and cross-system sync with webhook loop prevention."
                },
                {
                  name: "Metrc API Certification",
                  status: "COMPLETED",
                  tech: ["Education", "API Design", "Metrc"],
                  desc: "Full certification study package: study guide, quiz, and video script for Metrc API focused on financial reconciliation for Enforc AI."
                },
                {
                  name: "Trial Killer",
                  status: "LIVE",
                  tech: ["Chrome Extension", "Google OAuth", "Mailgun"],
                  desc: "Chrome extension for SmartClick tracking and managing free trial subscriptions using Google OAuth and Mailgun."
                }
              ].map((project, i) => (
                <motion.div 
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-6 md:gap-12 p-8 border border-primary/20 bg-card/30 hover:border-primary/40 transition-colors"
                >
                  <div className="md:w-1/3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-3xl font-bold mb-2">{project.name}</h4>
                      <div className="inline-block px-2 py-1 text-xs font-mono border border-primary/50 text-primary mb-6">
                        {project.status}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-xs font-mono bg-white/5 px-2 py-1 text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section id="tech" className="py-32 border-t border-primary/10 bg-black/50">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-mono text-primary mb-4 tracking-widest">// ARSENAL</h2>
            <h3 className="text-3xl font-bold mb-16">Platforms We Command</h3>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {['Zapier', 'Make', 'Power Automate', 'Pipedream', 'ClickUp', 'Mailchimp', 'SendGrid', 'Calendly', 'Pipedrive', 'SharePoint', 'Jetbuilt', 'Cloudflare', 'DocuSeal', 'GPT-4 Vision'].map((tech) => (
                <div key={tech} className="px-6 py-3 border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all font-mono">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 border-t border-primary/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="font-mono text-primary mb-4 tracking-widest">// INITIATE</h2>
                <h3 className="text-4xl md:text-5xl font-bold mb-8">Ready to automate?</h3>
                <p className="text-xl text-muted-foreground font-mono mb-12">
                  Send us your workflow constraints. We'll engineer the solution.
                </p>
                
                <div className="space-y-6 font-mono text-lg">
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-6 w-6" />
                    <a href="mailto:contact@3stonesservices.com">contact@3stonesservices.com</a>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                    <Code className="h-6 w-6" />
                    <span>Based in the US</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-8 border border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-mono text-xs text-primary">NAME</Label>
                      <Input id="name" placeholder="John Doe" className="bg-black/50 border-primary/20 focus-visible:ring-primary font-mono rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-mono text-xs text-primary">EMAIL</Label>
                      <Input id="email" type="email" placeholder="john@company.com" className="bg-black/50 border-primary/20 focus-visible:ring-primary font-mono rounded-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-mono text-xs text-primary">PHONE</Label>
                    <Input id="phone" type="tel" placeholder="(555) 555-5555" className="bg-black/50 border-primary/20 focus-visible:ring-primary font-mono rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-mono text-xs text-primary">PROJECT_SPECS</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your workflow bottlenecks..." 
                      className="min-h-[150px] bg-black/50 border-primary/20 focus-visible:ring-primary font-mono rounded-none resize-none" 
                    />
                  </div>
                  <Button type="button" className="w-full font-mono text-lg rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(20,255,0,0.1)] h-14">
                    TRANSMIT_DATA
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="3 Stones Services" className="h-8 w-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} 3 STONES SERVICES LLC. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            EST. 2022 // US BASED
          </div>
        </div>
      </footer>
    </div>
  );
}