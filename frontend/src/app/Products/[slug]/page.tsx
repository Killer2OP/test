// import React from 'react';
// import Image from 'next/image';

//  export default async function ProductDetail() {

//   return (
//     <main className="min-h-screen bg-[var(--background)]">
//       <section className="relative h-[60vh] w-full">
//         <Image
//           src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
//           alt="Product Image"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//           <div className="container mx-auto px-4">
//             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//             Synthetic Fibre
//             </h1>
//             <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
//             Micro Polyester and Polyproplene Fibre
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 py-16">
//         <div className="grid md:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Overview</h2>
//             <p className="text-[var(--text-body)] mb-6">
//             Concrete tends to become brittle, lacking tension and developing cracks in certain construction projects which are faced with repeated stress, temperature variation and corrosion. Recron 3s adds toughness and tensile strength to concrete while helping resist shrinkage and cracking. It also bonds better to the mix, thanks to its unique triangular cross section and dimensional stability. Developed after extensive research by Reliance Industries Limited, Recron 3s has been widely used in a variety of applications
//             </p>

//           </div>

//           <div>
//             <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">Specifications</h2>
//             <div className="space-y-4">
//               <div className="border-b border-[var(--text-body)]/10 pb-4">
//                 <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Project Type</h3>
//                 <p className="text-[var(--text-body)]"> Polyester and Polypropolene (Mono filament)</p>
//               </div>
//               <div className="border-b border-[var(--text-body)]/10 pb-4">
//                 <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Length</h3>
//                 <p className="text-[var(--text-body)]">1mm, 3mm. 6mm, 12mm, 18mm</p>
//               </div>
//               <div className="border-b border-[var(--text-body)]/10 pb-4">
//                 <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Compliance</h3>
//                 <p className="text-[var(--text-body)]"> Complies with IS 16481:2022, EN 14889-2:2006 of EU
//                 </p>
//               </div>
//               <div className="border-b border-[var(--text-body)]/10 pb-4">
//                 <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">Tested by</h3>
//                 <p className="text-[var(--text-body)]"> IIT Madras, CBRI Roorkee, CRRI, SVNIT Surat, UBC Canada</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-16">
//           <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)]">Key Features</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="bg-[var(--background)] border border-[var(--text-body)]/10 rounded-lg p-6 shadow-lg"
//               >
//                 <h3 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
//                   Feature {item}
//                 </h3>
//                 <p className="text-[var(--text-body)]">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//                   eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-16">
//           <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)]">Gallery</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((item) => (
//               <div key={item} className="relative h-64 rounded-lg overflow-hidden">
//                 <Image
//                   src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
//                   alt={`Gallery image ${item}`}
//                   fill
//                   className="object-cover hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="relative mt-32 mb-16">

//           <div className="bg-primaryColor rounded-2xl px-4 py-16 md:p-16">
//             <div className="max-w-4xl mx-auto text-center">
//               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-dark)] mb-6">
//                 Want to Create Your Dream Project?
//               </h2>

//               <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
//                 <button className="w-full md:w-auto bg-[var(--text-dark)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all">
//                   CONTACT US
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

import React from "react";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";
import OurProject from '../../component/Home/OurProject'


interface Project {
  slug: string;
  name: string;
  bgImage: string;
  description: string;
  extraLine?: string;
  extraImg?: string;
  image: string;
  overview: string;
  application?: string[];
  advantages?: string[];
  keyFeatures?: string[];
  specifications: Specification[];
  images: string[];
  logoImg?: string[];
  pdfURL?: string;
  storage?: string;
}

interface Specification {
  title: string;
  value: string;
}

async function getProjectData(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "projects.json");
    const jsonData = await fs.readFile(filePath, "utf-8");
    const projects: Project[] = JSON.parse(jsonData);
    return projects.find((project) => project.slug === slug) || null;
  } catch (error) {
    console.error("Error reading projects.json:", error);
    return null;
  }
}

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const project = await getProjectData(slug);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Project Not Found</h1>
      </main>
    );
  }

  const hasLogos = project.logoImg && project.logoImg.length > 0;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="relative h-[50vh] w-full">
        {/* Logos on Right Side */}
        {hasLogos && (
          <div className="absolute top-4 right-0 z-10 flex flex-row gap-2 md:gap-4">
            {project?.logoImg?.map((logo, index) => (
              <div
                key={index}
                className="relative  w-[60%] h-auto md:w-[85%] md:h-auto max-w-xs overflow-hidden shadow-lg"
              >
                <Image
                  src={logo}
                  alt={`${project.name} Logo ${index + 1}`}
                  width={130}
                  height={100}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <Image
          src={
            project.bgImage ||
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          }
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {project.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              {project.description}
            </p>
            {project?.extraLine && <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              {project?.extraLine}
            </p>}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Overview Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
              Overview
            </h2>
            <div
              className="text-gray-600 text-[var(--text-body)] mb-4"
              dangerouslySetInnerHTML={{ __html: project.overview }}
            />

            {/* Image below overview for Synthetic Fibre */}
            {project.slug === 'synthetic-fibre' && (
              <div className="relative w-full h-[350px] md:h-[300px] my-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/synthetic-12.png"
                  alt="Recron® 3s synthetic fibers with triangular cross-section for concrete reinforcement"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Specifications Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
              Specifications
            </h2>
            <div className="space-y-4">
              {project.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="border-b border-[var(--text-body)]/10 pb-4"
                >
                  <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">
                    {spec.title}
                  </h3>
                  <p className="text-gray-600 text-[var(--text-body)]">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {project?.extraImg && project.slug !== 'synthetic-fibre' && (
          <div className="pb-4 mt-5">

            <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
              <Image
                src={project?.extraImg}
                alt="Storage Condition"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* Application Section */}
        {project.application && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
              Application
            </h2>
            <ul className="list-disc pl-5 text-gray-600  text-[var(--text-body)]">
              {project?.application?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Advantages Section */}
        {project.advantages && project.advantages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
              Advantages
            </h2>
            <ul className="list-disc list-inside text-gray-600  text-[var(--text-body)] space-y-2">
              {project.advantages.map((advantage, index) => (
                <li key={index}>{advantage}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Features Section */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
              Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-600  text-[var(--text-body)] space-y-2">
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}


        {/* Storage */}
        {project?.storage && (
          <div
            className="pb-4 mt-5"
          >
            <h2 className="text-3xl  font-bold mb-6 text-[var(--foreground)]">
              Storage Condition
            </h2>
            <p className="text-[var(--text-body)] text-gray-600 max-w-4xl">{project.storage}</p>
          </div>
        )}

        {/* Conclusion Section - Only for Cellulose Fiber Pellets (SMA) */}

        {project.slug === 'cellulose-fiber-pellets' && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
              Conclusion
            </h2>
            <div className="text-gray-600 text-[var(--text-body)] space-y-4">
              <p>
                Stone Matrix Asphalt (SMA) represents a significant advancement in road construction technology, offering superior durability, rut resistance, and longevity compared to conventional asphalt mixes.
              </p>
              <p>
                While SMA may have a higher initial cost, its long-term benefits&mdash;including reduced maintenance requirements, extended service life, and improved safety characteristics&mdash;make it a cost-effective solution for high-traffic roads, highways, and other demanding applications.
              </p>
              <p>
                As infrastructure demands continue to grow, SMA technology, supported by quality cellulose fiber additives, offers a sustainable and reliable solution for modern pavement construction challenges.
              </p>
            </div>
          </div>
        )}

        {/* Download PDF Button */}
        {project.slug === 'synthetic-fibre' ? (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="../pdf/Recron 3s Advantage.pdf"
              download
              className="inline-block bg-[var(--text-dark)] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
            Recron 3s Advantage Brochure
            </a>
            <a
              href="../pdf/Recron 3s Application wise Dosage Recommendations.pdf"
              download
              className="inline-block bg-[var(--text-dark)] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Download Recron 3s Application
            </a>
            <a
              href={project.pdfURL}
              download
              className="inline-block bg-[var(--text-dark)] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Download General Brochure
            </a>
          </div>
        ) : (
          project.pdfURL && (
            <a
              href={project.pdfURL}
              download
              className="inline-block bg-[var(--text-dark)] text-white px-6 py-3 rounded-lg text-lg font-semibold mt-5 hover:bg-opacity-90 transition-all"
            >
              Download Brochure
            </a>
          )
        )}

        {/* Gallery Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)]">
            PRODUCT GALLERY
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {project.images.map((img, index) => (
              <div
                key={index}
                className="relative h-64 rounded-lg overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="overflow-x-hidden">
        <OurProject />
      </div>
    </main>
  );
}
