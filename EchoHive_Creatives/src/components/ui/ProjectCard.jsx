import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-project group"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="overlay-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <button className="btn-primary flex items-center gap-2">
            View Case Study
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <span className="text-primary-yellow text-sm font-mono">{project.year}</span>
        </div>
        <p className="text-neutral-cloud mb-4">{project.client}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}