// src/components/react/admin/AdminOrdersManager.tsx
import { useState, useMemo } from 'react';
import Pagination from '../Pagination';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Eye,
  X,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

export interface AdminOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: { title: string; quantity: number; price: number }[];
  totalAmount: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'WC-98412',
    customerName: 'Tanvir Ahmed',
    phone: '01711-000111',
    address: 'Flat 4B, Road 7A, Dhanmondi',
    city: 'Dhaka',
    items: [
      { title: 'Over-Sized Fleece Streetwear Hoodie', quantity: 2, price: 1350 },
      { title: 'Ultra-Warm Seamless Thermal Set', quantity: 1, price: 890 },
    ],
    totalAmount: 3590,
    paymentMethod: 'Cash on Delivery',
    status: 'Processing',
    createdAt: 'Oct 29, 2026',
  },
  {
    id: 'WC-98411',
    customerName: 'Nusrat Jahan',
    phone: '01812-334455',
    address: 'House 12, Sector 4, Uttara',
    city: 'Dhaka',
    items: [
      { title: 'Biker Style Slim Leather Jacket', quantity: 1, price: 3500 },
    ],
    totalAmount: 3500,
    paymentMethod: 'Cash on Delivery',
    status: 'Shipped',
    createdAt: 'Oct 28, 2026',
  },
  {
    id: 'WC-98410',
    customerName: 'Rahim Chowdhury',
    phone: '01923-456789',
    address: 'Nasirabad Housing Society',
    city: 'Chittagong',
    items: [
      { title: 'Women Buttoned Knit Cardigan', quantity: 1, price: 1550 },
      { title: 'Traditional Kashmiri Embroidered Shawl', quantity: 1, price: 2200 },
    ],
    totalAmount: 3750,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    createdAt: 'Oct 27, 2026',
  },
  {
    id: 'WC-98409',
    customerName: 'Saiful Islam',
    phone: '01678-990011',
    address: 'Zindabazar Point',
    city: 'Sylhet',
    items: [
      { title: 'Lightweight Padded Winter Vest', quantity: 1, price: 1750 },
    ],
    totalAmount: 1750,
    paymentMethod: 'Cash on Delivery',
    status: 'Pending',
    createdAt: 'Oct 29, 2026',
  },
  {
    id: 'WC-98408',
    customerName: 'Sadia Rahman',
    phone: '01755-667788',
    address: 'Mirpur DOHS, Avenue 3',
    city: 'Dhaka',
    items: [
      { title: 'High-Neck Woolen Turtleneck Sweater', quantity: 2, price: 1290 },
    ],
    totalAmount: 2580,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    createdAt: 'Oct 26, 2026',
  },
  {
    id: 'WC-98407',
    customerName: 'Mahmudul Hasan',
    phone: '01511-223344',
    address: 'Shaheb Bazar',
    city: 'Rajshahi',
    items: [
      { title: 'Zippered Track Fleece Sweatshirt', quantity: 1, price: 1150 },
    ],
    totalAmount: 1150,
    paymentMethod: 'Cash on Delivery',
    status: 'Cancelled',
    createdAt: 'Oct 25, 2026',
  },
  {
    id: 'WC-98406',
    customerName: 'Kazi Farhan',
    phone: '01300-112233',
    address: 'Gulshan 2, Road 45',
    city: 'Dhaka',
    items: [
      { title: 'Over-Sized Fleece Streetwear Hoodie', quantity: 1, price: 1350 },
      { title: 'Biker Style Slim Leather Jacket', quantity: 1, price: 3500 },
    ],
    totalAmount: 4850,
    paymentMethod: 'Cash on Delivery',
    status: 'Processing',
    createdAt: 'Oct 29, 2026',
  },
];

const ITEMS_PER_PAGE = 5;

export default function AdminOrdersManager() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.phone.includes(searchQuery) ||
        o.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleUpdateStatus = (id: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const getStatusBadge = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
            <ShoppingBag className="w-3 h-3" />
            <span>Processing</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200">
            <Truck className="w-3 h-3" />
            <span>Shipped</span>
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <PackageCheck className="w-3 h-3" />
            <span>Delivered</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <span>Customer Orders & Delivery Dispatch</span>
          </h2>
          <p className="text-xs text-slate-500">
            View orders placed from the checkout and update parcel shipping status for real-time tracking.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-semibold bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl">
          Total Orders: <span className="font-extrabold text-indigo-950">{orders.length}</span>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order ID, customer, phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-indigo-950 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/80 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60 transition">
                    
                    <td className="py-3.5 px-4 sm:px-6">
                      <span className="font-extrabold text-indigo-950 font-mono block">
                        #{o.id}
                      </span>
                      <span className="text-[11px] text-slate-400">{o.createdAt}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{o.customerName}</span>
                      <span className="text-[11px] text-slate-400">{o.phone}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700 block">{o.city}</span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[150px] block">
                        {o.address}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-black text-indigo-950 block">৳{o.totalAmount.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Cash on Delivery</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value as any)}
                        className="text-xs font-bold rounded-lg border border-slate-200 px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer shadow-2xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(o)}
                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-700 font-bold px-3 py-1.5 rounded-lg transition text-xs cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <p className="font-bold text-sm text-indigo-950 mb-1">No orders matching criteria</p>
                    <p className="text-xs text-slate-400">Try changing status filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Integrated Pagination Component */}
        <div className="p-4 border-t border-slate-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            totalItems={filteredOrders.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>

      {/* Order Details / Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-100">
                  Customer Invoice
                </span>
                <h3 className="text-lg font-black text-indigo-950 mt-1">
                  Order #{selectedOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              
              {/* Customer Info Box */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <span className="text-[11px] text-slate-400 block">Customer Name</span>
                  <span className="font-bold text-indigo-950 text-sm">{selectedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Phone</span>
                  <span className="font-bold text-indigo-950 text-sm">{selectedOrder.phone}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200/60">
                  <span className="text-[11px] text-slate-400 block">Delivery Address</span>
                  <span className="font-medium text-slate-700">{selectedOrder.address}, {selectedOrder.city}</span>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] mb-2">
                  Purchased Items ({selectedOrder.items.length})
                </h4>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between bg-white">
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity} × ৳{item.price.toLocaleString()}</p>
                      </div>
                      <span className="font-black text-indigo-950">
                        ৳{(item.quantity * item.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="pt-2 flex items-center justify-between text-sm font-extrabold text-indigo-950">
                <span>Grand Total (Cash on Delivery):</span>
                <span className="text-base text-rose-500 font-black">
                  ৳{selectedOrder.totalAmount.toLocaleString()}
                </span>
              </div>

              {/* Status Update In Modal */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-600">Current Status:</span>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-indigo-950 text-white font-bold text-xs hover:bg-indigo-900 transition cursor-pointer"
              >
                Close Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

