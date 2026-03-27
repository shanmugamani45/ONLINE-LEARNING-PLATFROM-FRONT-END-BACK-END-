import { useCourse, useEnroll } from "@/hooks/use-courses";
import { useRoute } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  ChevronDown,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEnrollmentSchema } from "@shared/schema";

const enrollFormSchema = insertEnrollmentSchema.extend({
  studentEmail: z.string().email("Please enter a valid email"),
});

type ModuleType = {
  title: string;
  content: string[];
};

export default function CourseDetails() {
  const [match, params] = useRoute("/courses/:id");
  const id = params ? parseInt(params.id) : 0;

  const { data: course, isLoading } = useCourse(id);
  const enrollMutation = useEnroll();

  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof enrollFormSchema>>({
    resolver: zodResolver(enrollFormSchema),
    defaultValues: {
      courseId: id,
      studentEmail: "",
    },
  });

  const onEnroll = (data: z.infer<typeof enrollFormSchema>) => {
    enrollMutation.mutate(
      { ...data, courseId: id },
      {
        onSuccess: () => setEnrollDialogOpen(false),
      },
    );
  };

  const syllabus: ModuleType[] = useMemo(() => {
    if (!course?.syllabus) return [];
    if (!Array.isArray(course.syllabus)) return [];

    return course.syllabus.map((mod: any) => ({
      title: mod.title ?? "Untitled Module",
      content: Array.isArray(mod.content) ? mod.content : [],
    }));
  }, [course]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-[400px] w-full rounded-3xl mb-8" />
        <Skeleton className="h-12 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!course) return <div className="text-center py-20">Course not found</div>;

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-12 pt-32 bg-gradient-to-t from-background to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex gap-2 mb-4">
                <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold text-white">
                  {course.category}
                </span>
                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-white border border-white/10">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 max-w-4xl leading-tight">
                {course.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current mr-1" />
                  <span className="font-bold text-white text-lg">
                    {course.rating}
                  </span>
                  <span className="ml-1">(1.2k reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  2,300 Students
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">About this course</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="space-y-4">
                {syllabus.map((module, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-xl"
                  >
                    <button
                      onClick={() =>
                        setOpenAccordion(openAccordion === idx ? null : idx)
                      }
                      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-left">
                          {module.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openAccordion === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {openAccordion === idx && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 pl-16 space-y-3 border-t border-white/5">
                            {module.content.length === 0 ? (
                              <p className="text-sm text-muted-foreground">
                                No lessons listed for this module.
                              </p>
                            ) : (
                              module.content.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-3 text-sm text-muted-foreground"
                                >
                                  <PlayCircle className="w-4 h-4" />
                                  {item}
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card p-8 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/5">
              <div className="text-3xl font-bold mb-2">
                ${(course.price / 100).toFixed(2)}
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                One-time payment. Lifetime access.
              </p>

              <Dialog
                open={enrollDialogOpen}
                onOpenChange={setEnrollDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-lg h-14 shadow-lg shadow-primary/25 mb-4"
                  >
                    Enroll Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-white/10 bg-black/90 backdrop-blur-xl">
                  <DialogHeader>
                    <DialogTitle>Join {course.title}</DialogTitle>
                    <DialogDescription>
                      Enter your email to secure your spot.
                    </DialogDescription>
                  </DialogHeader>

                  <form
                    onSubmit={form.handleSubmit(onEnroll)}
                    className="space-y-4 pt-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        className="bg-white/5 border-white/10 focus-visible:ring-primary"
                        {...form.register("studentEmail")}
                      />
                      {form.formState.errors.studentEmail && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.studentEmail.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={enrollMutation.isPending}
                    >
                      {enrollMutation.isPending
                        ? "Processing..."
                        : "Confirm Enrollment"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Full Lifetime Access
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Certificate of Completion
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Premium Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
