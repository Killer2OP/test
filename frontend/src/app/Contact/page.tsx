"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
// import ContactImg from "../../../public/images/construction-1.jpg"

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

// Define the types for the API response
interface ApiResponse {
  success: boolean;
  message: string;
}

export default function Contact() {
  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ): Promise<void> => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data: ApiResponse = await response.json();
      if (data.success) {
        alert("Your message has been sent!");
        resetForm();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }

    setSubmitting(false);
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const values = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      message: formData.get("message") as string,
    };

    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.message
    ) {
      alert("All fields marked with * are required!");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(values.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    await handleSubmit(values, {
      setSubmitting: () => { },
      resetForm: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-b from-[var(--secondary)]/10 to-[var(--background)]">
        <div className="container mx-auto px-6 pt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get in touch with us
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Please fill in your details and our dedicated team will reach out to you within 24 hours. Looking forward to discussing opportunities with you and your team.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
                alt="Contact Us"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Phone,
                title: "Call Us",
                details: ["+91 9873173214", "+91 9205992676"],
              },
              {
                icon: Mail,
                title: "Email Us",
                details: [
                  "smpl@narsinghdass.com ",
                  "material@narsinghdass.com",
                ],
              },
              {
                icon: MapPin,
                title: "Visit Us",
                details: [
                  "Shop No, 1170/23, 3rd Floor, GT Rd, Block 25, Shakti Nagar, Delhi, 110007",
                ],
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-xl bg-[var(--secondary)]/5 hover:bg-[var(--secondary)]/10 transition-all"
              >
                <contact.icon className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
                  {contact.title}
                </h3>
                {contact.details.map((detail, i) => (
                  <p key={i} className="text-[var(--text-body)]">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
          <section className="py-12 sm:py-14 md:py-16 lg:py-20 ">
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    title="Google Map"
                    className="w-full h-96"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2159595874245!2d77.1969581!3d28.683185800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfda659f0c013%3A0x4e338402ca192f01!2sNDG%20Cella%20Corporate!5e0!3m2!1sen!2sin!4v1745326872870!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
                >
                  <h2 className="text-3xl font-bold mb-8 text-center">
                    Send Us a Message
                  </h2>
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name*
                        </label>
                        <input
                          name="firstName"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name*
                        </label>
                        <input
                          name="lastName"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address*
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message*
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      Send Message
                    </button>
                  </form>
                </motion.div>

                {/* Google Map */}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* <section className="py-16 bg-[var(--secondary)]/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">
                Our Business Hours
              </h2>
              <div className="flex items-center justify-center gap-2 text-[var(--text-body)]">
                <Clock className="w-5 h-5 text-[var(--primary)]" />
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
              <p className="text-[var(--text-body)]">
                We'll get back to you within 24 hours during business hours.
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
