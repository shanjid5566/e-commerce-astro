// src/components/react/admin/AdminDashboardOverview.tsx
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Layers,
  Sliders,
  Megaphone,
  MessageSquare,
  ArrowUpRight,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

export default function AdminDashboardOverview() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '৳148,500',
      change: '+18.4% from last month',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Total Orders',
      value: '34 Orders',
      change: '+6 pending dispatch',
      changeType: 'neutral',
      icon: ShoppingBag,
      color: 'bg-rose-50 text-rose-500 border-rose-100',
    },
    {
      title: 'Active Products',
      value: '12 Items',
      change: '100% in stock',
      changeType: 'positive',
      icon: Package,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'Hero Banner Items',
      value: '9 Live',
      change: 'Dynamic product slider',
      changeType: 'positive',
      icon: Sliders,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  const recentOrders = [
    { id: 'WC-98412', customer: 'Tanvir Ahmed', items: '2x Hoodies, 1x Thermal', total: 3590, status: 'Processing' },
    { id: 'WC-98411', customer: 'Nusrat Jahan', items: '1x Biker Leather Jacket', total: 3500, status: 'Shipped' },
    { id: 'WC-98410', customer: 'Rahim Chowdhury', items: '1x Cardigan, 1x Shawl', total: 3750, status: 'Delivered' },
    { id: 'WC-98409', customer: 'Saiful Islam', items: '1x Padded Winter Vest', total: 1750, status: 'Pending' },
  ];

  const categories = [
    { name: 'Hoodies & Sweatshirts', count: '42 items', progress: '85%' },
    { name: 'Jackets & Coats', count: '35 items', progress: '70%' },
    { name: 'Sweaters & Cardigans', count: '28 items', progress: '56%' },
    { name: 'Traditional Shawls', count: '24 items', progress: '48%' },
    { name: 'Thermal Base Layers', count: '19 items', progress: '38%' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Winter Season 2026 Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome Back, WinterCart Admin!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your storefront is running smoothly with high conversion on winter jackets and fleece hoodies. You have 6 orders awaiting fulfillment today.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="/admin/products"
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md shadow-rose-500/30 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </a>
            <a
              href="/admin/orders"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-4 py-2.5 rounded-xl transition"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Process Orders</span>
            </a>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-radial from-rose-500/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.title}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3 hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {st.title}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${st.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-indigo-950 tracking-tight">
                  {st.value}
                </div>
                <div className="text-[11px] font-semibold text-slate-400 mt-1 flex items-center gap-1">
                  <span>{st.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Recent Orders & Category Sales Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Recent Customer Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-indigo-950">Recent Customer Orders</h3>
              <p className="text-xs text-slate-400">Live order activity from the online storefront</p>
            </div>
            <a
              href="/admin/orders"
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-5">Order</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-5 font-mono font-bold text-indigo-950">
                      #{o.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{o.customer}</span>
                      <span className="text-[11px] text-slate-400 truncate max-w-xs block">{o.items}</span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-indigo-950">
                      ৳{o.total.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        o.status === 'Processing'
                          ? 'bg-blue-50 text-blue-700'
                          : o.status === 'Shipped'
                          ? 'bg-purple-50 text-purple-700'
                          : o.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Category Distribution & Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Management Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-sm text-indigo-950">Quick Actions</h3>
            
            <div className="space-y-2 text-xs">
              <a
                href="/admin/products"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition font-bold text-indigo-950 group"
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-rose-500" />
                  <span>Manage Products (12 items)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="/admin/orders"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition font-bold text-indigo-950 group"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-rose-500" />
                  <span>Manage Customer Orders</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="/admin/hero-slides"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition font-bold text-indigo-950 group"
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <span>Homepage Hero Banners</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="/admin/announcements"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition font-bold text-indigo-950 group"
              >
                <div className="flex items-center gap-2.5">
                  <Megaphone className="w-4 h-4 text-rose-500" />
                  <span>Top Announcement Ticker</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="/admin/support"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition font-bold text-indigo-950 group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-rose-500" />
                  <span>Contact Inquiries (2 new)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
              </a>

              <a
                href="/admin/categories"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition font-bold text-indigo-950 group"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Category Departments</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
              </a>
            </div>
          </div>

          {/* Catalog Share Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <h3 className="font-extrabold text-sm text-indigo-950">Category Distribution</h3>
            
            <div className="space-y-3">
              {categories.map((c) => (
                <div key={c.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{c.name}</span>
                    <span className="text-slate-400 text-[11px]">{c.count}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-950 to-rose-500 rounded-full"
                      style={{ width: c.progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

