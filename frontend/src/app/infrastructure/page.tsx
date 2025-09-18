import React from 'react'
import Image from 'next/image';
import construction from "../../../public/images/construction.jpg"
import Applications from '../component/Home/Application'
import OurProject from '../component/Home/OurProject'
import OurClients from '../component/Home/OurClient'
import ProjectsComponent from "../component/Home/Projects"

const infrastructure = () => {
  return (
    <div className="overflow-x-hidden">
         <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center bg-gradient-to-b from-[var(--secondary)]/10 to-[var(--background)]">
        <div className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1 mt-8 md:mt-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Pioneering Excellence in Construction
              </h1>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
                We specialise in road construction and urban infra technologies. We provide quality knowledge, technical support and on site assistance to all our clients as they continue to build sustainable infrastructure. Working with us gives you access to proven high-quality products for all concrete and asphalt applications, a highly skilled team dedicated to our customers, and technical support based on local specifications and guidelines.              </p>
            </div>
            <div
              className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl order-1 md:order-2"
            >
              <Image
                src={construction}
                alt="Modern Construction Project"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
        <div className="mt-8 sm:mt-12 md:mt-16">
          <Applications />
        </div>
        <OurProject />
        <OurClients />
        <ProjectsComponent />
    </div>
  )
}

export default infrastructure
