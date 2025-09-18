"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { getTopicImage } from "@/utils/unsplashImages";

import { Blog } from '@/app/types/blog';

// Function to fetch blog data from API
async function fetchBlogData(slug: string) {
  try {
    const response = await fetch(`/api/blogs/${slug}`, {
      cache: 'no-store' // Don't cache the response
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return { blog: null, relatedPosts: [], publishDate: "", readTime: 0 };
  }
}

// Client component for rendering
export default function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Use React.use() to unwrap the params Promise in Next.js
  const resolvedParams = React.use(params);
  const { slug } = resolvedParams;

  // Refs for sections
  const overviewRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  // State for blog data
  const [blogData, setBlogData] = React.useState<{
    blog: Blog | null;
    relatedPosts: Blog[];
    publishDate: string;
    readTime: number;
  }>({ blog: null, relatedPosts: [], publishDate: "", readTime: 0 });

  // Get Unsplash topic image
  const topicImage = getTopicImage(slug);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogData(slug);
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, [slug]);

  // Helper function for scrolling to sections - used in event handlers
  // Commented out as it's not currently used
  // const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
  //   if (ref && ref.current) {
  //     ref.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  // Track active section for styling without updating URL
  useEffect(() => {
    const handleScroll = () => {
      // Check which section is in view
      const isInView = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref || !ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      };

      // We could use this to update active section styling if needed
      // but we're not updating the URL anymore
      if (isInView(overviewRef)) {
        // Overview is active
      }
      else if (isInView(advantagesRef)) {
        // Advantages is active
      }
      else if (isInView(conclusionRef)) {
        // Conclusion is active
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { blog, relatedPosts, publishDate, readTime } = blogData;

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="relative w-full h-96">
        <Image
          src={blog.bgImage}
          alt={blog.name}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/Blog"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to all articles
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
              {blog.name}
            </h1>
            <div className="flex items-center mt-6 text-white/80">
              <div className="flex items-center mr-6">
                <Calendar size={16} className="mr-2" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#FF7069]">
              Home
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <Link href="/Blog" className="hover:text-[#FF7069]">
              Blog
            </Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-900 font-medium truncate">
              {blog.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:gap-12">
          {/* Article Content */}
          <div className="lg:w-2/3">
            {/* Description/Summary */}
            <div className="mb-8 text-lg md:text-xl text-gray-700 font-medium italic">
              {blog.description}
            </div>


            <div className="relative w-full h-96 md:h-[500px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={blog.image || "/api/placeholder/1200/800"}
                alt={blog.name}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <div ref={overviewRef}>
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900">
                  Overview
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <ReactMarkdown>
                    {blog.overview}
                  </ReactMarkdown>
                </div>
              </div>



              {/* Topic image after overview */}
              <figure className="my-10">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={topicImage}
                    alt={`${blog.name} - Visual representation`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-center text-gray-500 italic">
                  {blog.slug === 'stone-matrix-asphalt' && 'Stone Matrix Asphalt application showing the textured surface and aggregate structure'}
                  {blog.slug === 'sma-asphalt-mix-design' && 'Close-up view of SMA mix design showing the gap-graded aggregate structure'}
                  {blog.slug === 'steel-fibre-reinforced-concrete' && 'Steel fibers distributed throughout concrete matrix providing three-dimensional reinforcement'}
                  {blog.slug === 'fibre-reinforced-concrete' && 'Synthetic fibers integrated into concrete mix to control cracking and enhance durability'}
                  {blog.slug === 'silica-fume-concrete' && 'Silica fume concrete showing enhanced strength and durability properties'}
                </figcaption>
              </figure>

              {/* SMA Asphalt Content Section - After Image */}
              {blog.slug === 'stone-matrix-asphalt' && (
                <div className="mt-8 mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">The content of SMA Asphalt:</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Coarse Aggregate Skeleton</li>
                    <li>Matrix SMA, comprising the binder, filler, fine aggregate, and stabilizing asphalt additive</li>
                    <li>Voids present within the SMA asphalt mix</li>
                  </ul>
                  <p className="text-gray-700">
                    Imagine a solid stone-on-stone framework that doesn&apos;t just add stability but also amps up mixture strength.
                    Plus, there&apos;s a hardy mortar binder in the mix, working hand in hand with stabilizing agents like cellulose
                    fibers and asphalt modifiers to ensure high durability.
                  </p>

                  <div className="relative w-full h-[300px] md:h-[400px] my-6 rounded-lg overflow-hidden">
                    <Image
                      src="/images/SMA-Asphalt-img.png"
                      alt="Comparison between Stone Matrix Asphalt (SMA) and Conventional Hot Mix Asphalt (HMA)"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* SMA Applications Section */}
              {blog.slug === 'stone-matrix-asphalt' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Applications
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">
                      Stone Matrix Asphalt is particularly well-suited for the following applications:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Flexible Pavements
                        </h3>
                        <p className="text-gray-700">
                          SMA provides an excellent wearing course for flexible pavement structures, offering superior durability and performance compared to conventional asphalt mixes.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Motorways and Expressways
                        </h3>
                        <p className="text-gray-700">
                          The high-performance characteristics of SMA make it ideal for high-speed, high-volume roadways where durability and safety are paramount concerns.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Heavy Traffic State Roads
                        </h3>
                        <p className="text-gray-700">
                          SMA&apos;s exceptional resistance to rutting and deformation makes it particularly valuable for roads subjected to heavy commercial vehicle traffic.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Runways and Taxiways
                        </h3>
                        <p className="text-gray-700">
                          The durability and skid resistance of SMA make it suitable for airport pavements that must withstand the high stresses of aircraft operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}



              {/* SMA Advantages Section */}
              {blog.slug === 'stone-matrix-asphalt' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Key Advantages of SMA
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">
                      Stone Matrix Asphalt is suitable for a wide range of advantages, including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Enhanced Durability
                        </h3>
                        <p className="text-gray-700">
                          The incorporation of cellulose fibers into SMA asphalt significantly improves the overall durability of the asphalt road, extending the pavement&apos;s lifespan and reducing maintenance costs.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Rut Resistance
                        </h3>
                        <p className="text-gray-700">
                          SMA asphalt&apos;s unique composition provides exceptional resistance against rutting, ensuring a smooth and stable road surface even under high traffic volumes.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Improved Skid Resistance
                        </h3>
                        <p className="text-gray-700">
                          Cellulose fibers enhance pavement&apos;s texture, contributing to better skid resistance and improved safety for drivers.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Cracking
                        </h3>
                        <p className="text-gray-700">
                          The presence of cellulose fibers minimizes the occurrence of cracks, reducing the risk of water infiltration and subsequent damage caused by freeze-thaw cycles.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Environmentally Friendly
                        </h3>
                        <p className="text-gray-700">
                          Cellulose fibers used in SMA asphalt are derived from sustainable and renewable sources, making it a sustainable choice for road mastic construction.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Cost-Effective
                        </h3>
                        <p className="text-gray-700">
                          The enhanced durability and reduced maintenance requirements of mastic asphalt results in long-term cost savings for road authorities and project developers.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Efficient Maintenance Pace
                        </h3>
                        <p className="text-gray-700">
                          Thanks to SMA asphalt thin-layer construction, the ease of planning and replacement is a distinct advantage. This translates to minimal traffic disruption during maintenance efforts.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Good Noise Reduction
                        </h3>
                        <p className="text-gray-700">
                          SMA provides excellent noise reduction properties, creating quieter road surfaces that benefit both drivers and nearby communities.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full h-[300px] md:h-[400px] my-6 rounded-lg overflow-hidden">
                    <Image
                      src="/images/sma-gallery-two.png"
                      alt="Comparison between Stone Matrix Asphalt (SMA) and Conventional Hot Mix Asphalt (HMA)"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* History Section for Steel Fibre Reinforced Concrete */}
              {blog.slug === 'steel-fibre-reinforced-concrete' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    History of Fibre Reinforcement
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700">
                      The concept of using fibres as reinforcement is not new. Fibres have been used as reinforcement since ancient times. Historically, horsehair was used in mortar and straw in mudbricks. In the 1900s, asbestos fibres were used in concrete. In the 1950s, the concept of composite materials came into being and fibre-reinforced concrete was one of the topics of interest. Once the health risks associated with asbestos were discovered, there was a need to find a replacement for the substance in concrete and other building materials. By the 1960s, steel, glass (GFRC), and synthetic (such as polypropylene) fibres were used in concrete. Research into new fibre-reinforced concretes continues today.
                    </p>
                  </div>
                </div>
              )}

              {/* Advantages Section */}
              {blog.advantages && blog.advantages.length > 0 && (
                <div className="mt-12" ref={advantagesRef}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Additional Performance Benefits
                  </h2>

                  {blog.advantagesImg && (
                    <div className="relative w-full h-[17.6rem] md:h-[22rem] mb-8 rounded-xl overflow-hidden">
                      <Image
                        src={blog.advantagesImg}
                        alt="Performance Benefits"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl object-cover w-full h-full"
                      />
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">
                      Beyond the primary benefits, Stone Matrix Asphalt provides several additional performance advantages that make it an exceptional choice for modern pavement applications:
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                      {blog.advantages.map(
                        (
                          advantage: { title: string; description: string },
                          index: number
                        ) => (
                          <div key={index} className="border-l-4 border-gray-300 pl-4">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {advantage.title}
                            </h3>
                            <p className="text-gray-700">
                              {advantage.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <p className="text-gray-700 mt-6">
                      These performance benefits collectively contribute to making SMA a superior choice for high-traffic roadways, intersections, and other demanding pavement applications.
                    </p>
                  </div>
                </div>
              )}
              {/* SFRC Advantages Section */}
              {blog.slug === 'steel-fibre-reinforced-concrete' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Advantages
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">
                      Steel Fibre Reinforced Concrete offers numerous advantages that make it an excellent choice for modern construction projects:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Increased Load-Bearing Capacity
                        </h3>
                        <p className="text-gray-700">
                          Steel fibres significantly enhance the load-bearing capacity of concrete structures, allowing them to withstand greater stresses and loads.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Concrete Slab Thickness
                        </h3>
                        <p className="text-gray-700">
                          The enhanced strength properties allow for thinner concrete slabs without compromising structural integrity, saving material costs.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Maintained Load Capacity Despite Cracks
                        </h3>
                        <p className="text-gray-700">
                          Even when cracks develop, SFRC maintains its load-bearing capacity as steel fibres effectively bridge cracks and prevent their propagation.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Increased Durability
                        </h3>
                        <p className="text-gray-700">
                          SFRC exhibits superior durability compared to conventional concrete, resulting in structures with longer service lives and reduced maintenance needs.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Low Maintenance Costs
                        </h3>
                        <p className="text-gray-700">
                          The extended service life and reduced cracking lead to significantly lower maintenance costs over the lifetime of the structure.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Improved Flexural Properties
                        </h3>
                        <p className="text-gray-700">
                          Steel fibres enhance the flexural strength and ductility of concrete, allowing it to bend slightly under load without immediate failure.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Water and Chemical Absorption
                        </h3>
                        <p className="text-gray-700">
                          SFRC has lower permeability, reducing the absorption of water, chemicals, and other potentially harmful substances.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Fast-Track Construction Schedule
                        </h3>
                        <p className="text-gray-700">
                          SFRC can be used in fast-track construction projects, reducing overall project timelines and allowing for earlier occupancy or use.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Fewer Joints Required
                        </h3>
                        <p className="text-gray-700">
                          The enhanced crack resistance allows for greater spacing between joints, simplifying construction and reducing potential weak points.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Site Labor
                        </h3>
                        <p className="text-gray-700">
                          Eliminating or reducing the need for conventional steel reinforcement significantly decreases on-site labor requirements and associated costs.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Economical Designs
                        </h3>
                        <p className="text-gray-700">
                          The combination of material savings, reduced labor, and faster construction leads to more economical project designs and lower overall costs.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Increased Impact and Abrasion Resistance
                        </h3>
                        <p className="text-gray-700">
                          SFRC provides superior resistance to impact loads and surface abrasion, making it ideal for high-traffic areas and industrial floors.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Even Fibre Distribution
                        </h3>
                        <p className="text-gray-700">
                          Steel fibres are evenly distributed throughout the concrete matrix, providing consistent tensile strength that can be specified according to project requirements.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Improved Surface Quality
                        </h3>
                        <p className="text-gray-700">
                          SFRC typically produces a tougher surface with fewer bleed holes, resulting in better concrete quality and improved aesthetics.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Greater Savings for Crack Control
                        </h3>
                        <p className="text-gray-700">
                          Projects requiring extensive crack control systems will see even greater cost savings when using SFRC instead of conventional reinforcement methods.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          No Heavy Lifting Required
                        </h3>
                        <p className="text-gray-700">
                          Since reinforcement is incorporated directly into the concrete mix, there&apos;s no need for heavy lifting of rebar cages, improving site safety and efficiency.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Corrosion-Free Surface Finish
                        </h3>
                        <p className="text-gray-700">
                          SFRC provides a corrosion-free surface finish, eliminating issues like rust staining and surface spalling that can occur with conventional reinforcement.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Permeability
                        </h3>
                        <p className="text-gray-700">
                          By controlling micro-cracks, SFRC reduces the permeability of concrete, enhancing its resistance to water and chemical penetration.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          No Corner Casting Deformation
                        </h3>
                        <p className="text-gray-700">
                          SFRC prevents deformation of corner castings, maintaining structural integrity at these critical points and improving overall performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Steel Fiber Cross-Section Section */}
              {/* {blog.slug === 'steel-fibre-reinforced-concrete' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Steel Fibre Design Features
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="flex flex-col md:flex-row gap-8 mb-6">
                      <div className="md:w-1/2 relative h-[300px] rounded-lg overflow-hidden">
                        <Image
                          src="/images/steel-fiber-cross-section.jpg"
                          alt="Triangular cross-section of steel fibers showing more surface area for bonding"
                          layout="fill"
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Optimized Cross-Section Design
                        </h3>
                        <p className="text-gray-700 mb-4">
                          Our steel fibres feature a unique triangular cross-section which gives 40% more surface area for bonding compared to other shapes. This innovative design significantly enhances the bond between the steel fibres and the concrete matrix.
                        </p>
                        <p className="text-gray-700">
                          The fibres are also designed as flat fibre strips dimensionally straight and uniformly dispersed, so as to safeguard against balling, nesting and bleeding. This ensures optimal performance and consistent reinforcement throughout the concrete structure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )} */}

              {/* SFRC Dosing Method Section */}
              {blog.slug === 'steel-fibre-reinforced-concrete' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Dosing Method of Steel Fibres
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Adding Steel Fibres into Ready Mix Concrete
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Steel fibres can be added into the ready-mix truck at either the batching plant or on the job site. Some ready-mix suppliers have suitable facilities for loading the steel fibres into the mixer at the batching plant. Where these do not exist, the fibres can be added at the batching plant using conveyor belts or &apos;blast&apos; machines similar to those used for adding the fibres on site.
                    </p>
                    <p className="text-gray-700 mb-4">
                      When using conveyor belts it is important to remember that the fibres land freely in the concrete and are then mixed throughout the concrete using proper mixing procedures. Blast Machines have the advantage of spreading the fibres at a consistent high velocity into the concrete mix giving an even distribution of the steel fibres into each load of concrete.
                    </p>
                    <p className="text-gray-700">
                      When steel fibres are added at the batching plant or on the job site without the use of blast machines, fibres may &quot;ball&quot; up in clumps. This is the result of an uneven distribution of the fibres in the concrete and requires additional mixing time to correct.
                    </p>
                  </div>
                </div>
              )}


              {/* Fourth image already added above */}

              {/* Challenges Section - Commented out as requested */}
              {/* {blog.challenges?.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Challenges
                  </h2>
                  <ul className="space-y-4">
                    {blog.challenges.map(
                      (
                        challenge: { title: string; description: string },
                        index: number
                      ) => (
                        <li
                          key={index}
                          className="p-4 bg-red-100 rounded-lg shadow-md"
                        >
                          <h3 className="text-lg font-semibold text-gray-900">
                            {challenge.title}
                          </h3>
                          <p className="text-gray-700">
                            {challenge.description}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )} */}

              {/* Silica Fume Manufacturing and Working Process */}
              {blog.slug === 'silica-fume-concrete' && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    How it is made?
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-6">
                      Silicon metal and alloys are produced in electric furnaces as shown in this photo. The raw materials are quartz, coal, and woodchips. The smoke that results from furnace operation is collected and sold as silica fume, rather than being landfilled. Perhaps the most important use of this material is as a mineral admixture in concrete.
                    </p>

                    <div className="relative w-full h-[300px] md:h-[400px] my-6 rounded-lg overflow-hidden">
                      <Image
                        src="/images/silica-fume-img.png"
                        alt="Electric furnace producing silicon metal with silica fume as a byproduct"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                      />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                      How does Silica Fume work in Concrete?
                    </h2>
                    <p className="text-gray-700 mb-4">
                      After Portland cement is mixed with water, they begin &quot;hydrating&quot; or responding to each other. During this process, a chemical reaction forms two chemical molecules:
                    </p>
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                      <li className="text-gray-700">
                        <span className="font-semibold">Calcium Silicate Hydrate (CSH)</span>, which is the main compound responsible for crystallization.
                      </li>
                      <li className="text-gray-700">
                        <span className="font-semibold">Calcium Hydroxide (CH)</span>, which is a by-product of the reaction, also known as "free lime". This compound is responsible for nothing more than leaching from concrete or lining accessible pores inside the concrete.
                      </li>
                    </ol>
                    <p className="text-gray-700 mb-4">
                      A pozzolanic reaction occurs between silica fume and the CH, creating additional CSH molecules within the voids of hydrated cement particles. These additional CSH molecules provide enhanced flexural, compressive, and bond-power for concrete. They also create a generally healthier matrix, as extra CS supplies fill in regions that would have stayed as little voids otherwise, subject to deleterious substances and potential ingress.
                    </p>
                    <p className="text-gray-700">
                      Silica fume for use in concrete is available in both dry and wet forms. It is usually added during concrete production at 5% to 10% by weight at a concrete plant and has been successfully produced in both dry-batch and central-mix plants.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold my-6 text-gray-900">
                      Advantages
                    </h2>
                    <p className="text-gray-700 mb-6">
                      The main advantages of using silica fume in concrete include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Stable Chemical Properties
                        </h3>
                        <p className="text-gray-700">
                          Silica fume presents a neutral inorganic filler with incredibly stable chemical and physical properties. It does not participate in the curing reaction, does not contain crystalline water, and does not affect the reaction metabolism.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Enhanced Thermal Properties
                        </h3>
                        <p className="text-gray-700">
                          Adding silica fume to concrete can increase thermal conductivity and flame retardant properties, as well as change adhesive viscosity.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Superior Mixing Characteristics
                        </h3>
                        <p className="text-gray-700">
                          It has great adsorption performance, produces no agglomeration phenomenon, is easy to mix, and offers good infiltration for various types of resin.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Cracking
                        </h3>
                        <p className="text-gray-700">
                          The addition of silica fume allows reducing epoxy resin's exothermic peak temperature of curing reaction, the shrinkage rate of solidified products, and their linear expansion coefficient. This allows preventing cracking by eliminating internal stress.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Increased Strength and Durability
                        </h3>
                        <p className="text-gray-700">
                          Silica fume possesses properties like strong densification, reasonable size distribution, as well as large wear resistance and hardness. This can significantly increase the compressive strength, tensile strength, affect the strength and wear resistance of the cured products, and increase the abrasion resistance by 0.5 to 2.5 times.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Improved Insulation
                        </h3>
                        <p className="text-gray-700">
                          Low content of impurities, pure silicon powder, and stable chemical and physical properties add arch resistance and good insulation properties to the curing material.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Reduced Stratification
                        </h3>
                        <p className="text-gray-700">
                          Silica fume consists of finely sized grains and distributes reasonably, meaning that it can effectively eliminate or reduce stratification and precipitation.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Enhanced Corrosion Resistance
                        </h3>
                        <p className="text-gray-700">
                          Silica (SiO2) within silica fume belongs to inert materials. This means that it doesn't come into reaction with most alkaloids and acids. If the silicon powder is evenly distributed on the surface of objects, it increases cavitation and corrosion resistance by 3 to 16 times.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Superior Frost Resistance
                        </h3>
                        <p className="text-gray-700">
                          The relative elastic modulus of silica fume is between 10% and 20% after 300 to 500 freeze-thaw cycles, while the elastic modulus of concrete without silica fume addition is 30% to 73% after 25 to 50 cycles. Therefore, the addition of silica fume to concrete allows for improving frost resistance.
                        </p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Cost Efficiency
                        </h3>
                        <p className="text-gray-700">
                          Silica fume has a small bulk density of 0.2 - 0.8 or 1 - 2.2. When used as polymer filling material, it can reduce the amount of loading and save the required amount of polymer, thus reducing the overall cost of the product.
                        </p>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold my-6 text-gray-900">
                      Applications
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <div className="flex flex-col md:flex-row gap-8 mb-6">
                        <div className="md:w-full">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            High-Rise Structures
                          </h3>
                          <p className="text-gray-700">
                            High-strength concrete is a very economical material for carrying vertical loads in high-rise structures. Until a few years ago, 6,000 psi concrete was considered to be high strength. Today, using silica fume, concrete with compressive strength in excess of 15,000 psi can be readily produced. The structure shown at the right used silica-fume concrete with a specified compressive strength of 12,000 psi in columns reaching from the ground through the 57th story.
                          </p>
                        </div>

                      </div>

                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-full order-1 md:order-2">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Bridge and Marine Structures
                          </h3>
                          <p className="text-gray-700">
                            The greatest cause of concrete deterioration in the world today is corrosion induced by deicing or marine salts. Silica-fume concrete with a low water content is highly resistant to penetration by chloride ions. More and more transportation agencies are using silica fume in their concrete for construction of new bridges or rehabilitation of existing structures.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Conclusion Section - Only for Stone Matrix Asphalt */}
              {blog.slug === 'stone-matrix-asphalt' && (
                <div className="mt-12" ref={conclusionRef}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Conclusion
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700">
                      Stone Matrix Asphalt represents a significant advancement in pavement technology, offering superior performance characteristics compared to conventional asphalt mixes. Its unique composition, featuring a stone-on-stone skeleton filled with a rich mastic of bitumen and filler, creates a highly durable and stable pavement structure.
                    </p>
                    <p className="text-gray-700 mt-4">
                      The integration of cellulose fibers plays a crucial role in enhancing SMA's performance by stabilizing the asphalt binder and preventing drainage during transport and placement. This results in a pavement that exhibits exceptional resistance to rutting, cracking, and other common forms of distress.
                    </p>
                    <p className="text-gray-700 mt-4">
                      While SMA may have a higher initial cost compared to conventional asphalt mixes, its long-term benefits—including extended service life, reduced maintenance requirements, and improved safety characteristics—make it a cost-effective solution for high-traffic roadways and other demanding applications.
                    </p>
                    <p className="text-gray-700 mt-4">
                      As transportation agencies and contractors continue to seek sustainable and durable pavement solutions, Stone Matrix Asphalt stands out as a proven technology that delivers exceptional performance while contributing to more resilient and environmentally friendly infrastructure.
                    </p>
                  </div>
                </div>
              )}



              {/* Final image already added above */}

              {/* We'll handle images between sections, so we don't need a separate gallery section */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 lg:pl-8 mt-12 lg:mt-0">
            <div className="sticky top-24">
              {/* Section Navigation */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
                <h3 className="font-bold text-gray-900 mb-4">In This Article</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        if (overviewRef.current) {
                          overviewRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-gray-700 hover:text-[#FF7069] text-sm flex items-center w-full text-left"
                    >
                      Overview
                    </button>
                  </li>
                  {blog.advantages && blog.advantages.length > 0 && (
                    <li>
                      <button
                        onClick={() => {
                          if (advantagesRef.current) {
                            advantagesRef.current.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-gray-700 hover:text-[#FF7069] text-sm flex items-center w-full text-left"
                      >
                        Advantages
                      </button>
                    </li>
                  )}
                  {blog.slug === 'stone-matrix-asphalt' && (
                    <li>
                      <button
                        onClick={() => {
                          if (conclusionRef.current) {
                            conclusionRef.current.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-gray-700 hover:text-[#FF7069] text-sm flex items-center w-full text-left"
                      >
                        Conclusion
                      </button>
                    </li>
                  )}
                  {/* Gallery section removed as images will be distributed throughout the article */}
                </ul>
              </div>

              {/* Author Card */}
              {/* <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Sarah Johnson</h3>
                    <p className="text-sm text-gray-500">Content Writer</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Sarah specializes in technology writing with over 5 years of
                  experience covering web development and design.
                </p>
              </div> */}

              {/* Related Posts */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Related Articles
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((post: Blog, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image || "/api/placeholder/200/200"}
                          alt={post.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="ml-4">
                        <Link
                          href={`/Blog/${post.slug}`}
                          className="font-medium text-gray-900 hover:text-[#FF7069] text-sm line-clamp-2"
                        >
                          {post.name}
                        </Link>
                        <p className="text-gray-500 text-xs mt-1">
                          {readTime} min read
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link
                    href="/Blog"
                    className="text-[#FF7069] hover:text-[#ff5c54] font-medium text-sm flex items-center"
                  >
                    View all articles
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-gray-300 mb-8">
              Get the latest articles and insights delivered directly to your
              inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF7069]"
              />
              <button className="px-6 py-3 bg-[#FF7069] hover:bg-[#ff5c54] text-white rounded-lg transition-colors text-base font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Insight<span className="text-[#FF7069]">.</span>
          </div>
          <p className="text-gray-600 mb-6">
            Insights on web development, design, and technology.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#FF7069]"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FF7069]"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FF7069]"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Insight Blog. All rights reserved.
          </div>
        </div>
      </footer>
    </main>

  );
}
