import React from 'react'

const FeaturedImpact = () => {
    const Impacts = [
        {
            image: "https://www.affilityconsulting.com/wp-content/uploads/2025/01/transform-your-busines-1.webp",
            title: "Case Study",
            name: "Expanding economic opportunities for rural farmers in east africa",
            description: "ERP, or Enterprise Resource Planning is a software system that helps businesses run efficiently by managing core processes and associated daily operations. Independent ERP Advisory services involve assessing your business and its existing systems, before equipping you with a tailor-made ERP solution that meets your goals.Opting in for expert ERP consultation before adopting a system is crucial to ensure a profitable outcome. There are thousands of ERP solution providers, all promising top-of-the-line solutions.However, 55% – 75% of ERP implementation projects fail to achieve their objectives. This is because the success of an ERP system largely depends on what and who you choose and how the project is managed. It is imperative to entrust your business with established independent ERP consultants who have a successful track record of implementing custom ERP solutions across varied industries. If you are looking for trusted independent ERP advisors, connect with us now."
        },
        {
            image: "https://www.affilityconsulting.com/wp-content/uploads/2025/01/transform-your-busines-1.webp",
            title: "Case Study",
            name: "Expanding economic opportunities for rural farmers in east africa",
            description: "ERP, or Enterprise Resource Planning is a software system that helps businesses run efficiently by managing core processes and associated daily operations. Independent ERP Advisory services involve assessing your business and its existing systems, before equipping you with a tailor-made ERP solution that meets your goals.Opting in for expert ERP consultation before adopting a system is crucial to ensure a profitable outcome. There are thousands of ERP solution providers, all promising top-of-the-line solutions.However, 55% – 75% of ERP implementation projects fail to achieve their objectives. This is because the success of an ERP system largely depends on what and who you choose and how the project is managed. It is imperative to entrust your business with established independent ERP consultants who have a successful track record of implementing custom ERP solutions across varied industries. If you are looking for trusted independent ERP advisors, connect with us now."
        },
     
        {
            image: "https://www.affilityconsulting.com/wp-content/uploads/2025/01/transform-your-busines-1.webp",
            title: "Case Study",
            name: "Expanding economic opportunities for rural farmers in east africa",
            description: "ERP, or Enterprise Resource Planning is a software system that helps businesses run efficiently by managing core processes and associated daily operations. Independent ERP Advisory services involve assessing your business and its existing systems, before equipping you with a tailor-made ERP solution that meets your goals.Opting in for expert ERP consultation before adopting a system is crucial to ensure a profitable outcome. There are thousands of ERP solution providers, all promising top-of-the-line solutions.However, 55% – 75% of ERP implementation projects fail to achieve their objectives. This is because the success of an ERP system largely depends on what and who you choose and how the project is managed. It is imperative to entrust your business with established independent ERP consultants who have a successful track record of implementing custom ERP solutions across varied industries. If you are looking for trusted independent ERP advisors, connect with us now."
        },
    ]

    return (
        <div className="bg-black py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="uppercase font-semibold text-sm text-purple-400 tracking-wide mb-3">
                    Featured Impact
                </h3>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">
                    Our Success Stories
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Impacts.map((impact, index) => (
                        <div 
                            key={index} 
                            className="bg-purple-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
                        >
                            <img 
                                src={impact.image} 
                                alt={impact.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full mb-3">
                                    {impact.title}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-3 capitalize leading-tight">
                                    {impact.name}
                                </h3>
                                <p className="text-gray-100 leading-relaxed mb-4">
                                    {impact.description.slice(0, 200)}...
                                </p>
                                <button className="text-purple-200 font-semibold hover:text-white transition-colors">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeaturedImpact