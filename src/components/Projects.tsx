import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { client, urlFor, isSanityConfigured } from '../sanityClient';
import { Project } from '../types';
import { cn, DEFAULT_PROJECTS } from '../utils';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'success' | 'progressing' | 'upcoming'>('success');

  useEffect(() => {
    if (!isSanityConfigured) {
      setProjects(DEFAULT_PROJECTS as any);
      return;
    }
    const query = '*[_type == "project"]';
    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(DEFAULT_PROJECTS as any);
      }
    }).catch(() => {
      setProjects(DEFAULT_PROJECTS as any);
    });
  }, []);

  const filteredProjects = projects.filter(p => p.category === activeTab);

  const tabs = [
    { id: 'success', label: 'Success' },
    { id: 'progressing', label: 'Progressing' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  return (
    <section id="projects" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">03 / Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Selected Works
            </h2>
          </div>

          <div className="flex gap-8 border-b border-white/10 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative pb-4",
                  activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden bg-white/5"
              >
                <img
                  src={urlFor(project.image).url()}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-orange-500 font-bold mb-2">
                    {project.location} • {project.date}
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{project.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center text-white/20 font-serif italic text-2xl">
            More projects coming soon.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
