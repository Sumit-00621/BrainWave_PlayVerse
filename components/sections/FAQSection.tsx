"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </motion.div>

      <div className="flex flex-col gap-3">
        {faqItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="glass-panel overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-sm font-semibold sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180 text-nova-400"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
