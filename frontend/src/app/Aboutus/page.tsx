"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Trophy, Users, ChevronRight } from "lucide-react";
import mapImg from "../../../public/images/contact.png";
import OurProject from "../component/Home/OurProject";
import Logo from "../../../public/images/logo.png";
import Nature from "../../../public/images/about-hero.png";

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);
  const [aboutData, setAboutData] = useState<any>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/content/about/about", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setAboutData(json?.content || null);
        }
      } catch (e) {
        // fallback to static content
      }
    }
    load();
  }, []);
  const images = [mapImg, mapImg];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-[var(--secondary)]/10 to-[var(--background)]">
        <div className="container mx-auto px-6 pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-primaryColor text-3xl font-semibold mb-3">
                About Us
              </h3>
              {aboutData?.companyInfo ? (
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {aboutData.companyInfo}
                </p>
              ) : (
                <>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Narsingh Dass Group is a multifarious trading group, renowned
                    and much admired in the paper industry. With its core business
                    aimed to create an efficient flow of goods between manufacturers
                    and consumers of
                    <span className="font-bold"> {" "}paper, paperboard & related products</span>, the group has risen
                    consistently to be one of the most trusted business houses of its kind in India.
                  </p>
                </>
              )}

              {aboutData?.history ? (
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {aboutData.history}
                </p>
              ) : (
                <>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    With a corporate philosophy based on Knowledge Partnership, Narsingh Dass Group follows a guiding
                    principle of <span className="font-bold"> Customers Grow, We Grow</span>. With this belief, the group has
                    enjoyed consistent growth and expansion over the years and has transformed itself from a trading
                    company to a complete <span className="font-bold"> Solution Marketing Group</span>.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Our Business centers are - Narsingh Dass & Co., Narsingh Dass (Co. Pvt. Ltd.), India Paper Products
                    / Sudhir Papers / Synchem, Shivananda Marketing Pvt. Ltd., Sudhir Papers Limited.
                  </p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={images[currentImage]}
                alt="Modern Construction Project"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <p
              className="text-gray-700 text-lg leading-relaxed mb-4"
            >
              <span className="font-bold"> Shivananda Marketing Pvt. Ltd.</span>
              was established in 1989 and has since been a pioneer in
              implementing new technologies and adopting advanced materials in
              emerging and growing sectors. With nearly three and a half decades
              of experience, we have become one of the leading names in fiber
              reinforcement technology and building materials in the Indian
              infrastructure ecosystem.
            </p>

            <p
              className="text-gray-700 text-lg leading-relaxed mb-4"
            >
              We bring innovative product solutions, new formulations, on-site
              technical support, and end-to-end solutions for the construction
              industry. Our business operates in almost all the Indian states
              while reaching out to global clients in most of the nations in the
              Indian subcontinent, SEA, and the Middle East. In the future, we
              aim to reach out to more countries in the European and American
              markets.
            </p>

            <p
              className="text-gray-700 text-lg leading-relaxed mb-4"
            >
              Our specialized and modern warehouse facilities are equipped with
              adequate staff to ensure that our clients can meet their
              timelines. To meet industrial standards, we perform extensive
              quality testing and quality assurance on all our products.
            </p>

            <p
              className="text-gray-700 text-lg leading-relaxed mb-4"
            >
              Our objective is to remain responsive to the needs of our
              customers and provide the product or service they require.
              Flexibility and creativity are the basis of our success. Our
              pioneering spirit enables us to explore, develop, and drive
              innovations that make a positive difference in people’s lives.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { number: "35+", text: "Years of Excellence", icon: Trophy },
              { number: "250+", text: "Projects Delivered", icon: Building2 },
              { number: "98%", text: "Client Retention", icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-xl bg-[var(--secondary)]/5 hover:bg-[var(--secondary)]/10 transition-all hover:shadow-lg"
              >
                <stat.icon className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-[var(--primary)]">
                  {stat.number}
                </h3>
                <p className="text-[var(--text-body)] font-medium">
                  {stat.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 ml-20 text-center text-[var(--foreground)]">
            About Our Logo
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Logo */}
            <div className="w-full md:w-2/5 flex justify-center">
              <Image
                src={Logo}
                alt="Company Logo"
                className="w-48 h-48 md:w-64 md:h-64 object-contain"
                priority
              />
            </div>

            {/* Logo description */}
            <div className="w-full md:w-3/5">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Represents a Paper Fan which denotes the different group
                  activities
                </p>

                <p className="text-gray-700">
                  The wings, unattached, converge to one focal point, the
                  Consumer!
                </p>

                <p className="text-gray-700">
                  The changing colors and the circular movement of the fan
                  reflect the dynamism and continuous growth of the group.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3"></div>

          {/* <div className="md:w-1/3 flex justify-center md:justify-end">
      <img 
        src={logo} 
        alt="Company Logo" 
        className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto"
      />
    </div> */}
        </div>

        <div className="container mx-auto px-6 mt-6"></div>
      </section>

      <section className="py-24 bg-[var(--primary)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-white">
                Our Vision &<span className="block mt-2">Core Principles</span>
              </h2>
              <p className="text-white/90 text-lg">
                We are committed to pushing the boundaries of excellence while
                maintaining unwavering dedication to sustainability and
                innovation. Our approach combines cutting-edge technology with
                time-tested craftsmanship.
              </p>
              <div className="space-y-6">
                {["Trust", "Togetherness", "Excellence", "Compassion"].map(
                  (value, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <ChevronRight className="text-white w-6 h-6" />
                      <span className="text-white text-lg font-medium">
                        {value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
                alt="Our Vision in Action"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* <ServicesSection /> */}

      <OurProject />

      <section className="py-4 bg-[var(--secondary)]/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">
                Get in Touch
                {/* <span className="text-[var(--primary)] block mt-2">
                  Let us Build Something Great
                </span> */}
              </h2>

              <p className="text-[var(--text-body)]  text-gray-700 text-lg">
                Contact us today and let’s bring it to
                life.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-[var(--primary)] text-2xl">📞</span>
                  <div className="flex flex-col">
                    <a
                      href="tel:9873173214"
                      className="text-lg text-gray-700 text-[var(--text-body)] hover:text-[var(--primary)] transition"
                    >
                      +91 9873173214
                    </a>
                    <a
                      href="tel:9205992676"
                      className="text-lg text-gray-700 text-[var(--text-body)] hover:text-[var(--primary)] transition"
                    >
                      +91 9205992676
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-[var(--primary)] text-2xl">📧</span>
                  <div className="flex flex-col">
                    <a
                      href="mailto:material@narsinghdass.com"
                      className="text-lg text-gray-700 text-[var(--text-body)] hover:text-[var(--primary)] transition"
                    >
                      material@narsinghdass.com
                    </a>
                    <a
                      href="mailto:smpl@narsinghdass.com"
                      className="text-lg text-gray-700 text-[var(--text-body)] hover:text-[var(--primary)] transition"
                    >
                      smpl@narsinghdass.com
                    </a>
                  </div>
                </div>
              </div>

              <button className="bg-[var(--primary)] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[var(--primary)]/90 transition-colors mt-6">
                Contact Us
              </button>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src={Nature}
                alt="Contact Image"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
