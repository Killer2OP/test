"use client";
import React, { useState } from "react";

const Contacts: React.FC = () => {
  // Define state for form fields
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // Handle input change
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert("All fields except phone are required!");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Your message has been sent!");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 bg-[#EFEFEF]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Address Section */}
          <div className="text-center md:text-left">
            <h3 className="text-primaryColor text-lg leading-6 mb-3 font-semibold">
              Our Address
            </h3>
            <h1 className="mb-5 text-Dark text-2xl sm:text-3xl leading-8 sm:leading-10 font-medium">
              <span className="font-bold">Visit Us</span>
            </h1>
            <p className="text-[#25252A] text-lg sm:text-xl leading-relaxed">
              Shivananda Marketing Pvt. Ltd., NDG Cella, 11702/3, <br />
              GT Road, Block 25, Shakti Nagar, Delhi - 110007
              <br />
              Delhi, 110007
            </p>

            {/* Google Map */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Google Map"
                className="w-full h-52 sm:h-80 md:h-96"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2159595874245!2d77.1969581!3d28.683185800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfda659f0c013%3A0x4e338402ca192f01!2sNDG%20Cella%20Corporate!5e0!3m2!1sen!2sin!4v1745326872870!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:mt-44">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="py-3 px-5 block w-full rounded-full bg-transparent border border-[#3C3C3C] focus:border-primaryColor outline-none sm:text-sm text-[#25252A] placeholder:text-[#25252A]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="py-3 px-5 block w-full rounded-full bg-transparent border border-[#3C3C3C] focus:border-primaryColor outline-none sm:text-sm text-[#25252A] placeholder:text-[#25252A]"
                  />
                </div>
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="py-3 px-5 block w-full rounded-full bg-transparent border border-[#3C3C3C] focus:border-primaryColor outline-none sm:text-sm text-[#25252A] placeholder:text-[#25252A]"
                />
              </div>
              <div className="mb-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="py-3 px-5 block w-full rounded-full bg-transparent border border-[#3C3C3C] focus:border-primaryColor outline-none sm:text-sm text-[#25252A] placeholder:text-[#25252A]"
                />
              </div>
              <div className="mb-8">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="py-3 px-5 block w-full rounded-xl bg-transparent border border-[#3C3C3C] focus:border-primaryColor outline-none sm:text-sm text-[#25252A] placeholder:text-[#25252A]"
                ></textarea>
              </div>
              <div className="w-full text-center">
                <button
                  type="submit"
                  className="mx-auto px-8 py-2 rounded-full bg-primaryColor hover:bg-transparent border-2 border-transparent hover:border-primaryColor text-Light hover:text-primaryColor font-semibold text-lg duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
