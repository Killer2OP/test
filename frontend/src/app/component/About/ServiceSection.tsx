import React, { JSX, useEffect, useRef } from "react";
import { Building, Building2, ChevronRight, PencilRuler, Wrench } from "lucide-react";

interface Service {
  icon: JSX.Element;
  title: string;
  type: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Building className="w-12 h-12" />,
    title: "Architectural Excellence",
    type: "Design & Planning",
    description:
      "Creating innovative architectural solutions that blend aesthetics with functionality. Our designs shape the future of urban landscapes.",
  },
  {
    icon: <Wrench className="w-12 h-12" />,
    title: "Engineering Mastery",
    type: "Technical Solutions",
    description:
      "Delivering cutting-edge engineering solutions with precision. From concept to completion, we ensure technical excellence.",
  },
  {
    icon: <PencilRuler className="w-12 h-12" />,
    title: "Project Leadership",
    type: "Management & Execution",
    description:
      "Expert project management ensuring timely delivery, cost efficiency, and superior quality in every construction phase.",
  },
  {
    icon: <Building2 className="w-12 h-12" />,
    title: "Urban Development",
    type: "Infrastructure & Growth",
    description:
      "Transforming cities through sustainable infrastructure development. Building tomorrow's communities today.",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    if (!section || !leftContent) return;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const viewportHeight = window.innerHeight;
      const stopPoint = sectionBottom - viewportHeight;

      if (sectionTop <= 0 && stopPoint > 0) {
        // Fixed position while scrolling through the section
        leftContent.style.position = 'fixed';
        leftContent.style.top = '50%';
        leftContent.style.transform = 'translateY(-50%)';
      } else if (stopPoint <= 0) {
        // Absolute position at the bottom when reaching the end
        leftContent.style.position = 'absolute';
        leftContent.style.top = '50%';
        leftContent.style.transform = 'translateY(0)';
      } else {
        // Initial position at the top
        leftContent.style.position = 'absolute';
        leftContent.style.top = '50%';
        leftContent.style.transform = 'translateY(-50%)';
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--background)]"
    >
      {/* Mobile Layout */}
      <div className="lg:hidden w-full py-12 px-4 space-y-8">
        <div className="bg-[var(--accent)] text-[var(--text-light)] p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Building Tomorrow <span className="text-[var(--primary)]">World</span> Today
          </h2>
          <p className="text-[var(--text-body)] mb-4">
            Pioneering construction excellence with innovative solutions and 
            unmatched expertise in building the future.
          </p>
          <button className="bg-[var(--primary)] text-[var(--text-light)] px-6 py-3 text-lg rounded-md hover:bg-opacity-90 transition-all">
            Explore All Services
          </button>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[var(--background)] border border-[var(--text-body)]/10 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl text-[var(--primary)]">{service.icon}</div>
                <span className="text-lg font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full">
                  {service.type}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{service.title}</h3>
              <p className="text-[var(--text-body)] text-base mb-4">
                {service.description}
              </p>
              <button className="flex items-center text-[var(--primary)] hover:text-[var(--secondary)] transition-all group">
                Read More
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative min-h-[200vh]">
        <div 
          ref={leftContentRef}
          className="w-[40%] absolute left-0 px-12"
          style={{ transform: 'translateY(-50%)' }}
        >
          <div className="bg-[var(--accent)] text-[var(--text-light)] p-12 rounded-lg">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Building Tomorrow <span className="text-[var(--primary)]">World</span> Today
            </h2>
            <p className="text-[var(--text-body)] text-xl mb-6">
              Pioneering construction excellence with innovative solutions and 
              unmatched expertise in building the future.
            </p>
            <button className="bg-[var(--primary)] text-[var(--text-light)] px-8 py-4 text-lg rounded-md hover:bg-opacity-90 transition-all">
              Explore All Services
            </button>
          </div>
        </div>

        <div className="w-[55%] ml-auto pt-24 pb-32 px-8">
          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-[var(--background)] border border-[var(--text-body)]/10 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="text-6xl text-[var(--primary)]">{service.icon}</div>
                  <span className="text-xl font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-4 py-2 rounded-full">
                    {service.type}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[var(--foreground)]">{service.title}</h3>
                <p className="text-[var(--text-body)] text-lg mb-6">
                  {service.description}
                </p>
                <button className="flex items-center text-[var(--primary)] hover:text-[var(--secondary)] transition-all text-lg group">
                  Read More
                  <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
