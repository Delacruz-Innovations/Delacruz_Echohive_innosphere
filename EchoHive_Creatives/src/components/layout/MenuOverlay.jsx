import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import CalendlyPopup from '../CalendlyPopup'

export default function MenuOverlay({ isOpen, onClose }) {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-primary-navy/95 backdrop-blur-md z-50 md:hidden"
        >
          <div className="container-custom h-full flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end pt-6">
              <button onClick={onClose} className="text-white hover:text-primary-yellow">
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 flex flex-col justify-center gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="text-5xl font-display font-bold text-white hover:text-gradient-primary transition-all"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <div className="pb-12">
              <CalendlyPopup
                text="Let's Create Together"
                className="btn-primary w-full justify-center"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}