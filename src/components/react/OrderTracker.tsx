// src/components/react/OrderTracker.tsx
import { useState } from 'react';
import { Search, Package, CheckCircle2, Truck, Clock, MapPin, Phone, AlertCircle } from 'lucide-react';

export default function OrderTracker() {
  const [orderId, setOrderId] = useState('WC-84920');
  const [phone, setPhone] = useState('01700000000');
  const [isSearched, setIsSearched] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setIsSearched(true);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="order-id" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Order ID
              </label>
              <input
                id="order-id"
                type="text"
                placeholder="e.g. WC-84920"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="phone-number" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Recipient Phone
              </label>
              <input
                id="phone-number"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-xl transition shadow-md shadow-rose-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Track Winter Parcel</span>
          </button>
        </form>
      </div>

      {/* Tracking Result View */}
      {isSearched && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto space-y-8 animate-fadeIn">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Order ID:</span>
                <span className="font-mono font-black text-slate-900 text-base">{orderId}</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  In Transit
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Delivery To: Dhanmondi, Dhaka City</span>
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-semibold block">Estimated Delivery</span>
              <span className="text-sm sm:text-base font-extrabold text-indigo-950">
                Today by 6:00 PM
              </span>
            </div>
          </div>

          {/* 4-Step Visual Progress Timeline */}
          <div className="space-y-6">
            <h3 className="font-extrabold text-sm text-indigo-950 uppercase tracking-wider">
              Shipment Progress
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-6 sm:-left-8 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Order Placed &amp; Confirmed</p>
                  <p className="text-xs text-slate-500 mt-0.5">Order verified via customer service call.</p>
                  <span className="text-[10px] text-slate-400 font-medium">Oct 28, 2026 • 02:15 PM</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-6 sm:-left-8 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Quality Inspection &amp; Packing</p>
                  <p className="text-xs text-slate-500 mt-0.5">Apparel passed fabric inspection and packed into waterproof sleeve.</p>
                  <span className="text-[10px] text-slate-400 font-medium">Oct 28, 2026 • 05:40 PM</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4">
                <div className="absolute -left-6 sm:-left-8 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-rose-500 text-white flex items-center justify-center ring-4 ring-white shadow-xs shadow-rose-200">
                  <Truck className="w-3.5 sm:w-4 h-3.5 sm:h-4 animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-sm text-rose-600">Dispatched with Courier (Steadfast)</p>
                  <p className="text-xs text-slate-500 mt-0.5">Consignment SF-892102 sorted at Dhaka Central Sorting Hub.</p>
                  <span className="text-[10px] text-rose-500 font-bold">Oct 29, 2026 • 08:30 AM (Active)</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-start gap-4 opacity-50">
                <div className="absolute -left-6 sm:-left-8 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-slate-300 text-white flex items-center justify-center ring-4 ring-white">
                  <Package className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-700">Delivered &amp; Cash on Delivery Collected</p>
                  <p className="text-xs text-slate-400 mt-0.5">Doorstep delivery handoff with OTP verification.</p>
                  <span className="text-[10px] text-slate-400 font-medium">Pending Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Courier Details Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shadow-2xs">
                🚚
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Courier Partner</p>
                <p className="text-sm font-bold text-slate-900">Steadfast Courier (Tracking: SF-892102)</p>
              </div>
            </div>

            <a
              href="tel:+8801700000000"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition"
            >
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>Contact Dispatcher</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

