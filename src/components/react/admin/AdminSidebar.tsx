// src/components/react/admin/AdminSidebar.tsx
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Sliders,
  Megaphone,
  MessageSquare,
  Ruler,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Store,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface Props {
  currentPath: string;
}

export default function AdminSidebar({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile drawer when route changes or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: currentPath === '/admin' || currentPath === '/admin/',
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: Package,
      active: currentPath.startsWith('/admin/products'),
      badge: '12',
    },
    {
      label: 'Categories',
      href: '/admin/categories',
      icon: Layers,
      active: currentPath.startsWith('/admin/categories'),
      badge: '5',
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: ShoppingBag,
      active: currentPath.startsWith('/admin/orders'),
      badge: 'New',
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      label: 'Hero Banners',
      href: '/admin/hero-slides',
      icon: Sliders,
      active: currentPath.startsWith('/admin/hero-slides'),
      badge: '9',
    },
    {
      label: 'Announcements',
      href: '/admin/announcements',
      icon: Megaphone,
      active: currentPath.startsWith('/admin/announcements'),
    },
    {
      label: 'Contact Messages',
      href: '/admin/support',
      icon: MessageSquare,
      active: currentPath.startsWith('/admin/support'),
      badge: '2 New',
      badgeColor: 'bg-rose-500 text-white',
    },
    {
      label: 'Size Guide',
      href: '/admin/size-guide',
      icon: Ruler,
      active: currentPath.startsWith('/admin/size-guide'),
    },
  ];

  return (
    <>
      {/* Mobile Top Header Toggle Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-indigo-950 text-white px-4 py-3 flex items-center justify-between border-b border-indigo-900/80 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-1 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <a href="/admin" className="flex items-center gap-2 font-black text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-xs">
              <Store className="w-4 h-4" />
            </div>
            <span>Winter<span className="text-rose-400">Cart</span></span>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/10 text-rose-300 tracking-wider">
              Admin
            </span>
          </a>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10"
        >
          <span>Store</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Backdrop Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-950 via-slate-950 to-indigo-950 text-slate-300 flex flex-col justify-between border-r border-indigo-900/80 shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="p-6 flex items-center justify-between border-b border-indigo-900/60">
            <a href="/admin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg text-white tracking-tight">
                    Winter<span className="text-rose-400">Cart</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Admin Console</span>
                </div>
              </div>
            </a>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 group ${
                    item.active
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 translate-x-1'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-rose-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                        item.badgeColor || (item.active ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Storefront Link & Admin Profile */}
        <div className="p-4 border-t border-indigo-900/60 space-y-3">
          
          {/* Quick link to storefront */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-indigo-900/30 hover:bg-indigo-900/60 border border-indigo-800/40 transition group"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-rose-400 group-hover:scale-110 transition" />
              <span>Visit Live Storefront</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition" />
          </a>

          {/* Admin User Chip */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-indigo-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 to-rose-500 flex items-center justify-center text-white text-xs font-black shadow-xs shrink-0">
                AD
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Super Admin</p>
                <p className="text-[10px] text-slate-400 truncate">admin@wintercart.com</p>
              </div>
            </div>

            <a
              href="/admin/login"
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </a>
          </div>

        </div>
      </aside>
    </>
  );
}

