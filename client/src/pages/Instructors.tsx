import { useInstructors } from "@/hooks/use-courses";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, BadgeCheck } from "lucide-react";

export default function Instructors() {
  const { data: instructors, isLoading } = useInstructors();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            Learn from the <span className="text-gradient">Best</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our instructors are industry experts, thought leaders, and innovators passionate about sharing their knowledge.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <Skeleton key={n} className="h-[400px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors?.map((instructor, i) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl glass-card border-none bg-zinc-900/50"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={instructor.imageUrl} 
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-white">{instructor.name}</h3>
                    <BadgeCheck className="w-5 h-5 text-primary fill-current" />
                  </div>
                  <p className="text-primary font-medium mb-3">{instructor.title}</p>
                  <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                    {instructor.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {instructor.expertise.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-white/10 border border-white/5 text-gray-200">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
