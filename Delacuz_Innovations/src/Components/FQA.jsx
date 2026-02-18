import React, { useState } from 'react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: "Re-inventing digital?",
            answer: "Lorem ipsum dolor sit amet, consectetur. Tristique et mollis vitae, eu. See mi hendrerit dictumst eu. Malesuada eleifend sit viverra vulputate morbi. Quis bibendum neque sed ipsum et, aliquam ut. Dictum viverra enim cras nisl."
        },
        {
            question: "Who is eligible to participate?",
            answer: "Lorem ipsum dolor sit amet, consectetur. Tristique et mollis vitae, eu. See mi hendrerit dictumst eu. Malesuada eleifend sit viverra vulputate morbi. Quis bibendum neque sed ipsum et, aliquam ut. Dictum viverra enim cras nisl."
        },
        {
            question: "Who is eligible to participate?",
            answer: "Lorem ipsum dolor sit amet, consectetur. Tristique et mollis vitae, eu. See mi hendrerit dictumst eu. Malesuada eleifend sit viverra vulputate morbi. Quis bibendum neque sed ipsum et, aliquam ut. Dictum viverra enim cras nisl."
        },
        {
            question: "Who is eligible to participate?",
            answer: "Lorem ipsum dolor sit amet, consectetur. Tristique et mollis vitae, eu. See mi hendrerit dictumst eu. Malesuada eleifend sit viverra vulputate morbi. Quis bibendum neque sed ipsum et, aliquam ut. Dictum viverra enim cras nisl."
        },
        {
            question: "Who is eligible to participate?",
            answer: "Lorem ipsum dolor sit amet, consectetur. Tristique et mollis vitae, eu. See mi hendrerit dictumst eu. Malesuada eleifend sit viverra vulputate morbi. Quis bibendum neque sed ipsum et, aliquam ut. Dictum viverra enim cras nisl."
        },
        {
            question: "Who is eligible to participate?",
            answer: "Lorem ipsum dolor sit amet, consectetur. Tristique et mollis vitae, eu. See mi hendrerit dictumst eu. Malesuada eleifend sit viverra vulputate morbi. Quis bibendum neque sed ipsum et, aliquam ut. Dictum viverra enim cras nisl."
        }
    ]

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="bg-black py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-start justify-between mb-12">
                    <div className="flex-1">
                        <h2 className="text-4xl lg:text-5xl font-bold text-purple-400 mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-300">
                            Find answers to common questions about our products and services.
                        </p>
                    </div>
                    <div className="ml-6 flex-shrink-0">
                        <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                            <svg 
                                className="w-8 h-8 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className={`bg-transparent border border-purple-700/30 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 ${
                                openIndex === index ? 'scale-[1.01] border-purple-500' : ''
                            }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-purple-700/10 transition-all duration-200"
                            >
                                <span className="text-lg font-semibold text-white">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 text-purple-400 transform transition-all duration-500 flex-shrink-0 ml-6 ${
                                        openIndex === index ? 'rotate-180 scale-110' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-8 pb-6 text-gray-300 text-base leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ