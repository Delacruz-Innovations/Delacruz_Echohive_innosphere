import { ArrowRight, ChevronRight } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import BackgroundImage from '../assets/Images/studyhero.png'
import Blog01 from '../assets/Images/blog1.png'
import Blog02 from '../assets/Images/blog02.png'
import Article from '../assets/Images/articlecase.png'
import { Link } from 'react-router-dom'

const Casestudy = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const caseStudyRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    { title: 'About Us', subtitle: 'Expanding economic opportunities for rural farmers in East Africa', description: 'Shaping Africa’s Digital Future One Solution at a Time.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', link:'/about' },
    { title: 'Insights', subtitle: 'The future of digital banking', description: 'Expert analysis on strategic transformation', image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=600', link:'/insights'  },
    { title: 'Case Study', subtitle: 'Transforming healthcare delivery', description: 'NHS England – Replatforming & CRM Modernisation', image: Blog02, link:'/case-studies' }
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === caseStudyRef.current) {
            setIsVisible(entry.isIntersecting);
          } else {
            const index = cardsRef.current.indexOf(entry.target);
            if (index !== -1 && entry.isIntersecting) {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (caseStudyRef.current) {
      observer.observe(caseStudyRef.current);
    }

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className='bg-black py-16 px-4 sm:px-6 lg:px-8'>
        {/* Desktop: Large Case Study Card */}
        <div 
          ref={caseStudyRef}
          style={{ backgroundImage: `url(${BackgroundImage})`, backgroundPosition: 'center' }} 
          className={`hidden md:flex max-w-7xl mx-auto my-3 rounded-md text-gray-50 items-end overflow-hidden relative  transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className={`absolute inset-0 transition-transform duration-700 ${isHovered ? 'scale-100' : 'scale-110'}`}
            style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className='h-[25rem] w-full p-8 md:p-6 flex flex-col justify-end relative z-10'>
            <h1 className={`text-4xl md:text-5xl font-semibold mb-4 transition-all duration-500 ${isHovered ? 'opacity-100 scale-102' : 'opacity-70'}`}>
              Case Study
            </h1>
            <p className={`text-lg md:text-xl mb-6 max-w-2xl transition-all duration-500 ${isHovered ? 'opacity-100 scale-102' : 'opacity-70'}`}>
              Leading Fin-tech drives end to end transformation for profitable growth.
            </p>
            <div className={`transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
              <Link to='/case-studies' className="group relative inline-flex items-center gap-3 bg-black text-white px-8 py-4 md:px-6 md:py-3 rounded-lg font-semibold text-base md:text-lg shadow-lg hover:shadow-2xl hover:shadow-[#4a90b8]/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10">Learn More </span>
                <ArrowRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: Carousel Layout */}
        <div className='md:hidden relative overflow-hidden'>
          <div 
            className='flex transition-transform duration-500 ease-out'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {cards.map((card, index) => (
              <div 
                key={index}
                className='min-w-full px-2'
              >
                <Link to ={card.link}>
                <div 
                  className='relative h-[25rem] rounded-lg overflow-hidden'
                  style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent'></div>
                  
                  <div className='absolute bottom-0 left-0 p-6 text-white w-full'>
                    <p className='text-xs uppercase tracking-wider mb-2 text-gray-300'>{card.title}</p>
                    <h2 className='text-2xl font-semibold mb-3 leading-tight'>
                      {card.subtitle}
                    </h2>
                    <ArrowRight className='w-5 h-5' />
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className='flex justify-center gap-2 mt-4'>
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
               className={`h-2 rounded-full transition-all duration-300 ${
  currentSlide === index ? 'w-8 bg-purple-600' : 'w-2 bg-purple-400'
}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Cards */}
        <div className='hidden md:block mx-2'>
          <div className='mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4'>
            {cards.map((card, index) => (
              <Link to ={card.link}>
              <div 
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`relative flex-1 h-[20rem] rounded-lg overflow-hidden group cursor-pointer transition-all duration-700 ${
                  cardsVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
                
                <div className='absolute bottom-0 left-0 p-6 text-white'>
                  <h1 className='text-2xl md:text-3xl font-semibold mb-2 transition-transform duration-300 group-hover:translate-y-[-4px]'>
                    {card.title}
                  </h1>
                  <p className='text-sm md:text-base text-gray-200 transition-opacity duration-300 group-hover:opacity-100 opacity-80'>
                    {card.description}
                  </p>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Casestudy