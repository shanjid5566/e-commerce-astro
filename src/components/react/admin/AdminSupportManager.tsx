// src/components/react/admin/AdminSupportManager.tsx
import { useState, useMemo } from 'react';
import type { ContactMessage } from '../../../services/supportService';
import {
  MessageSquare,
  Search,
  Phone,
  CheckCircle2,
  X,
  Send,
  MessageCircle,
} from 'lucide-react';

interface Props {
  initialMessages: ContactMessage[];
}

export default function AdminSupportManager({ initialMessages }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedId, setSelectedId] = useState<string>(initialMessages[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'New' | 'Replied' | 'Closed'>('All');

  // Response form
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        m.name.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [messages, searchQuery, statusFilter]);

  // Selected Message
  const selectedMessage = useMemo(() => {
    return messages.find((m) => m.id === selectedId) || filteredMessages[0] || null;
  }, [messages, selectedId, filteredMessages]);

  const newCount = messages.filter((m) => m.status === 'New').length;
  const repliedCount = messages.filter((m) => m.status === 'Replied').length;

  // Handle saving admin reply / response
  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedMessage.id
          ? {
              ...m,
              status: 'Replied',
              adminReply: {
                text: replyText.trim(),
                answeredAt: 'Just now',
                answeredBy: 'Admin',
              },
            }
          : m
      )
    );

    setReplyText('');
    showToast(`Response recorded for ${selectedMessage.name}!`);
  };

  return (
    <div className="h-full flex flex-col min-h-0 space-y-3">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs animate-in fade-in shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage('')}
            className="text-emerald-500 hover:text-emerald-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Search & Filter Bar (Compact, fits screen) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-2xs shrink-0">
        
        {/* Generous Search Input */}
        <div className="relative w-full sm:flex-1 sm:max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search messages by customer name, phone, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filters with Counts */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto shrink-0">
          {(['All', 'New', 'Replied', 'Closed'] as const).map((status) => {
            const isCurrent = statusFilter === status;
            const count =
              status === 'New'
                ? newCount
                : status === 'Replied'
                ? repliedCount
                : status === 'All'
                ? messages.length
                : messages.filter((m) => m.status === 'Closed').length;

            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-indigo-950 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : status === 'New' && newCount > 0
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split Workspace (Fills 100% remaining screen height) */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        
        {/* Left Column (5 cols): Messages List (Scrolls internally) */}
        <div className="lg:col-span-5 h-full flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-3 px-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
            <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              <span>Inquiries ({filteredMessages.length})</span>
            </span>
            <span className="text-[11px] text-slate-400">Click to reply</span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => setSelectedId(msg.id)}
                    className={`w-full text-left p-3.5 transition cursor-pointer flex flex-col gap-1.5 relative ${
                      isSelected
                        ? 'bg-rose-50/40 border-l-4 border-rose-500'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Header: Customer Name & Date */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-950 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                          {msg.name.charAt(0)}
                        </div>
                        <span className="font-bold text-indigo-950 text-xs">
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {msg.createdAt}
                      </span>
                    </div>

                    {/* Subject Tag & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 truncate max-w-[200px]">
                        {msg.subject}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                        msg.status === 'New'
                          ? 'bg-rose-100 text-rose-700'
                          : msg.status === 'Replied'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        ● {msg.status}
                      </span>
                    </div>

                    {/* Message Excerpt */}
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>

                    {/* Phone footer */}
                    <div className="pt-0.5 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-2.5 h-2.5 text-slate-400" />
                      <span>{msg.phone}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No contact form messages found.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (7 cols): Full Submission Details & Answer Box (Scrolls internally, composer fixed) */}
        <div className="lg:col-span-7 h-full flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          {selectedMessage ? (
            <div className="h-full flex flex-col min-h-0">
              
              {/* Submission Header Bar (Fixed, shrink-0) */}
              <div className="p-4 px-5 border-b border-slate-100 bg-slate-50/60 shrink-0 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">
                      ID: #{selectedMessage.id}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-semibold">{selectedMessage.createdAt}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-black text-indigo-950">{selectedMessage.subject}</span>
                  </div>

                  {/* Clean Status Pill */}
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    selectedMessage.status === 'New'
                      ? 'bg-rose-50 text-rose-600 border border-rose-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    ● {selectedMessage.status}
                  </span>
                </div>

                {/* Customer Contact & Direct Reach Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{selectedMessage.name}</span>
                    <span className="text-slate-400 font-mono text-[11px] font-semibold">({selectedMessage.phone})</span>
                  </div>

                  {/* Reach Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-bold text-slate-700 transition"
                    >
                      <Phone className="w-3 h-3 text-slate-500" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/88${selectedMessage.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedMessage.name)},%20this%20is%20WinterCart%20regarding%20your%20inquiry%20(${encodeURIComponent(selectedMessage.subject)}):`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg font-bold transition shadow-xs"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Scrollable Conversation Content Area */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/30">
                {/* Customer Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Customer Inquiry Message:
                  </label>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Recorded Staff Response (if answered) */}
                {selectedMessage.adminReply && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-rose-600 uppercase tracking-wider">
                        Recorded Staff Response:
                      </span>
                      <span className="text-slate-400 font-medium">
                        {selectedMessage.adminReply.answeredAt} by {selectedMessage.adminReply.answeredBy}
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {selectedMessage.adminReply.text}
                    </div>
                  </div>
                )}
              </div>

              {/* Fixed Response Composer at Bottom (shrink-0) */}
              <div className="p-4 px-5 border-t border-slate-200/80 bg-white shrink-0 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-950">
                    Record Answer / Notes:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Logs resolution &amp; marks message as Replied
                  </span>
                </div>

                <form onSubmit={handleSaveReply} className="space-y-2.5">
                  <textarea
                    rows={2}
                    placeholder={`Type response or resolution notes for ${selectedMessage.name}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition resize-none leading-relaxed"
                    required
                  />

                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Save Response &amp; Mark as Replied</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Select a message to view details and respond.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
