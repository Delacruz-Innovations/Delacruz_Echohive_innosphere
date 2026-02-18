import React, { useState, useEffect, useRef } from 'react';

const CommunityLeaders = () => {
  const targetRef = useRef(null);
  const cardsContainerRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  // Community leaders data
  const leaders = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Environmental Activist",
      organization: "Green Future Initiative",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      video: "https://cdn.pixabay.com/video/2023/01/02/145479-784191481_small.mp4",
      description: "Leading climate action programs across 15 communities, inspiring sustainable change.",
      color: "#10b981",
      impact: "50K+ Trees Planted"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Youth Mentor",
      organization: "Urban Youth Alliance",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      video: "https://cdn.pixabay.com/video/2022/12/28/144822-784158230_small.mp4",
      description: "Empowering young leaders through education and mentorship programs in underserved areas.",
      color: "#3b82f6",
      impact: "2,000+ Youth Mentored"
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Healthcare Advocate",
      organization: "Community Health Network",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
      video: "https://cdn.pixabay.com/video/2023/05/15/162571-828099695_small.mp4",
      description: "Expanding access to healthcare services in rural communities through mobile clinics.",
      color: "#ec4899",
      impact: "10K+ Lives Impacted"
    },
    {
      id: 4,
      name: "James Morrison",
      role: "Food Security Leader",
      organization: "Harvest Hope Foundation",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
      video: "https://cdn.pixabay.com/video/2020/06/23/42748-435395913_small.mp4",
      description: "Building urban farms and food distribution networks to combat hunger and promote nutrition.",
      color: "#f59e0b",
      impact: "1M+ Meals Served"
    },
    {
      id: 5,
      name: "Elena Rodriguez",
      role: "Education Pioneer",
      organization: "Learn Together Initiative",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
      video: "https://cdn.pixabay.com/video/2022/11/09/138314-770886652_small.mp4",
      description: "Creating innovative learning spaces and technology access for students in remote areas.",
      color: "#8b5cf6",
      impact: "30+ Schools Built"
    },
    {
      id: 6,
      name: "David Kim",
      role: "Housing Rights Advocate",
      organization: "Shelter for All",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      video: "https://cdn.pixabay.com/video/2021/08/05/84569-587935195_small.mp4",
      description: "Fighting for affordable housing and supporting homeless individuals with resources and dignity.",
      color: "#06b6d4",
      impact: "500+ Families Housed"
    }
  ];

  // 1. Measure Content to determine layout height
  useEffect(() => {
    const handleResize = () => {
      if (cardsContainerRef.current) {
        const cardsWidth = cardsContainerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const totalScrollDistance = cardsWidth - windowWidth;
        setContainerHeight(totalScrollDistance + windowHeight); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100); 
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // 2. Robust Scrolling Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= 0 && rect.bottom > windowHeight) {
        setIsPinned(true);
        setIsEnded(false);
        setScrollProgress(Math.abs(rect.top)); 
      } else if (rect.bottom <= windowHeight) {
        setIsPinned(false);
        setIsEnded(true);
        if(cardsContainerRef.current) {
            setScrollProgress(cardsContainerRef.current.scrollWidth - window.innerWidth);
        }
      } else {
        setIsPinned(false);
        setIsEnded(false);
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerHeight]);

  return (
    <div 
      ref={targetRef}
      className="relative w-full bg-black"
      style={{ height: `${containerHeight}px` }} 
    >
      <div 
        className={`
          flex flex-col justify-center overflow-hidden h-screen  w-full
          ${isPinned ? 'fixed top-0 left-0 z-20' : 'absolute'}
          ${isEnded ? 'bottom-10 top-auto' : 'top-0'}
        `}
      >
        
        {/* Header */}
        <div className="top-5 left-12 z-10 mb-8 pointer-events-none px-12">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tighter md:pt-5">

        CREATIVE LEADERS <span className="text-blue-700">20<span className='text-yellow-500'>25</span></span>
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Meet the changemakers transforming communities across the nation
          </p>
        </div>

        {/* Moving Strip */}
        <div 
          ref={cardsContainerRef}
          className="flex gap-8 px-12 items-center will-change-transform"
          style={{ transform: `translateX(-${scrollProgress}px)` }}
        >
          {leaders.map((leader, index) => (
            <LeaderCard 
              key={leader.id} 
              leader={leader} 
              index={index} 
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderCard = ({ leader, index, scrollProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !cardRef.current || !videoRef.current) return;

    const checkPosition = () => {
      const card = cardRef.current;
      const video = videoRef.current;
      const rect = card.getBoundingClientRect();
      const screenCenter = window.innerWidth / 2;
      const cardCenter = rect.left + rect.width / 2;
      
      const isInCenter = Math.abs(cardCenter - screenCenter) < 200;
      
      if (isInCenter && !isPlaying) {
        video.play().catch(e => console.log('Play failed:', e));
        setIsPlaying(true);
      } else if (!isInCenter && isPlaying) {
        video.pause();
        setIsPlaying(false);
      }
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    
    return () => window.removeEventListener('scroll', checkPosition);
  }, [isMobile, isPlaying, scrollProgress]);

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Play failed:', e));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleCardClick = () => {
    console.log(`Clicked on ${leader.name}`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="relative group flex-shrink-0 w-[85vw] md:w-[600px] h-[60vh] md:h-[450px] overflow-hidden cursor-pointer  bg-black "
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${leader.image})` }}
      />
      
      {/* Video Layer */}
      {leader.video && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isPlaying ? 1 : 0 }}
          src={leader.video}
          loop
          muted
          playsInline
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/95 opacity-90 transition-opacity duration-500" />
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500"
        style={{ backgroundColor: leader.color }}
      />

      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="overflow-hidden">
          <p className="text-purple-300 text-xs font-bold tracking-[0.2em] uppercase mb-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {leader.organization}
          </p>
        </div>
        
        <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 leading-tight">
          {leader.name}
        </h3>
        
        <p className="text-white/70 text-sm font-semibold mb-4">
          {leader.role}
        </p>
        
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
          <p className="text-white/80 text-base leading-relaxed max-w-md mb-4">
            {leader.description}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-bold text-sm">{leader.impact}</span>
            </div>
          </div>
         
        </div>
      </div>

    
    </div>
  );
};

export default CommunityLeaders;