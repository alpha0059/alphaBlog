import React from 'react';

const SkeletonPost = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col h-full animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-slate-700 w-full" />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-sm mb-3">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                    <div className="h-4 w-4 bg-gray-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6 mb-4 flex-grow" />
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-700 mt-auto">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700" />
                        <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                    </div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonPost;
