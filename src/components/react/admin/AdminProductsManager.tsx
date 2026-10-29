// src/components/react/admin/AdminProductsManager.tsx
import { useState, useMemo } from 'react';
import type { Product, Category } from '../../../services/productService';
import Pagination from '../Pagination';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  ExternalLink,
  Sparkles,
  Tag,
  ChevronDown,
  RotateCcw
} from 'lucide-react';

interface Props {
  initialProducts: Product[];
  categories: Category[];
}

const ITEMS_PER_PAGE = 6;

export default function AdminProductsManager({ initialProducts, categories }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add / Edit
  const [formState, setFormState] = useState({
    title: '',
    category: 'Hoodies' as Product['category'],
    price: 1200,
    originalPrice: 1600,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending',
  });

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      const pCat = p.category.toLowerCase();
      const sCat = selectedCategory.toLowerCase();
      const matchesCategory =
        selectedCategory === 'all' ||
        pCat === sCat ||
        sCat.includes(pCat) ||
        pCat.includes(sCat);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Paginated Products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormState({
      title: '',
      category: 'Hoodies',
      price: 1200,
      originalPrice: 1600,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      badge: 'Trending',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      title: product.title,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      badge: product.badge || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title) return;

    if (editingProduct) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: formState.title,
                category: formState.category,
                price: Number(formState.price),
                originalPrice: Number(formState.originalPrice),
                image: formState.image,
                badge: formState.badge || undefined,
              }
            : p
        )
      );
    } else {
      // Create new
      const newProduct: Product = {
        id: `prod-${Date.now().toString().slice(-4)}`,
        title: formState.title,
        category: formState.category,
        price: Number(formState.price),
        originalPrice: Number(formState.originalPrice),
        image: formState.image,
        images: [formState.image],
        rating: 4.8,
        reviewCount: 1,
        badge: formState.badge || undefined,
        isFeatured: true,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the live catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header & Statistics Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Package className="w-5 h-5 text-rose-500" />
            <span>Product Catalog Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Add, update pricing, manage stock, and publish items to the live storefront.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, SKU, category..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
            />
          </div>

          {/* Category Dropdown Filter */}
          <div className="relative w-full sm:w-64">
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-9 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition cursor-pointer appearance-none shadow-2xs"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters Shortcut */}
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer flex items-center gap-1 self-start sm:self-auto shrink-0"
              title="Reset search and filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Total Count Indicator */}
        <div className="text-xs text-slate-400 font-semibold hidden md:block">
          Showing <span className="font-extrabold text-indigo-950">{filteredProducts.length}</span> of{' '}
          <span className="font-extrabold text-indigo-950">{products.length}</span> products
        </div>

      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            
            {/* Table Header */}
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200/80 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Product Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Discount</th>
                <th className="py-3.5 px-4">Badge</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((p) => {
                  const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      
                      {/* Title & Image */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <a
                              href={`/products/${p.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-indigo-950 hover:text-rose-500 transition truncate block max-w-xs sm:max-w-md"
                            >
                              {p.title}
                            </a>
                            <span className="text-[11px] text-slate-400 font-mono">SKU: {p.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-semibold text-slate-600">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px]">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-black text-indigo-950">
                        <span>৳{p.price.toLocaleString()}</span>
                        <span className="text-slate-400 font-normal line-through ml-1.5 text-[11px]">
                          ৳{p.originalPrice.toLocaleString()}
                        </span>
                      </td>

                      {/* Discount */}
                      <td className="py-3.5 px-4 font-bold text-emerald-600">
                        {discount > 0 ? `${discount}% OFF` : '—'}
                      </td>

                      {/* Badge */}
                      <td className="py-3.5 px-4">
                        {p.badge ? (
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 font-extrabold text-[10px] border border-rose-100 uppercase tracking-wider">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-950 hover:bg-slate-100 transition cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <a
                            href={`/products/${p.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                            title="View on Storefront"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <p className="font-bold text-sm text-indigo-950 mb-1">No products found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search query or category filters.</p>
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
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-indigo-950">
                  {editingProduct ? 'Edit Product Details' : 'Add New Winter Product'}
                </h3>
                <p className="text-xs text-slate-400">
                  {editingProduct ? `Updating SKU ${editingProduct.id}` : 'Publish a new item directly to the store'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Over-Sized Fleece Winter Hoodie"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Category</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  >
                    <option value="Hoodies">Hoodies</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Thermal">Thermal</option>
                    <option value="Shawls">Shawls</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller, New"
                    value={formState.badge}
                    onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Sale Price (৳) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Regular Price (৳) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formState.originalPrice}
                    onChange={(e) => setFormState({ ...formState, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1">Primary Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold shadow-sm shadow-rose-200 transition cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

