// src/components/react/admin/AdminAnnouncementsManager.tsx
import { useState } from 'react';
import type { AnnouncementItem } from '../../../services/announcementService';
import {
  Megaphone,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  ExternalLink,
  Eye,
  Sparkles,
  ArrowUpDown,
  Check,
  AlertCircle
} from 'lucide-react';

interface Props {
  initialAnnouncements: AnnouncementItem[];
}

const EMOJI_PRESETS = ['🔥', '❄️', '🚚', '⭐', '⚡', '🛡️', '🎁', '🎉', '🏷️', '📢'];

export default function AdminAnnouncementsManager({ initialAnnouncements }: Props) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [icon, setIcon] = useState('🔥');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openAddModal = () => {
    setEditingId(null);
    setIcon('🔥');
    setText('');
    setLink('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (item: AnnouncementItem) => {
    setEditingId(item.id);
    setIcon(item.icon);
    setText(item.text);
    setLink(item.link || '');
    setIsActive(item.isActive);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Please enter announcement text.');
      return;
    }

    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                icon,
                text: text.trim(),
                link: link.trim() || undefined,
                isActive,
              }
            : item
        )
      );
      showToast('Announcement updated successfully!');
    } else {
      const newItem: AnnouncementItem = {
        id: `ann-${Date.now()}`,
        icon,
        text: text.trim(),
        link: link.trim() || undefined,
        isActive,
        order: announcements.length + 1,
      };
      setAnnouncements((prev) => [...prev, newItem]);
      showToast('New announcement created and published!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this announcement?')) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      showToast('Announcement removed.');
    }
  };

  const handleToggleActive = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const activeItems = announcements.filter((a) => a.isActive);

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
            className="text-emerald-500 hover:text-emerald-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-rose-500" />
            <span>Top Announcement Bar Ticker</span>
          </h2>
          <p className="text-xs text-slate-500">
            Control the top marquee scrolling ticker displayed at the very top of your storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Announcement</span>
        </button>
      </div>

      {/* Live Storefront Ticker Simulation */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
            <Eye className="w-4 h-4 text-rose-500" />
            <span>Live Ticker Simulation (Storefront View)</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            {activeItems.length} active announcements
          </span>
        </div>

        {/* The Simulation Bar */}
        <div className="bg-indigo-950 text-slate-200 text-xs py-2.5 px-4 rounded-xl overflow-hidden relative select-none border border-indigo-900 shadow-inner">
          {activeItems.length > 0 ? (
            <div className="flex w-max animate-marquee space-x-12 cursor-default">
              {[1, 2].map((loop) => (
                <span key={loop} className="inline-flex items-center gap-6 font-medium tracking-wide">
                  {activeItems.map((item, idx) => (
                    <span key={`${item.id}-${loop}`} className="inline-flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                      {idx < activeItems.length - 1 && (
                        <span className="mx-4 text-slate-500">•</span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-400 text-xs py-1">
              No active announcements. The top announcement bar is currently hidden on the storefront.
            </div>
          )}
        </div>
      </div>

      {/* Announcements Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-indigo-950">Active &amp; Scheduled Announcements</h3>
          <span className="text-xs text-slate-400">Total: {announcements.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/80 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-5">Icon</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Link Destination</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {announcements.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  {/* Icon */}
                  <td className="py-4 px-5 text-lg">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      {item.icon}
                    </span>
                  </td>

                  {/* Text */}
                  <td className="py-4 px-4 font-semibold text-indigo-950 max-w-md">
                    <span>{item.text}</span>
                  </td>

                  {/* Destination Link */}
                  <td className="py-4 px-4 text-slate-500">
                    {item.link ? (
                      <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                        {item.link}
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  {/* Active Toggle Switch */}
                  <td className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition ${
                        item.isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>{item.isActive ? 'Live (Active)' : 'Inactive'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-slate-500 hover:text-indigo-950 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                        title="Edit Announcement"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-indigo-950">
                    {editingId ? 'Edit Announcement' : 'Create Top Announcement'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure the text and symbol displayed on the global header ticker.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Emoji Icon Selector */}
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Symbol / Emoji Icon
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {EMOJI_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setIcon(preset)}
                      className={`w-9 h-9 rounded-xl text-base flex items-center justify-center transition cursor-pointer ${
                        icon === preset
                          ? 'bg-rose-500 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom emoji..."
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  maxLength={4}
                />
              </div>

              {/* Message Text */}
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Announcement Message *
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Free Cash on Delivery for orders above ৳2,500 across Bangladesh!"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  required
                />
              </div>

              {/* Optional Destination Link */}
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1.5">
                  Optional Click Link (URL or relative path)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /products or /track-order"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              {/* Active Toggle */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div>
                  <p className="text-xs font-bold text-indigo-950">Show Immediately</p>
                  <p className="text-[11px] text-slate-400">Include in the live storefront marquee</p>
                </div>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400 border-slate-300 accent-rose-500 cursor-pointer"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white transition shadow-sm cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Publish Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
