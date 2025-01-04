"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const PrivacyPage = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                    <div className="prose prose-gray max-w-none">
                        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Name and email address</li>
                            <li>Usage data and preferences</li>
                            <li>Information about your team and projects</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Monitor and analyze trends and usage</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
                        <p>
                            We use cookies and similar technologies to collect information about your browsing activities over time and across different websites following your use of our services.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at support@shipright.co
                        </p>
                    </div>
                </motion.div>
            </div>
        </>

    );
};

export default PrivacyPage;