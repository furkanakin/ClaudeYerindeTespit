"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span
          className={cn(
            "text-lg font-medium pr-8 transition-colors",
            isOpen ? "text-[#0D9488]" : "text-[#111827] group-hover:text-[#0D9488]"
          )}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            isOpen ? "bg-[#0D9488] text-white" : "bg-gray-100 text-gray-500"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-12">
              <p className="text-[#6B7280] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AccordionProps {
  items: { id: number; question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          index={index}
        />
      ))}
    </div>
  );
}
