// src/components/react/ContactForm.tsx
import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Order & Delivery Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-10 shadow-xs text-center space-y-4 animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-indigo-950">Message Sent Successfully!</h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. One of our customer service representatives will contact you at <span className="font-semibold text-slate-800">{formData.phone}</span> shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', phone: '', subject: 'Order & Delivery Inquiry', message: '' });
          }}
          className="text-xs font-bold text-rose-500 hover:underline pt-2 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
      <h3 className="text-lg font-black text-indigo-950 mb-1">Send Us a Direct Message</h3>
      <p className="text-xs text-slate-500 mb-6">Fill in the form below and we will respond within 2 to 4 hours.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="e.g. Tanvir Ahmed"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number *
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none transition cursor-pointer"
            >
              <option>Order &amp; Delivery Inquiry</option>
              <option>Size Exchange Request</option>
              <option>Product Defect / Quality Issue</option>
              <option>Corporate &amp; Bulk Winter Gifting</option>
              <option>Other Questions</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Your Message *
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            placeholder="Tell us how we can assist you..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-xl transition shadow-md shadow-rose-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Send Message</span>
        </button>
      </form>
    </div>
  );
}

