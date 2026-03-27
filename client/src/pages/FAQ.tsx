import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "Navigate to the course details page and click the 'Enroll Now' button. You'll need to provide your email to receive access credentials instantly."
    },
    {
      question: "Are the courses self-paced?",
      answer: "Yes! Once you enroll, you have lifetime access to the course materials. You can learn at your own speed and revisit lectures anytime."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Absolutely. Every course includes a verified certificate of completion that you can share on your LinkedIn profile or resume."
    },
    {
      question: "What if I'm not satisfied with the course?",
      answer: "We offer a 30-day money-back guarantee. If you're not happy with your learning experience, contact support for a full refund."
    },
    {
      question: "Can I access courses on mobile?",
      answer: "Yes, our platform is fully responsive. You can watch lectures and complete assignments on any device, including smartphones and tablets."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-center mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-muted-foreground text-lg mb-12">
          Everything you need to know about NovaLearn.
        </p>

        <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-white/10 last:border-0 px-2">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
