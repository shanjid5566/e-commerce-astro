// src/components/react/admin/AdminSupportManager.tsx
import { useState, useMemo } from 'react';
import type { SupportTicket, SupportReply } from '../../../services/supportService';
import {
  Headphones,
  Search,
  MessageSquare,
  Send,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ExternalLink,
  Sparkles,
  User,
  ShoppingBag,
  CornerDownRight,
  Filter,
  Check
} from 'lucide-react';

interface Props {
  initialTickets: SupportTicket[];
}

export default function AdminSupportManager({ initialTickets }: Props) {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(initialTickets[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Answered' | 'Closed'>('All');
  
  // Reply Form State
  const [replyText, setReplyText] = useState('');
  const [newStatus, setNewStatus] = useState<SupportTicket['status']>('Answered');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filtered Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch =
        t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.customerPhone.includes(searchQuery) ||
        t.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.orderId && t.orderId.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchQuery, statusFilter]);

  // Selected Ticket Object
  const selectedTicket = useMemo(() => {
    return tickets.find((t) => t.id === selectedTicketId) || filteredTickets[0] || null;
  }, [tickets, selectedTicketId, filteredTickets]);

  // Counts
  const pendingCount = tickets.filter((t) => t.status === 'Pending').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const answeredCount = tickets.filter((t) => t.status === 'Answered').length;

  // Handle Submitting Answer / Reply
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newReply: SupportReply = {
      id: `rep-${Date.now()}`,
      author: 'WinterCart Support Team',
      authorRole: 'Admin',
      message: replyText.trim(),
      createdAt: 'Just now',
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: newStatus,
              replies: [...t.replies, newReply],
            }
          : t
      )
    );

    setReplyText('');
    showToast(`Answer successfully sent to ${selectedTicket.customerName}!`);
  };

  // Canned Quick Response Presets
  const insertCannedResponse = (text: string) => {
    setReplyText(text);
  };

  // Update Status directly
  const handleUpdateStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
    );
    showToast(`Ticket status updated to "${status}"`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs animate-in fade-in">
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

      {/* Header & Quick Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Headphones className="w-5 h-5 text-rose-500" />
            <span>Customer Support Helpdesk</span>
          </h2>
          <p className="text-xs text-slate-500">
            Review incoming inquiries from the contact form, size exchange requests, and reply directly to customers.
          </p>
        </div>

        {/* Counter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{pendingCount} Awaiting Answer</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
            {inProgressCount} In Progress
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
            {answeredCount} Resolved
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tickets by customer, phone, order..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {(['All', 'Pending', 'In Progress', 'Answered', 'Closed'] as const).map((status) => {
            const isCurrent = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-950 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split Workspace: Master Ticket List & Answering Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Tickets List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider">
              Tickets ({filteredTickets.length})
            </span>
            <span className="text-[11px] text-slate-400">Click to answer</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[720px] overflow-y-auto">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                  <button
                    key={ticket.id}
                    type="button"
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`w-full text-left p-4.5 transition cursor-pointer flex flex-col gap-2 relative ${
                      isSelected
                        ? 'bg-rose-50/40 border-l-4 border-rose-500'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Header: Customer & Priority */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-950 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                          {ticket.customerName.charAt(0)}
                        </div>
                        <span className="font-bold text-indigo-950 text-xs">
                          {ticket.customerName}
                        </span>
                      </div>
                      
                      {/* Priority Tag */}
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        ticket.priority === 'High'
                          ? 'bg-rose-100 text-rose-700'
                          : ticket.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>

                    {/* Subject */}
                    <p className="font-extrabold text-slate-900 text-xs truncate">
                      {ticket.subject}
                    </p>

                    {/* Excerpt */}
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {ticket.message}
                    </p>

                    {/* Meta Bar */}
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                      <span>{ticket.createdAt}</span>
                      <span className={`font-extrabold px-2 py-0.5 rounded-full ${
                        ticket.status === 'Pending'
                          ? 'bg-rose-50 text-rose-600'
                          : ticket.status === 'In Progress'
                          ? 'bg-indigo-50 text-indigo-600'
                          : ticket.status === 'Answered'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        ● {ticket.status}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs space-y-1">
                <p className="font-bold text-slate-700">No support tickets found</p>
                <p>Adjust your search query or filter options.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Ticket Conversation & Answering Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {selectedTicket ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col">
              
              {/* Ticket Top Profile & Quick Contacts Bar */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-rose-500">
                        #{selectedTicket.id}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-semibold">{selectedTicket.createdAt}</span>
                    </div>
                    <h3 className="text-base font-black text-indigo-950 mt-0.5">
                      {selectedTicket.subject}
                    </h3>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-500">Status:</label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => handleUpdateStatus(selectedTicket.id, e.target.value as any)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-950 focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer shadow-2xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Answered">Answered</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Customer Contact Badges & WhatsApp Action */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-semibold shadow-2xs">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTicket.customerName}</span>
                  </div>

                  <a
                    href={`tel:${selectedTicket.customerPhone}`}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-semibold shadow-2xs transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTicket.customerPhone}</span>
                  </a>

                  <a
                    href={`mailto:${selectedTicket.customerEmail}`}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-semibold shadow-2xs transition"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[160px]">{selectedTicket.customerEmail}</span>
                  </a>

                  {selectedTicket.orderId && (
                    <a
                      href="/admin/orders"
                      className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1 rounded-lg text-rose-600 font-bold transition shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
                      <span>Order #{selectedTicket.orderId}</span>
                    </a>
                  )}

                  {/* One-click WhatsApp link */}
                  <a
                    href={`https://wa.me/88${selectedTicket.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedTicket.customerName)},%20regarding%20your%20WinterCart%20inquiry%20(#${selectedTicket.id}):`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg font-bold text-xs shadow-xs transition ml-auto"
                  >
                    <span>💬 WhatsApp Customer</span>
                  </a>
                </div>
              </div>

              {/* Message Thread Area */}
              <div className="p-6 space-y-5 max-h-[460px] overflow-y-auto bg-slate-50/30">
                {/* 1. Customer's Initial Inquiry */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-950 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                    {selectedTicket.customerName.charAt(0)}
                  </div>
                  <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl p-4.5 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-indigo-950">
                        {selectedTicket.customerName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {selectedTicket.createdAt}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {selectedTicket.message}
                    </p>
                  </div>
                </div>

                {/* 2. Thread of Admin Answers */}
                {selectedTicket.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-9 h-9 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                      WC
                    </div>
                    <div className="flex-1 bg-rose-50/60 border border-rose-100 rounded-2xl p-4.5 shadow-xs space-y-1.5 text-right">
                      <div className="flex items-center justify-between flex-row-reverse">
                        <span className="font-extrabold text-xs text-rose-600 flex items-center gap-1">
                          <span>{reply.author}</span>
                          <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded">STAFF</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {reply.createdAt}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-left whitespace-pre-line">
                        {reply.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Answering Composer Form */}
              <div className="p-5 border-t border-slate-200/80 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                    <span>Send Official Answer / Response</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Customer receives SMS / email alert
                  </span>
                </div>

                {/* Quick Canned Response Presets */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1">Quick Templates:</span>
                  {[
                    { label: 'Exchange Approved', text: 'Hello! Your size exchange request has been approved. Our delivery rider will deliver the replacement size to your doorstep and collect the previous item.' },
                    { label: 'Order Dispatched', text: 'Hello! Your package has been dispatched via Pathao Express and is scheduled for doorstep delivery within 24-48 hours.' },
                    { label: 'Delivery Policy', text: 'Hello! We offer cash on delivery across Bangladesh. Home delivery takes 1-2 days within Dhaka and 2-3 days outside Dhaka.' },
                    { label: 'Bulk Discount', text: 'Greetings! We have emailed you our custom corporate winter catalogue with bulk wholesale tier pricing.' },
                  ].map((tpl) => (
                    <button
                      key={tpl.label}
                      type="button"
                      onClick={() => insertCannedResponse(tpl.text)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition cursor-pointer"
                    >
                      +{tpl.label}
                    </button>
                  ))}
                </div>

                {/* Form Input */}
                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder={`Type your answer to ${selectedTicket.customerName}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition resize-none leading-relaxed"
                    required
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs">
                      <label className="text-slate-500 font-semibold">Set status after answer:</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as any)}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                      >
                        <option value="Answered">Answered</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={!replyText.trim()}
                      className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Official Answer</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
              Select a support ticket from the list to view conversation history and reply.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
