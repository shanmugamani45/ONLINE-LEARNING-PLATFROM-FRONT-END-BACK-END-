import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap, Trophy, Users } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: courses, isLoading } = useCourses();

  // Show only first 3 courses for featured section
  const featuredCourses = courses?.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              🚀 Launch your career today
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6">
              Master the skills of <br />
              <span className="text-gradient">tomorrow, today.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Unlock your potential with expert-led courses in coding, design, and business. 
              Learn at your own pace from industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                  Explore Courses
                </Button>
              </Link>
              <Link href="/instructors">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-white/10 hover:bg-white/5">
                  Meet Instructors
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Students", value: "10k+" },
              { icon: Zap, label: "Courses", value: "200+" },
              { icon: Trophy, label: "Instructors", value: "50+" },
              { icon: CheckCircle2, label: "Satisfaction", value: "99%" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mb-3" />
                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-muted-foreground">Hand-picked top rated courses for you</p>
            </div>
            <Link href="/courses">
              <Button variant="ghost" className="hidden md:flex items-center gap-2 hover:text-primary">
                View all courses <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
          
          <div className="mt-8 md:hidden text-center">
             <Link href="/courses">
              <Button variant="outline" className="w-full">
                View all courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-primary/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already learning on NovaLearn. 
              Get unlimited access to all courses with our premium plan.
            </p>
            <Link href="/enroll">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 scale-105">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
