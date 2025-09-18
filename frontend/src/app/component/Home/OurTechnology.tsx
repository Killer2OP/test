"use client";
import React from "react";
import blog1 from "../../../../public/images/SMA-mix.jpg";
// import blog2 from "../../../../public/images/SMA-mix.jpg";
import blog3 from "../../../../public/images/self-concrete-bgImage.jpg";
import blog4 from "../../../../public/images/steel-bgImage.png";
// import blog5 from "../../../../public/images/fibre-reinforce.jpg";
// import blog6 from "../../../../public/images/Self-compacting-Concrete-SCC.jpg";
import Image from "next/image";
import Link from "next/link";

const BlogsData = [
  {
    BlogLink: "/Blog/stone-matrix-asphalt",
    BlogImg: blog1,
    BlogTitle: "Stone Matrix Asphalt (SMA)",
    BlogDate: "March 1, 2023",
    BlogDesc:
      "Stone Matrix Asphalt (SMA) is a gap-graded mix that provides enhanced durability and rut resistance for high-traffic roads. Its stone-on-stone contact structure, held together by a rich mastic of bitumen and filler, offers superior performance against deformation, cracking, and weathering.",
    BlogBtn: "Read More",
  },
  // {
  //   BlogLink: "/Blog/sma-asphalt-mix-design",
  //   BlogImg: blog2,
  //   BlogTitle: "SMA Mix Design",
  //   BlogDate: "July 19, 2023",
  //   BlogDesc:
  //     "Proper SMA mix design requires careful selection of aggregates, binders, and stabilizing additives. The optimized design balances stone skeleton for strength, mastic for durability, and voids for proper drainage. Our advanced mix designs exceed industry standards for performance and longevity.",
  //   BlogBtn: "Read More",
  // },
  {
    BlogLink: "/Blog/silica-fume-concrete",
    BlogImg: blog3,
    BlogTitle: "Silica Fume Concrete (SFC)",
    BlogDate: "April 1, 2023",
    BlogDesc:
      "Silica fume dramatically improves concrete's compressive strength and durability. As an ultrafine pozzolanic material, it fills microscopic voids and enhances the cement paste-aggregate bond. The result is significantly reduced permeability and superior resistance to chemical attack from chlorides and sulfates.",
    BlogBtn: "Read More",
  },
  {
    BlogLink: "/Blog/steel-fibre-reinforced-concrete",
    BlogImg: blog4,
    BlogTitle: "Steel Fibre Reinforced Concrete (SFRC)",
    BlogDate: "May 1, 2023",
    BlogDesc:
      "Steel Fibre Reinforced Concrete (SFRC) incorporates high-tensile steel fibres to enhance flexural strength and crack resistance. These fibres distribute stresses uniformly throughout the concrete matrix, dramatically improving toughness, impact resistance, and fatigue performance in demanding infrastructure applications.",
    BlogBtn: "Read More",
  }
];

const OurTechnology = () => {
  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-8 ">
        <div className="mb-12 text-center">
          <h3 className="text-primaryColor text-lg leading-6 mb-3 font-semibold">
            Technologies
          </h3>
          <h1 className="mb-5 text-Dark text-2xl sm:text-3xl leading-8 sm:leading-10 font-medium">
            Technologies 
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BlogsData.map((BlogItems, index) => (
            <div
              key={index}
              className="rounded-[20px] p-5 pb-9 bg-[#EFEFEF] flex flex-col h-full"
            >
              {/* Image Wrapper */}
              <div className="w-full h-[200px] overflow-hidden rounded-[20px]">
                <Link href={BlogItems.BlogLink}>
                  <Image
                    src={BlogItems.BlogImg}
                    alt={BlogItems.BlogTitle}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

              {/* Text Content */}
              <div className="text-Dark flex flex-col flex-grow">
                <div className="text-lg font-normal my-3 ">
                  {BlogItems.BlogDate}
                </div>
                <Link href={BlogItems.BlogLink}>
                  <h2 className="text-2xl md:text-xl line-clamp-2 text-ellipsis font-semibold mb-3">
                    {BlogItems.BlogTitle}
                  </h2>
                </Link>
                <p className="text-base line-clamp-3 text-ellipsis flex-grow">
                  {BlogItems.BlogDesc}
                </p>

                {/* Button Stays at Bottom */}
                <Link href={BlogItems.BlogLink} legacyBehavior>
                  <a className="py-2 block mt-3 w-fit px-6 bg-transparent hover:bg-Light border-2 hover:border-Light border-primaryColor font-semibold text-primaryColor duration-300 rounded-full">
                    {BlogItems.BlogBtn}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTechnology;
