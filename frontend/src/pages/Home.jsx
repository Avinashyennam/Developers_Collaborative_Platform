import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
const Home = () => {

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },                // Initially hidden and lower
        partiallyVisible: { opacity: 0.5, y: 20 },    // Partially visible and closer to final position
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },  // Fully visible
    };

    return (
        <div className='flex flex-col gap-36'>
            <div id="home"> <Hero /> </div>
            <div className='flex gap-12 px-36  mission'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className='w-1/2'
                >
                    <img src="/mission.jpg" alt='not found' className='rounded-md' />
                </motion.div>
                <div className='w-1/2 flex flex-col items-center gap-12'>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <h1 className='text-5xl font-bold'>Our Mission</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <p className='text-[17px]'>
                            At Collab, we strive to empower developers by creating a platform
                            that fosters collaboration and knowledge sharing.
                            Our vision is to build a supportive community where developers can connect based on their skills and interests.
                        </p>
                    </motion.div>
                    <div className='grid grid-cols-2 grid-rows-2 gap-10'>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='flex flex-col gap-6'
                        >
                            <h1 className='text-3xl font-semibold'>500 users</h1>
                            <p>
                                Since our inception in 2023, we have successfully connected over 1000 developers,
                                helping them find collaboration opportunities and enhance their skills.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='flex flex-col gap-6'
                        >
                            <h1 className='text-3xl font-semibold'>200 projects</h1>
                            <p>
                                Our platform has facilitated the completion of 50 collaborative projects,
                                showcasing the power of teamwork and shared knowledge.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='flex flex-col gap-6'
                        >
                            <h1 className='text-3xl font-semibold'>30 events</h1>
                            <p>
                                We have hosted 10 community events, bringing developers together
                                to share insights and foster connections.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='flex flex-col gap-6'
                        >
                            <h1 className='text-3xl font-semibold'>15 workshops</h1>
                            <p>
                                Additionally, we offer 5 workshops aimed at enhancing skills and promoting
                                innovation within the developer community.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col px-36 gap-16  features'>
                <div className='flex justify-around'>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className='w-2/5'>
                        <h1 className='text-5xl font-bold'>Discover Key Features</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className='w-3/5'>
                        <h3 className='text-lg'>
                            Collab offers a unique platform for developers to connect based on skills and interests.
                            Our features are designed to enhance collaboration and knowledge sharing.
                            Explore how you can find like-minded developers and engage in meaningful projects.
                        </h3>
                    </motion.div>
                </div>
                <div className='flex gap-10'>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                        className='flex flex-col gap-8'>
                        <div>
                            <img src="/matching.jpeg" alt='not found' width={300} height={300} className='rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-semibold'>Developer Matchmaking Service</h1>
                        </div>
                        <div>
                            <p>
                                Connect with developers who share your skills and interests.
                                Collaborate on projects and enhance your coding skills through peer-to-peer practice.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                        className='flex flex-col gap-8'>
                        <div>
                            <img src="/expertise.jpeg" alt='not found' width={300} height={300} className='rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-semibold'>Showcase Your Expertise</h1>
                        </div>
                        <div>
                            <p>
                                Connect with developers who share your skills and interests.
                                Collaborate on projects and enhance your coding skills through peer-to-peer practice.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                        className='flex flex-col gap-8'>
                        <div>
                            <img src="/community.jpg" alt='not found' width={300} height={300} className='rounded-md' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-semibold'>Engage with the Community</h1>
                        </div>
                        <div>
                            <p>
                                Connect with developers who share your skills and interests.
                                Collaborate on projects and enhance your coding skills through peer-to-peer practice.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className='flex justify-between  px-36 stepbystep'>
                <div className='w-1/2 flex flex-col gap-10'>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <h1 className='text-5xl font-bold'>Step-by-Step Guide to Collab</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <p className='text-lg'>
                            Discover how easy it is to connect with fellow developers on Collab. Our platform guides you through creating a profile,
                            showcasing your skills, and finding the perfect collaboration opportunities.
                            Join our community and start building your network today!
                        </p>
                    </motion.div>
                    <div className='flex gap-8'>
                        <motion.div
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='flex flex-col gap-6'
                        >
                            <h1 className='text-3xl font-semibold'>1 Step</h1>
                            <p>Create your profile and highlight your skills.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 200 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='flex flex-col gap-6'
                        >
                            <h1 className='text-3xl font-semibold'>2 Step</h1>
                            <p>Browse and connect with like-minded developers.</p>
                        </motion.div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 200 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    className='w-1/2 flex justify-center'
                >
                    <img src="/stepbystep.jpeg" alt="not found" className='h-4/5 rounded-md' />
                </motion.div>
            </div>
        </div>
    )
}

export default Home;