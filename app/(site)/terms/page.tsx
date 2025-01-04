"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const TermsPage = () => {
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

                    <div className="prose prose-gray max-w-none">
                        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Terms</h2>
                        <p>
                            By accessing our website and using our services, you agree to be bound by these terms and conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily access the materials (information or software) on Shipright's website for personal, non-commercial transitory viewing only.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on Shipright's website are provided on an 'as is' basis. Shipright makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
                        <p>
                            In no event shall Shipright or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Shipright's website.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Account Terms</h2>
                        <p>
                            You must be 13 years or older to use this Service. You must provide your legal full name, a valid email address, and any other information requested in order to complete the signup process.
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default TermsPage;