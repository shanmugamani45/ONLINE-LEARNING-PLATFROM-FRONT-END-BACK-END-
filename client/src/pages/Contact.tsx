import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";
import { useContact } from "@/hooks/use-courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const contactSchema = insertContactMessageSchema.extend({
  email: z.string().email("Please enter a valid email"),
});

export default function Contact() {
  const mutation = useContact();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl font-bold font-display mb-6">Get in touch</h1>
              <p className="text-xl text-muted-foreground">
                Have questions about our courses? Want to become an instructor? 
                We'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email Us</h3>
                  <p className="text-muted-foreground">support@novalearn.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Call Us</h3>
                  <p className="text-muted-foreground">+91 9344495576</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Visit Us</h3>
                  <p className="text-muted-foreground">123 Innovation Dr, Tech City, TC 90210</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 md:p-10 rounded-3xl border border-white/10"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  className="bg-black/20 border-white/10 h-12"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  className="bg-black/20 border-white/10 h-12"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="bg-black/20 border-white/10 min-h-[150px] resize-none"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-lg shadow-lg shadow-primary/20"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
