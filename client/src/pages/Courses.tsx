import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/CourseCard";
import { useCourses } from "@/hooks/use-courses";
import { Skeleton } from "@/components/ui/skeleton";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const { data: courses, isLoading } = useCourses(search, category === "all" ? undefined : category);

  const categories = ["Design", "Development", "Business", "Marketing", "Photography"];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Explore Courses</h1>
          <p className="text-muted-foreground text-lg">Discover new skills and advance your career.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-black/20 border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="All Categories" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
            <Button 
              variant="link" 
              className="text-primary mt-4"
              onClick={() => { setSearch(""); setCategory(""); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
