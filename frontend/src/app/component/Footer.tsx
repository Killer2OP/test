'use client'
import Link from 'next/link'
import { usePathname } from "next/navigation";
const ProductList = [
    { productLink: "/infrastructure", productTitle: "Construction Solutions " },
    { productLink: "/Coating", productTitle: "Coating and Masterbatch Solutions" },
    { productLink: "https://indiapaper.com/", productTitle: "Paper & Packaging" },
    // { productLink: "/Products/cellulose-fiber-pellets", productTitle: "Cellulose Fiber Pellets" },
    // { productLink: "/Products/anti-stripping-agent", productTitle: "Anti Stripping Agent" },
    // { productLink: "/Products/silica-fume", productTitle: "Silica Fume" },
]

const Footer = () => {
    // const firstHalf = ProductList.slice(0, ProductList.length / 2);
    // const secondHalf = ProductList.slice(ProductList.length / 2);

     const pathname = usePathname();

  const hideHeaderFooter = pathname?.includes("login") || pathname?.includes("dashboard");

    if(hideHeaderFooter)    return null;

    return (
        <footer className='pt-12 md:pt-14 lg:pt-16 pb-10 md:pb-6 lg:pb-6 bg-gray-100'>
            <div className="container mx-auto px-4 md:px-8">
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>

                    {/* Contact Us */}
                    <div className="flex flex-col items-start">
                        <h2 className='text-lg lg:text-base font-semibold text-primaryColor uppercase mb-3'>
                            CONTACT US
                        </h2>
                        <p className='text-sm text-Dark mb-1'>Call us: 9AM - 6 PM</p>
                        <Link href='tel:+919873173214' className='text-primaryColor text-sm font-medium block mb-1 hover:underline'>
                            +91 9873173214
                        </Link>
                        <Link href='tel:+919205992676' className='text-primaryColor text-sm font-medium block mb-2 hover:underline'>
                            +91 9205992676
                        </Link>
                        <Link href='mailto:smpl@narsinghdass.com' className='text-md text-Dark block mb-1 hover:text-primaryColor duration-300'>
                            smpl@narsinghdass.com
                        </Link>
                        <Link href='mailto:material@narsinghdass.com' className='text-md text-Dark block mb-1 hover:text-primaryColor duration-300'>
                            material@narsinghdass.com
                        </Link>
                    </div>

                    {/* Help & Support */}
                    <div className="flex flex-col items-start">
                        <h2 className='text-md lg:text-base font-semibold text-primaryColor uppercase mb-3'>
                            HELP & SUPPORT
                        </h2>
                        <Link href="/Contact" className='text-sm text-Dark block mb-1 hover:text-primaryColor'>
                            Contact Us
                        </Link>
                        {/* <Link href="#" className='text-xs text-Dark block mb-1 hover:text-primaryColor'>
                            Our Services
                        </Link> */}
                    </div>

                    {/* Product Categories */}
                    <div className="flex flex-col items-start">
                        <h2 className='text-sm lg:text-base font-semibold text-primaryColor uppercase mb-3'>
                            PRODUCT CATEGORIES
                        </h2>
                        <div className="grid grid-cols-1 gap-x-4">
                            <ul className="space-y-1">
                                {ProductList.map((product, index) => (
                                    <li key={index}>
                                        <Link href={product.productLink} className='block text-sm text-Dark hover:text-primaryColor'>
                                            {product.productTitle}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {/* <ul>
                                {secondHalf.map((product, index) => (
                                    <li key={index}>
                                        <Link href={product.productLink} className='block text-xs text-Dark hover:text-primaryColor'>
                                            {product.productTitle}
                                        </Link>
                                    </li>
                                ))}
                            </ul> */}
                        </div>
                    </div>

                    {/* Company Information */}
                    <div className="flex flex-col items-start">
                        <h2 className='text-sm lg:text-base font-semibold text-primaryColor uppercase mb-3'>
                            COMPANY INFORMATION
                        </h2>
                        <Link href="/Blog" className='text-sm text-Dark block mb-1 hover:text-primaryColor'>
                            Knowledge Hub
                        </Link>
                        <Link href="/Aboutus" className='text-sm text-Dark block mb-1 hover:text-primaryColor'>
                            About
                        </Link>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-300 py-4 text-center">
                    <p className='text-xs text-Dark'>
                        &copy; {new Date().getFullYear()} SHIVANANDA MARKETING Pvt.Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
