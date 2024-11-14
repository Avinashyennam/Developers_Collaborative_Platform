import React from "react";

const Profile = () => {
    return (
        <div>
            <div className="bg-gray-100 min-h-screen px-36 flex flex-col gap-4 justify-center items-center">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
                    {/* Top Colored Section */}
                    <div className="bg-gradient-to-r from-yellow-300 to-pink-300 h-28 rounded-t-lg relative">
                        {/* Profile Picture */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                            <img
                                src="/Kat Graham.jpeg" // replace with actual image URL
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="pt-14 pb-6 text-center">
                        <h2 className="text-xl font-semibold">Amanda Smith</h2>
                        <p className="text-gray-600">Lead product designer at Google</p>
                        <p className="text-gray-500 text-sm">@amanda21 · Full-time</p>
                        <div className="mt-4 flex justify-center gap-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Message</button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Share profile</button>
                        </div>
                    </div>
                </div>

                    {/* Skills Section */}

                    <div className="px-6 py-4 w-full max-w-2xl bg-white rounded-lg shadow-lg">
                        <h3 className="text-gray-700 font-semibold">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {['Product Design', 'UX Design', 'Google Analytics', 'SEO Content', 'Customer Service', 'UI Design', 'Design Strategy', 'Web Development', 'Integrated Design', 'Front End'].map((skill) => (
                                <span key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Employment History Section */}
                    <div className="px-6 py-4 border-t border-gray-200 w-full max-w-2xl bg-white rounded-lg shadow-lg">
                        <h3 className="text-gray-700 font-semibold">Employment history</h3>
                        <div className="mt-2">
                            <p className="font-semibold">Product Designer</p>
                            <p className="text-gray-600">Instagram - Full-time</p>
                            <p className="text-gray-500 text-sm">June 2020 - Present · 2 years</p>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Profile