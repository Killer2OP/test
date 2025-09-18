"use client"
import React from 'react'
import Image from 'next/image';
import { useRouter } from "next/navigation";

// Updated data with placeholder images related to each industry
const Industriedata = [
    {
        image: "https://images.unsplash.com/photo-1690631058550-2524e7905d29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
        title: "Building",
        href:"/infrastructure",
    },
    {
        image: "https://images.unsplash.com/photo-1708358131308-c2dad0046a73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEluZnJhc3RydWN0dXJlfGVufDB8fDB8fHww",
        title: "Infrastructure",
        href:"/infrastructure",
    },
    {
        image: "https://images.unsplash.com/photo-1638461800418-a54f284d72cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fENvYXRpbmclMjBhbmQlMjBNYXN0ZXJiYXRjaCUyMFNvbHV0aW9uc3xlbnwwfHwwfHx8MA%3D%3D",
        title: "Coating and Masterbatch Solutions",
        href:"/Coating",
    },
    {
        image: "https://images.unsplash.com/photo-1713433977943-882fae1862a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc5fHxQYXBlciUyMCUyNiUyMFBhY2thZ2luZ3xlbnwwfHwwfHx8MA%3D%3D",
        title: "Paper & Packaging",
        href:"https://indiapaper.com/",
    }
];

const Industrie = () => {
    const router = useRouter();
    return (
        <section className='py-12 sm:py-14 md:py-16 lg:py-20'>
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Heading */}
                <div className='mb-11 md:mb-12 text-center'>
                    <h3 className='text-primaryColor text-lg leading-6 mb-2 font-medium'>Our Industries</h3>
                    <h1 className="mb-5 text-Dark text-2xl sm:text-3xl leading-8 sm:leading-10 font-medium">
                        <span className="font-bold text-primaryColor uppercase">Industries</span> We Serve
                    </h1>
                </div>

                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Industriedata.map((industry, index) => (
                        <div 
                            key={index} 
                            onClick={() => router.push(industry.href)}
                            className='w-full cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col'
                        >
                            {/* Full-width image at the top */}
                            <div className='w-full h-48 relative'>
                                <Image 
                                    src={industry.image}
                                    alt={`${industry.title} image`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>

                            {/* Content area */}
                            <div className='p-6 flex flex-col flex-grow'>
                                {/* Title */}
                                <h2 className='text-xl md:text-2xl font-semibold mb-2'>{industry.title}</h2>
                                
                                {/* Spacer to push the "Find more" to bottom */}
                                <div className='flex-grow'></div>
                                
                                {/* Find more link */}
                                <div className='mt-4 text-primaryColor font-medium text-lg hover:underline'>
                                    Find more &gt;
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Industrie
