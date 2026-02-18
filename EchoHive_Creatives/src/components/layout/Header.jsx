import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../../assets/Images/fullLogo.png'
import { Link } from 'react-router-dom';

const logo = Logo;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const items = ['Work', 'Services', 'About', 'News', 'Contact'];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Check if user has scrolled at all
          if (currentScrollY > 10) {
            setHasScrolled(true);
          } else {
            setHasScrolled(false);
            setIsVisible(true);
            ticking = false;
            return;
          }

          // Scrolling down
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
            setIsOpen(false); // Close mobile menu when scrolling down
          }
          // Scrolling up
          else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const containerVariants = {
    closed: {
      opacity: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      y: 50,
      opacity: 0,
      rotateX: -45,
      transition: {
        y: { stiffness: 1000 }
      }
    },
    open: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-2 flex justify-between items-center mix-blend-difference text-white"
    >
      <div className='w-24 z-50'>
        <Link to='/'> <img src={logo} alt="Echohive Logo" className="w-full h-auto" /> </Link>
      </div>

      <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase">
        {items.map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="hover:text-blue-400 transition-colors duration-300"
          >
            {item}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-50 p-2 hover:bg-white/10 rounded-full transition-colors relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <motion.div className="flex flex-col gap-8 text-center" style={{ perspective: 1000 }}>
              {items.map((item) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-bold text-white tracking-tight hover:text-blue-400 cursor-pointer"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
              exit={{ width: 0, opacity: 0 }}
              className="h-[1px] bg-white/20 mt-12"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;