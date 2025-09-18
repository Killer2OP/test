'use client'
import React from 'react'
// import Project1 from '../../../../public/images/synthetic-fibre-p.png'
import Project1 from '../../../../public/images/synthetic-fiber-p.png'
import Project2 from '../../../../public/images/cellulose-fiber-pellet-p.png'
import Project3 from '../../../../public/images/steel-1.jpg'
import Project4 from '../../../../public/images/silica-fume.jpg'
import project5 from "../../../../public/images/anti-stripping-agent-p.png"
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const OurProjects = [
    {
        ProjectLink: '/Products/synthetic-fibre',
        ProjectImg: Project1,
        ProjectTitle: 'Synthetic Fibre',
    },
    {
        ProjectLink: '/Products/cellulose-fiber-pellets',
        ProjectImg: Project2,
        ProjectTitle: 'Cellulose Fibre Pellets',
    },
    {
        ProjectLink: '/Products/steel-fibre',
        ProjectImg: Project3,
        ProjectTitle: 'Steel Fibre'
    },
    {
        ProjectLink: '/Products/silica-fume',
        ProjectImg: Project4,
        ProjectTitle: 'Silica Fume'
    },
    {
        ProjectLink: '/Products/anti-stripping-agent',
        ProjectImg: project5,
        ProjectTitle: 'Anti Stripping Agent'
    },
];

const OurProject = () => {
    return (
        <section className='py-10 sm:py-12 md:py-16 lg:py-20 bg-primaryColor'>
            <div className="container mx-auto px-4 md:px-8 ">

                <div className='mb-8 sm:mb-10 md:mb-12 text-center'>
                    <h1 className="mb-3 sm:mb-5 text-Light text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 md:leading-10 font-medium">
                        Our <span className="font-bold uppercase">PRODUCTS</span>
                    </h1>
                </div>

                <div className="overflow-hidden relative px-4 sm:px-6 md:px-8">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }} // Enable Manual Navigation
                        spaceBetween={15}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            480: { slidesPerView: 1, spaceBetween: 15 },
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                        }}
                        className="py-5"
                    >
                        {OurProjects.map((item, index) => (
                            <SwiperSlide key={index} className="group">
                                <div className="w-full flex justify-center">
                                    <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] overflow-hidden rounded-full shadow-lg border-4 border-gray-200">
                                       <Link href={item.ProjectLink}>
                                        <Image
                                            src={item.ProjectImg}
                                            alt={item.ProjectTitle}
                                            width={250}
                                            height={250}
                                            className="w-full h-full object-cover group-hover:scale-110 duration-300"
                                        />
                                        </Link>
                                    </div>
                                </div>
                                <Link
                                    href={item.ProjectLink}
                                    className="mt-3 sm:mt-4 font-medium text-base sm:text-lg md:text-xl text-Light text-center group-hover:text-[#EFEFEF] duration-300 block"
                                >
                                    {item.ProjectTitle}
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Manual Navigation Buttons */}
                    <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center z-30 rounded-full hover:bg-gray-600 transition">
                        <AiOutlineLeft className="text-base sm:text-xl" />
                    </button>
                    <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-gray-600 transition">
                        <AiOutlineRight className="text-base sm:text-xl" />
                    </button>
                </div>


            </div>
        </section>
    )
}

export default OurProject;
