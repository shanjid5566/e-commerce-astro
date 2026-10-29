// src/components/react/FAQAccordion.tsx
import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How long does delivery take and what are the shipping rates?',
    answer: 'Inside Dhaka City, home delivery typically takes 24 to 48 hours. Outside Dhaka across all 64 districts of Bangladesh, delivery takes 2 to 3 business days. Enjoy 100% FREE delivery on all orders above ৳2,500!'
  },
  {
    id: 'faq-2',
    question: 'Is Cash on Delivery (COD) available nationwide?',
    answer: 'Yes! We offer 100% Cash on Delivery across Bangladesh. You can inspect your parcel in front of the delivery rider upon arrival before completing payment.'
  },
  {
    id: 'faq-3',
    question: 'What is your size exchange and return policy?',
    answer: 'We provide a hassle-free 7-day exchange guarantee. If your clothing size does not fit perfectly, contact our support within 7 days for a quick, complimentary size replacement.'
  },
  {
    id: 'faq-4',
    question: 'What fabric quality and GSM do you use for winter wear?',
    answer: 'All our winter hoodies and sweatshirts are crafted from 350+ GSM premium heavyweight fleece and cotton. They are pre-shrunk, anti-pilling, and colorfast, ensuring long-lasting warmth without shrinkage.'
  },
  {
    id: 'faq-5',
    question: 'How can I track my order or contact customer care?',
    answer: 'You can reach our dedicated support team via hotline (+880 1700-000000) every day from 9:00 AM to 10:00 PM, or message us on WhatsApp and Facebook for immediate order tracking assistance.'
  }
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3.5">
      {FAQS.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-rose-300 shadow-md ring-1 ring-rose-500/10'
                : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
            }`}
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className={`text-sm sm:text-base font-bold transition-colors ${
                isOpen ? 'text-rose-600' : 'text-slate-900'
              }`}>
                {faq.question}
              </span>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                isOpen ? 'bg-rose-50 text-rose-500 rotate-180' : 'bg-slate-100 text-slate-500'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}

      {/* Support CTA Callout */}
      <div className="pt-8 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-indigo-950 text-white text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-rose-400" />
            <span className="font-semibold">Still have questions?</span>
          </div>
          <span className="hidden sm:inline text-indigo-400">•</span>
          <span className="text-slate-300">Our support team is ready to help:</span>
          <a
            href="tel:+8801700000000"
            className="font-bold text-rose-400 hover:text-white transition underline underline-offset-4"
          >
            +880 1700-000000
          </a>
        </div>
      </div>
    </div>
  );
}
