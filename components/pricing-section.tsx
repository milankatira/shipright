import { motion } from 'framer-motion';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from './ui/button';
function PricingSection() {
    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-transparent"></div>

            {/* Floating elements in background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute size-2 rounded-full bg-black/10"
                        animate={{
                            y: [-20, -40, -20],
                            x: Math.sin(i) * 10,
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="container px-4 mx-auto max-w-screen-xl relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="inline-block"
                        animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <span className="inline-flex items-center rounded-full bg-black/10 px-4 py-1 text-sm font-medium text-black mb-8">
                            <Star className="mr-1 h-4 w-4" />
                            Breaking News
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl text-gray-900 mb-6 font-light">
                        Yes, it's{" "}
                        <span className="relative inline-block">
                            <span className=" font-bold relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700">
                                100% Free
                            </span>
                            <motion.svg
                                className="absolute -bottom-4 left-0 w-full"
                                viewBox="0 0 100 20"
                                height="20"
                                preserveAspectRatio="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                            >
                                <motion.path
                                    d="M0 10 Q50 0 100 10"
                                    fill="none"
                                    stroke="black"
                                    strokeWidth="4"
                                />
                            </motion.svg>
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        We believe in giving back to the community. That's why we're making our entire platform free for everyone, forever.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto border border-black/10"
                >
                    <div className="grid gap-8 md:grid-cols-2 mb-8">
                        <div>
                            <h3 className="font-semibold text-xl mb-4 text-gray-900">Everything Included</h3>
                            <ul className="space-y-3">
                                {[
                                    "Unlimited Projects",
                                    "Unlimited Feature Requests",
                                    "Real-time Voting",
                                    "Advanced Analytics",
                                    "Priority Support"
                                ].map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="size-5 rounded-full bg-black/5 flex items-center justify-center">
                                            <Check className="size-3 text-black" />
                                        </div>
                                        <span className="text-gray-600">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl mb-4 text-gray-900">No Catches</h3>
                            <ul className="space-y-3">
                                {[
                                    "No Credit Card Required",
                                    "No Hidden Fees",
                                    "No Usage Limits",
                                    "No Locked Features",
                                    "Cancel Anytime"
                                ].map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        className="flex items-center gap-2"
                                    >
                                        <div className="size-5 rounded-full bg-black/5 flex items-center justify-center">
                                            <Check className="size-3 text-black" />
                                        </div>
                                        <span className="text-gray-600">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <motion.div
                        className="text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-black to-gray-800 text-white hover:opacity-90 shadow-lg"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <p className="mt-4 text-sm text-gray-500">Join thousands of happy users today</p>
                    </motion.div>
                </motion.div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600">Still have questions?</p>
                    <Button variant="link" className="text-black hover:text-gray-700">
                        Contact our support team
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default PricingSection;