import React from 'react';

const About = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-20 py-10">
            {/* 1. Personal Introduction */}
            <section className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] transform rotate-6 scale-105 opacity-20"></div>
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                            alt="Alex Brown"
                            className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] shadow-2xl z-10"
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Hi, I'm <span className="text-primary">Alex Brown</span>.
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        I'm a full-stack developer, writer, and avid traveler based in San Francisco.
                        With over 5 years of experience in building scalable web applications, I have a deep passion for creating clean, efficient, and user-centric digital experiences.
                        When I'm not coding, you can find me hiking the trails of California or sipping artisan coffee while reading a good book.
                    </p>
                </div>
            </section>

            {/* 2. Skills / Interests */}
            <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills & Interests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-secondary">⚡</span> Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['React.js', 'Node.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'TypeScript', 'GraphQL', 'MongoDB', 'AWS'].map((skill) => (
                                <span key={skill} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-secondary">🌟</span> Personal Interests
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Blogging', 'Photography', 'Hiking', 'Open Source', 'UI/UX Design', 'Coffee Brewing', 'Travel'].map((interest) => (
                                <span key={interest} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Purpose of Blog */}
            <section className="text-center max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Why I Started alphaBlog</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    alphaBlog was born out of a desire to create a dedicated space for sharing knowledge without the noise of traditional social media.
                    My goal is to document my learning journey, share technical tutorials, and connect with like-minded individuals who are passionate about technology and creativity.
                    Here, you'll find everything from deep-dive coding guides to reflections on navigating the tech industry.
                </p>
            </section>

            {/* 4. Contact Details & Social Links */}
            <section className="bg-dark rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary rounded-full filter blur-[100px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary rounded-full filter blur-[100px] opacity-40 animate-pulse"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                        Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
                    </p>

                    <div className="inline-flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a href="mailto:alex@alphablog.com" className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all transform hover:-translate-y-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            alex@alphablog.com
                        </a>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors text-white">
                                <span className="sr-only">GitHub</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0077b5] transition-colors text-white">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1DA1F2] transition-colors text-white">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
