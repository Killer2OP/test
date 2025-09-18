import React from 'react';
import Image from 'next/image';

import Logo1 from '../../../../public/Clientele/HG.jpg';
import Logo2 from '../../../../public/Clientele/KCC_LOGO.png';
import Logo3 from '../../../../public/Clientele/L&T.png';
import Logo4 from '../../../../public/Clientele/apco.png';
import Logo5 from '../../../../public/Clientele/gawar.png';
import Logo6 from '../../../../public/Clientele/jkumar.png';
import Logo7 from '../../../../public/Clientele/monte.png';
import Logo8 from '../../../../public/Clientele/navayuga.png';
import { useEffect, useState } from 'react';

const OurClients = () => {
  const fallback = [
    { src: Logo1, alt: 'HG Logo' },
    { src: Logo2, alt: 'KCC Logo' },
    { src: Logo3, alt: 'L&T Logo' },
    { src: Logo4, alt: 'APCO Logo' },
    { src: Logo5, alt: 'Gawar Logo' },
    { src: Logo6, alt: 'JKumar Logo' },
    { src: Logo7, alt: 'Monte Logo' },
    { src: Logo8, alt: 'Navayuga Logo' }
  ];

  const [logos, setLogos] = useState<any[]>(fallback);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/content/clients/list', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          const items = (json?.content?.items || []).sort((a: any, b: any) => (a.order||0) - (b.order||0));
          if (items.length) {
            setLogos(items.map((i: any) => ({ src: i.logo, alt: i.name, link: i.link })));
          }
        }
      } catch (_) {}
    }
    load();
  }, []);

  return (
    <div className="container mx-auto overflow-hidden bg-white py-6 sm:py-8 md:py-10">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black text-center mb-8 sm:mb-10 md:mb-12">Our Clients</h2>
    <div className="animate-marquee flex w-full overflow-hidden">
        {[...logos, ...logos].map((logo, index) => (
         <div
         key={index}
         className="flex-shrink-0 w-28 sm:w-32 md:w-40 h-16 sm:h-16 md:h-20 mx-4 sm:mx-6 md:mx-10 flex items-center justify-center"
       >
            {typeof logo.src === 'string' ? (
              <a href={logo.link || '#'} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} className="max-h-full max-w-full object-contain" />
              </a>
            ) : (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={225}
                height={180}
                className="max-h-full max-w-full object-contain transition-all duration-800"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurClients;
