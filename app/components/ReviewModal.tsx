'use client';

import React, { useState } from 'react';

interface ReviewItem {
    quote: string;
    author: string;
}

interface ReviewModalProps {
    review: ReviewItem;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ review }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="group relative bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between flex-grow mb-4 transition duration-300 ease-in-out transform hover:bg-uzGreen active:bg-grayBack cursor-pointer"
                onClick={() => setIsOpen(true)} // Open modal
            >
                <p className="font-bold text-xl text-black mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-white">
                    {review.quote}
                </p>
                <p className="text-sm font-light text-black transition-colors duration-300 group-hover:text-white">
                    - {review.author}
                </p>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                            onClick={() => setIsOpen(false)} // Close modal
                        >
                            ✖
                        </button>
                        <p className="text-lg font-bold mb-4">{review.quote}</p>
                        <p className="text-sm font-light">- {review.author}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewModal;
