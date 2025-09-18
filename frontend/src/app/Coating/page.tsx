// 'use client'
// import React from 'react';
// import TitaniumDioxide from '../../../public/images/titanium-dioxide.png'
// import SyntheticFibre from '../../../public/images/synthetic-1.png';
// import StyreneButadieneLatex from '../../../public/images/styrene-butadiene-latex.jpg';
// import StyreneAcrylicLatex from '../../../public/images/styrene-acrylic-latex.jpg';
// import EthylCellulose from '../../../public/images/ethyl-cellulose.jpg';
// import MethylCellulose from '../../../public/images/methyl-cellulose.jpg';
// import SodiumAlginate from '../../../public/images/sodium-alginate.jpg';

// import SingleImage from '../../../public/images/steel-1.jpg';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const OurProducts = [
//   {
//     ProjectLink: '/Products/titanium-dioxide',
//     ProjectImg: TitaniumDioxide,
//     ProjectTitle: 'Titanium Dioxide',
//     ProjectDescription: 'High-quality titanium dioxide used in various industries including paints, coatings, and more.',
//   },
//   {
//     ProjectLink: '/Products/tiq-replacement',
//     ProjectImg: SingleImage,
//     ProjectTitle: 'TiQ - Replacement of TiO2',
//     ProjectDescription: 'Innovative solution to reduce reliance on traditional titanium dioxide in various applications.',
//   },
//   {
//     ProjectLink: '/Products/synthetic-fibre',
//     ProjectImg: SyntheticFibre,
//     ProjectTitle: 'Synthetic Fibre',
//     ProjectDescription: 'Durable and versatile synthetic fibers used in a wide range of manufacturing processes.',
//   },
//   {
//     ProjectLink: '/Products/styrene-butadiene-latex',
//     ProjectImg: StyreneButadieneLatex,
//     ProjectTitle: 'Styrene Butadiene Latex',
//     ProjectDescription: 'Used in adhesives, paints, and coatings for excellent bonding and elasticity.',
//   },
//   {
//     ProjectLink: '/Products/styrene-acrylic-latex',
//     ProjectImg: StyreneAcrylicLatex,
//     ProjectTitle: 'Styrene Acrylic Latex',
//     ProjectDescription: 'Offers superior weathering and UV stability, ideal for exterior applications.',
//   },
//   {
//     ProjectLink: '/Products/ethyl-cellulose',
//     ProjectImg: EthylCellulose,
//     ProjectTitle: 'Ethyl Cellulose',
//     ProjectDescription: 'Used as a binder in coatings and a thickener in a variety of applications.',
//   },
//   {
//     ProjectLink: '/Products/methyl-cellulose',
//     ProjectImg: MethylCellulose,
//     ProjectTitle: 'Methyl Cellulose (HPMC)',
//     ProjectDescription: 'Used as a thickener and stabilizer in food, pharmaceuticals, and more.',
//   },
//   {
//     ProjectLink: '/Products/sodium-alginate',
//     ProjectImg: SodiumAlginate,
//     ProjectTitle: 'Sodium Alginate',
//     ProjectDescription: 'Used in food, pharmaceuticals, and industrial applications as a gelling agent.',
//   },
// ];

// const CoatingPage = () => {
//   return (
//     <div className='bg-background text-text-dark'>
//       {/* Headline Section with Background Image */}
//       <section className="relative bg-cover bg-center h-80" style={{ backgroundImage: "url('/images/your-background-image.jpg')" }}>
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white flex flex-col justify-center h-full">
//           <h1 className="text-3xl sm:text-4xl font-semibold">Advanced Solutions for Masterbatches, Paints, Inks and Coatings</h1>
//         </div>
//       </section>

//       {/* Full-Width Image Section */}
//       <section className="relative w-full h-[80vh]">
//         <Image
//           src="/images/full-width-image.jpg" // Replace with the desired image path
//           alt="Full Width Image"
//           layout="fill"
//           objectFit="cover"
//           className="absolute top-0 left-0 w-full h-full"
//         />
//       </section>

//       {/* Products Carousel Section */}
//       <section className='py-12 sm:py-14 md:py-16 lg:py-20 bg-primary'>
//         <div className="container mx-auto px-4 md:px-8">
//           <div className='mb-12 text-center'>
//             <h2 className="mb-5 text-light text-2xl sm:text-3xl leading-8 sm:leading-10 font-medium">
//               Our <span className="font-bold uppercase">PRODUCTS</span>
//             </h2>
//           </div>

//           <div className="overflow-hidden relative">
//             <Swiper
//               modules={[Navigation, Autoplay]}
//               autoplay={{ delay: 4000, disableOnInteraction: false }}
//               navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }} // Enable Manual Navigation
//               spaceBetween={20}
//               slidesPerView={3}
//               pagination={{ clickable: true }}
//               breakpoints={{
//                 640: { slidesPerView: 1 },
//                 768: { slidesPerView: 2 },
//                 1024: { slidesPerView: 3 },
//               }}
//               className="py-5"
//             >
//               {OurProducts.map((item, index) => (
//                 <SwiperSlide key={index} className="group">
//                   <div className="w-full flex justify-center">
//                     <div className="w-[250px] h-[250px] overflow-hidden shadow-lg border-4 border-gray-200">
//                       <Image
//                         src={item.ProjectImg}
//                         alt={item.ProjectTitle}
//                         width={250}
//                         height={250}
//                         className="w-full h-full object-cover group-hover:scale-110 duration-300"
//                       />
//                     </div>
//                   </div>
//                   <Link
//                     href={item.ProjectLink}
//                     className="mt-4 font-medium text-xl text-light text-center group-hover:text-[#EFEFEF] duration-300 block"
//                   >
//                     {item.ProjectTitle}
//                   </Link>
//                   <p className="text-light mt-2 text-center">{item.ProjectDescription}</p>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Manual Navigation Buttons */}
//             <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center z-30 rounded-full hover:bg-gray-600 transition">
//               <AiOutlineLeft className="text-xl" />
//             </button>
//             <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-600 transition">
//               <AiOutlineRight className="text-xl" />
//             </button>
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// };

// export default CoatingPage;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import service from "../../../public/images/service.png";

import TitaniumDioxide1 from "../../../public/images/titanium-dioxide.png";
import TitaniumDioxide2 from "../../../public/images/titanium-dioxide-2.jpg";
import TitaniumDioxide3 from "../../../public/images/titanium-dioxide-3.jpg";


// import SyntheticFibre from '../../../public/images/synthetic-1.png';
import SyntheticFibre2 from "../../../public/images/synthetic-2.jpg";
import SyntheticFibre3 from "../../../public/images/synthetic-3.jpg";

import StyreneButadieneLatex from "../../../public/images/styrene-butadiene-latex.jpg";
import StyreneButadieneLatex2 from "../../../public/images/styrene-butadiene-latex-1.jpg";
// import StyreneButadieneLatex3 from '../../../public/images/styrene-butadiene-latex-3.jpg';

import StyreneAcrylicLatex from "../../../public/images/styrene-acrylic-latex.jpg";
import StyreneAcrylicLatex2 from "../../../public/images/styrene-acrylic-latex-1.jpg";
// import StyreneAcrylicLatex3 from '../../../public/images/styrene-acrylic-latex-3.jpg';

// import EthylCellulose from '../../../public/images/ethyl-cellulose.jpg';
import EthylCellulose2 from "../../../public/images/ethyl-cellulose-2.jpg";
import EthylCellulose3 from "../../../public/images/ethyl-cellulose-3.jpg";

// import MethylCellulose from '../../../public/images/methyl-cellulose.jpg';
import MethylCellulose2 from "../../../public/images/methyl-cellulose-2.jpg";
import MethylCellulose3 from "../../../public/images/methyl-cellulose-3.jpg";

import SodiumAlginate from "../../../public/images/sodium-alginate.jpg";
import SodiumAlginate2 from "../../../public/images/sodium-alginate-2.jpg";
import SodiumAlginate3 from "../../../public/images/sodium-alginate-3.jpg";

import Polox from "../../../public/images/polox.png";

import { StaticImageData } from "next/image";

interface Product {
  ProjectLink: string;
  ProjectImages: StaticImageData[]; // Updated to StaticImageData[]
  ProjectTitle: string;
  ProjectDescription: string;
}

const OurProducts = [
  {
    ProjectLink: "/Products/synthetic-fibre",
    ProjectImages: [SyntheticFibre2, SyntheticFibre3],
    ProjectTitle: "Synthetic Fibre",
    ProjectDescription:
      "Recron 3s patented modified flock fibres provide reinforcement to interior and exterior decorative paints. Their uniform multidirectional dispersion leads to improved adhesion, compatibility and aesthetics",
  },
  {
    ProjectLink: "#",
    ProjectImages: [TitaniumDioxide1, TitaniumDioxide2, TitaniumDioxide3],
    ProjectTitle: "Titanium Dioxide",
    ProjectDescription:
      "It is used for Coating with general purpose,including external & internal architectural coatings,industrial coatings,powder coatings,inks, paint, plastics, masterbatches, paper, PVC & etc. It is a universal pigment that provides opacity, glossiness and brightness,high durability and hiding power. ",
  },
  {
    ProjectLink: "#",
    ProjectImages: [TitaniumDioxide1, TitaniumDioxide2, TitaniumDioxide3],
    ProjectTitle: "TiQ - Replacement of TiO2",
    ProjectDescription:
      "High-performance opacifier to replace TiO2. Superior opacity, brightness, and dispersion with upto 50% cost savings. Compatible with paints, inks, plastics, and coatings.",
  },
  {
    ProjectLink: "#",
    ProjectImages: [StyreneButadieneLatex, StyreneButadieneLatex2],
    ProjectTitle: "Styrene Butadiene Latex",
    ProjectDescription:
      "Styrene-butadiene (SB) latex is a common type of emulsion polymer used in a number of industrial and commercial applications. It is used in Water Based Adhesive, Adhesive Paper, Coating Binder, Paper Board Binder",
  },
  {
    ProjectLink: "#",
    ProjectImages: [StyreneAcrylicLatex, StyreneAcrylicLatex2],
    ProjectTitle: "Styrene Acrylic Latex",
    ProjectDescription:
      "Styrene-Acrylic (SA) latex offers exterior durability and UV resistance, washability ink solvent resistance and moisture vapor transmission in a wide range of applications – from decorative functional nonwovens to specialty paper and packaging.",
  },
  {
    ProjectLink: "#",
    ProjectImages: [EthylCellulose2, EthylCellulose3],
    ProjectTitle: "Ethyl Cellulose",
    ProjectDescription:
      "ETHOCEL™ Premium Ethylcellulose Resins are water-insoluble polymers. Their excellent compatibility allows for their use in a broad range of pharmaceutical applications, from controlled-release matrix systems to microencapsulation. They are also useful as non-aqueous granulation binders and for taste-masking.",
  },
  {
    ProjectLink: "#",
    ProjectImages: [MethylCellulose2, MethylCellulose3],
    ProjectTitle: "Methyl Cellulose (HPMC)",
    ProjectDescription:
      "METHOCEL™ Methylcellulose (MC) and Hydroxypropyl Methylcellulose (HPMC) Water-Soluble Polymers are cellulose ethers that are derived from cellulosic materials such as natural wood or cotton linters. It is used as a Thickener Coating Modifier in various chemistries.",
  },
  {
    ProjectLink: "#",
    ProjectImages: [SodiumAlginate, SodiumAlginate2, SodiumAlginate3],
    ProjectTitle: "Sodium Alginate",
    ProjectDescription:
      "Sodium alginate is a natural, water-soluble polysaccharide derived from brown seaweed. It is used Thickener, stabilizer and emulsifier. Used in many industries, including food, cosmetics, and pharmaceuticals.",
  },
  {
    ProjectLink: "#",
    ProjectImages: [Polox],
    ProjectTitle: "Polyox WSR",
    ProjectDescription:
      "POLYOX™ Water-Soluble Resins (WSR) are thermoplastic, non-ionic polymers with high molecular weight.It exhibits many properties that are typical of other classes of water-soluble polymers such as Lubricity, Thickening and rheology modification, Binding, Film formation, Water retention. Used in Construction Chemical, Ceramics, Inks, Coatings, Lighting, Personal Care and Coolants.",
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.ProjectImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [product.ProjectImages.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-[250px] overflow-hidden shadow-lg border-4 border-gray-200 relative">
        {product.ProjectImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${product.ProjectTitle} image ${index + 1}`}
            width={500} // Increased width for better clarity
            height={500} // Increased height for better clarity
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="mt-4 p-4 flex-grow flex flex-col">
        <Link
          href={product.ProjectLink}
          className="font-medium text-xl text-primary hover:text-primary-dark transition-colors duration-300"
        >
          {product.ProjectTitle}
        </Link>
        <p className="text-text-dark mt-2 text-sm">
          {product.ProjectDescription}
        </p>
      </div>
    </div>
  );
};

const CoatingPage = () => {
  return (
    <div className="bg-background text-text-dark">
      {/* Headline Section with Background Image */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background image with parallax effect */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-700"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1470&auto=format&fit=crop')",
            backgroundAttachment: "fixed",
          }}
        ></div>

        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>

        {/* Animated accent elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-yellow-500 opacity-20 blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div
            className="absolute w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl bottom-10 right-10 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center">
          <div className="text-center max-w-5xl mx-auto">
            {/* <h3 className="text-primaryColor font-bold text-xl mb-4 tracking-wider uppercase">
              Industry Leaders Since 1989
            </h3> */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Advanced Solutions for{" "}
              <span className="text-primaryColor">Masterbatches</span>, Paints,
              Inks and Coatings
            </h1>
          </div>
        </div>
      </section>

      {/* Full-Width Image Section */}

      {/* <section className="relative w-full py-16 px-4 md:px-8 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-yellow-400">OUR SERVICES</h2>
        
        <div className="mb-10">
          <p className="text-base leading-relaxed">
            We at Narsingh Dass Group are relentlessly trying to touch new horizons with our expertise and special skills, constantly striving to improve the functioning of process within the framework of total quality program. ISO: 9001:2000 certification of group companies offers reliability of our services and installations. Our objective is to remain responsive to the needs of our customers and providing the product or service they require. Flexibility and creativity are the basis of our success. Some of the critical services performed by us include -
          </p>
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 py-10">
          {/* Dashed Circle */}
      {/* <div className="absolute w-full h-full max-w-4xl mx-auto inset-0" style={{
            border: '4px dashed #FFD700',
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div> */}

      {/* What we do? and Single solution text */}
      {/* <div className="text-center mb-16">
            <h3 className="text-2xl text-yellow-400 font-bold mb-4">what we do?</h3>
          </div>
          <div className="text-center mt-32">
            <h3 className="text-2xl text-yellow-400 font-bold">single solution</h3>
          </div> */}

      {/* Service Circles */}
      {/* <div className="flex flex-wrap justify-center">
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">training and further education for customers</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">technical services and advice</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">participation at industry fairs</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">logistics - storage & distribution</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">environmental awareness</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">market & product update</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">advice on product selection</p>
            </div>
            <div className="w-36 h-36 rounded-full border-2 border-yellow-400 flex items-center justify-center text-center m-2 sm:m-4">
              <p className="text-sm px-2">regular newsletters</p>
            </div>
          </div>
        </div>
      </div> */}
      {/* </section>   */}

      {/* Products Grid Section */}
      <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-light">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-5 text-primary text-2xl sm:text-3xl leading-8 sm:leading-10 font-medium">
              Our <span className="font-bold uppercase">PRODUCTS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OurProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="relative w-full h-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={service}
              alt="Services Overview"
              layout="fill"
              objectFit="contain"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoatingPage;
