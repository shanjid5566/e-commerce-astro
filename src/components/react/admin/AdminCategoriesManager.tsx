// src/components/react/admin/AdminCategoriesManager.tsx
import { useState } from 'react';
import type { Category } from '../../../services/productService';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  X,
  FolderTree
} from 'lucide-react';

interface Props {
  initialCategories: Category[];
}

export default function AdminCategoriesManager({ initialCategories }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    slug: '',
    itemCount: 15,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
  });

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormState({
      name: '',
      slug: '',
      itemCount: 15,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormState({
      name: cat.name,
      slug: cat.slug,
      itemCount: cat.itemCount,
      image: cat.image,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name) return;

    const slug = formState.slug || formState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formState.name,
                slug: slug,
                itemCount: Number(formState.itemCount),
                image: formState.image,
              }
            : c
        )
      );
    } else {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: formState.name,
        slug: slug,
        itemCount: Number(formState.itemCount),
        image: formState.image,
      };
      setCategories((prev) => [...prev, newCat]);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Delete this product category from the store catalog?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-500" />
            <span>Category Collections Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Organize products into seasonal departments displayed on the homepage and sidebar filters.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition"
          >
            {/* Image Preview */}
            <div className="relative aspect-[4/4] bg-slate-100 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
              />
              <span className="absolute top-2 right-2 bg-indigo-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {cat.itemCount} Items
              </span>
            </div>

            {/* Info */}
            <div className="p-3.5 space-y-1">
              <h3 className="font-extrabold text-indigo-950 text-xs truncate">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                slug: /{cat.slug}
              </p>
            </div>

            {/* Actions */}
            <div className="px-3.5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`/products?category=${cat.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-slate-500 hover:text-rose-500 flex items-center gap-1 transition"
              >
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEditModal(cat)}
                  className="p-1 text-slate-500 hover:text-indigo-950 hover:bg-slate-200 rounded transition cursor-pointer"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded transition cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-indigo-950">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h3>
                <p className="text-xs text-slate-400">Store catalog department</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leather Jackets"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. jackets"
                    value={formState.slug}
                    onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-indigo-950 mb-1">Product Count</label>
                  <input
                    type="number"
                    min={0}
                    value={formState.itemCount}
                    onChange={(e) => setFormState({ ...formState, itemCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-indigo-950 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
                />
              </div>

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
                  {editingCategory ? 'Save Category' : 'Create Category'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

