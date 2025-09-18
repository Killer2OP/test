'use client'
import React from 'react'
import Project1 from '../../../../public/images/project-1.png'
import Project2 from '../../../../public/images/project-2.jpg'
import Project3 from '../../../../public/images/project-3.png'
import Project4 from '../../../../public/images/project-4.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const OurProjects = [
    {
        ProjectLink: '/',
        ProjectImg: Project1,
        ProjectTitle: 'RVNL Karnaprayag - Devprayag Tunnel'
    },
    {
        ProjectLink: '/',
        ProjectImg: Project2,
        ProjectTitle: 'Delhi - Amritsar- Katra Expressway',
    },
    {
        ProjectLink: '/',
        ProjectImg: Project3,
        ProjectTitle: 'Delhi - Vadodara Expressway'
    },
    {
        ProjectLink: '/',
        ProjectImg: Project4,
        ProjectTitle: 'Delhi Metro Rail Corporation Phase 4'
    },
];

const ProjectsComponent = () => {
    return (
        <section className='py-10 sm:py-12 md:py-16 lg:py-20 bg-primaryColor'>
            <div className="container mx-auto px-4 md:px-8 ">

                <div className='mb-8 sm:mb-10 md:mb-12 text-center'>
                    <h1 className="mb-3 sm:mb-5 text-Light text-xl sm:text-2xl md:text-3xl leading-7 sm:leading-8 md:leading-10 font-medium">
                        Our <span className="font-bold uppercase">PROJECTS</span>
                    </h1>
                </div>

                <div className="overflow-hidden relative px-4 sm:px-6 md:px-8">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                                <div className="w-full overflow-hidden rounded-[10px] sm:rounded-[15px] md:rounded-[20px]">
                                    <Image
                                        src={item.ProjectImg}
                                        alt={item.ProjectTitle}
                                        width={400}
                                        height={380}
                                        className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[380px] group-hover:scale-110 duration-300 object-cover"
                                    />
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

                    {/* <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white w-8 h-8 flex items-center justify-center z-30 rounded-full hover:bg-gray-600 transition">
                        <AiOutlineLeft className="text-xl" />
                    </button>
                    <button className="custom-next absolute right-0  top-1/2 -translate-y-1/2 bg-gray-800 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-600 transition">
                        <AiOutlineRight className="text-xl" />
                    </button> */}
                </div>

                <div className='w-full text-center'>
                    <button className="mt-6 sm:mt-8 md:mt-10 h-8 sm:h-9 md:h-10 px-4 sm:px-5 md:px-6 bg-Light mx-auto hover:bg-transparent border-2 hover:border-Light border-transparent font-medium sm:font-semibold text-sm sm:text-base text-primaryColor hover:text-Light duration-300 rounded-full">
                        View More
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ProjectsComponent
