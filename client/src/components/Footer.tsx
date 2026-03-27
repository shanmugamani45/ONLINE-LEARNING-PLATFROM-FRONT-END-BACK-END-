import { Rocket, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold font-display text-white">
                Nova<span className="text-primary">Learn</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevate your skills with premium courses designed for the future. Join thousands of learners worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/courses"><span className="hover:text-primary cursor-pointer transition-colors">All Courses</span></Link></li>
              <li><Link href="/instructors"><span className="hover:text-primary cursor-pointer transition-colors">Instructors</span></Link></li>
              <li><Link href="/pricing"><span className="hover:text-primary cursor-pointer transition-colors">Pricing</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="hover:text-primary cursor-pointer transition-colors">About Us</span></Link></li>
              <li><Link href="/careers"><span className="hover:text-primary cursor-pointer transition-colors">Careers</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary cursor-pointer transition-colors">Contact</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 NovaLearn Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
