'use client'
import React, { useState } from 'react'
import tabBg from '../../../../public/images/pioneer.png'
import Image from 'next/image'

const tabs = [
    {
        id: 1,
        label: "Overview",
        content:
            "The construction industry plays a vital role in shaping the physical and economic landscape of our world. It involves the planning, design, development. The construction industry plays a vital role in shaping the physical and economic landscape of our world. It involves the planning, design, development The construction industry plays a vital role in shaping the physical and economic landscape of our world. It involves the planning, design, development",
    },
    {
        id: 2,
        label: "Services",
        content:
            "Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat magnis ut sem conubia, bibendum rhoncus aliquam elementum primis. Habitant vel himenaeos venenatis in curabitur lacus mauris id nullam sed pharetra, platea a per condimentum rutrum turpis quam pulvinar maecenas interdum. Nunc vulputate congue ligula commodo nam, leo sociis proin fames.",
    },
    {
        id: 3,
        label: "Contact",
        content:
            "Get in touch with us to learn more about how we can bring your construction ideas to life. We are here to guide you through every step of your journey.",
    },
    {
        id: 4,
        label: "More Info",
        content:
            "Get in touch with us to learn more about how we can bring your construction ideas to life. We are here to guide you through every step of your journey.",
    },

];

const Section3 = () => {

    const [activeTab, setActiveTab] = useState(1)

    return (
        <div className="bg-primaryColor py-12 sm:py-14 md:py-16 lg:py-20">
            <div className="container mx-auto px-2 sm:px-0 lg:px-8">
                <div className="flex flex-wrap gap-16 md:gap-0 flex-col-reverse md:flex-row">
                    {/* Image Section */}
                    <div className="w-full  md:w-5/12 mb-8 md:mb-0 flex items-center justify-center">
                        <div className='relative w-3/4 sm:w-2/3 md:w-3/4 lg:w-3/5 text-center mx-auto'>
                            <span className=' size-40 md:size-48 xl:size-52 absolute -top-2 -right-2 md:-top-3 lg:-top-4 xl:-top-5 md:-right-3 lg:-right-4 xl:-right-5 bg-Light rounded-[20px]'></span>

                            <Image src={tabBg} alt='bg' className='h-full mx-auto relative z-10' />

                            <span className='size-40 md:size-48 lg:size-52 absolute md:-bottom-3 lg:-bottom-5  -bottom-2 -left-2 md:-left-3 lg:-left-5 bg-Light rounded-[20px]'></span>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-7/12 text-center md:text-left">
                        <h1 className="mb-5 text-2xl text-Light sm:text-3xl leading-8 sm:leading-10 font-medium">
                            Pioneering Excellence in
                            <span className="block">
                                <span className="font-bold uppercase">Construction</span>
                            </span>
                        </h1>
                        <div className='overflow-x-auto'>
                            <div className="max-[379px]:w-[450px] sm:w-full">
                                <div className="mb-6 w-full flex justify-center sm:justify-start gap-2 md:gap-2 lg:gap-6">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            className={`max-[374px]:px-3 px-3 py-2 sm:px-4 sm:py-2 rounded-full h-8 sm:h-full text-base leading-3 sm:leading-4 font-semibold duration-300 border-2  border-transparent ${activeTab === tab.id
                                                ? "text-primaryColor bg-Light"
                                                : "text-Light hover:border-2 hover:border-Light"
                                                }`}
                                            onClick={() => setActiveTab(tab.id)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <p className="text-base lg:text-lg leading-[22px] sm:leading-[25px] text-Light">
                            {tabs.find((tab) => tab.id === activeTab)?.content}
                        </p>

                        <button className="mt-6 h-10 px-6 bg-Light hover:bg-transparent border-2 hover:border-Light border-transparent  font-semibold text-primaryColor hover:text-Light duration-300 rounded-full">
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Section3
