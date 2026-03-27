import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, Clock, BarChart } from "lucide-react";
import type { Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <motion.div 
        whileHover={{ y: -8, scale: 1.02 }}
        className="group cursor-pointer h-full glass-card rounded-2xl overflow-hidden flex flex-col"
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10 text-white">
            {course.category}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-foreground">{course.rating}</span>
            </div>
            <span className="text-muted-foreground text-xs">•</span>
            <div className="flex items-center text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {course.duration}
            </div>
            <span className="text-muted-foreground text-xs">•</span>
            <div className="flex items-center text-muted-foreground text-xs">
              <BarChart className="w-3.5 h-3.5 mr-1" />
              {course.level}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {course.description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <span className="text-2xl font-bold text-white">
              ${(course.price / 100).toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-primary group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
