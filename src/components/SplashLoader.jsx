import React from 'react';

const SplashLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark text-white">
            <div className="relative">
                {/* Logo Animation */}
                <div className="w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl animate-pulse-logo mb-6">
                    AB
                </div>

                {/* Rings decoration */}
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping scale-150"></div>
                <div className="absolute inset-0 border-2 border-secondary/20 rounded-full animate-ping scale-[2] delay-300"></div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tighter animate-fade-in-up">
                alpha<span className="text-primary">Blog</span>
            </h1>

            <div className="mt-8 flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
};

export default SplashLoader;
