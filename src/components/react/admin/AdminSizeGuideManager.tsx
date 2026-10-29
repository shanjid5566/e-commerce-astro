// src/components/react/admin/AdminSizeGuideManager.tsx
import { useState, useEffect } from 'react';
import {
  Ruler,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  ExternalLink,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Tag,
  Layers,
  ChevronDown,
  ChevronUp,
  Table as TableIcon
} from 'lucide-react';
import {
  getSizeCharts,
  saveSizeChart,
  deleteSizeChart,
  resetSizeChartsToDefault,
  getMeasurementTips,
  saveMeasurementTips,
  type SizeChart,
  type SizeChartRow,
  type MeasurementTip
} from '../../../services/sizeGuideService';

interface Props {
  initialCharts: SizeChart[];
  initialTips: MeasurementTip[];
}

export default function AdminSizeGuideManager({ initialCharts, initialTips }: Props) {
  const [charts, setCharts] = useState<SizeChart[]>(initialCharts);
  const [tips, setTips] = useState<MeasurementTip[]>(initialTips);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Sizing Guide Tips Section toggle
  const [isTipsExpanded, setIsTipsExpanded] = useState(false);
  const [editingTipIndex, setEditingTipIndex] = useState<number | null>(null);
  const [tipEditTitle, setTipEditTitle] = useState('');
  const [tipEditDesc, setTipEditDesc] = useState('');

  // Chart Modal State
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [editingChartId, setEditingChartId] = useState<string | null>(null);

  // Form Fields for Chart
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Hoodies');
  const [formFitType, setFormFitType] = useState('Regular / Relaxed Fit');
  const [formFabricTag, setFormFabricTag] = useState('');
  const [formUnit, setFormUnit] = useState('Inches');
  const [formColumns, setFormColumns] = useState<string[]>(['Chest (Round)', 'Body Length', 'Sleeve Length']);
  const [newColumnInput, setNewColumnInput] = useState('');
  const [formRows, setFormRows] = useState<SizeChartRow[]>([]);

  // Quick Add Row Modal state
  const [quickRowChartId, setQuickRowChartId] = useState<string | null>(null);
  const [quickRowSize, setQuickRowSize] = useState('S');
  const [quickRowMeasurements, setQuickRowMeasurements] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load local storage if available on client
    getSizeCharts().then((data) => setCharts(data));
    getMeasurementTips().then((data) => setTips(data));
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const categories = ['All', ...Array.from(new Set(charts.map((c) => c.category)))];

  const filteredCharts =
    selectedCategory === 'All'
      ? charts
      : charts.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());

  // Open Create Chart Modal
  const openCreateModal = () => {
    setEditingChartId(null);
    setFormTitle('New Apparel Sizing Chart');
    setFormCategory('Jackets');
    setFormFitType('Regular Fit');
    setFormFabricTag('Winter Fabric');
    setFormUnit('Inches');
    const defaultCols = ['Chest (Round)', 'Body Length', 'Sleeve Length'];
    setFormColumns(defaultCols);
    setNewColumnInput('');
    setFormRows([
      {
        id: `row-${Date.now()}-1`,
        size: 'M',
        measurements: { 'Chest (Round)': '40"', 'Body Length': '28"', 'Sleeve Length': '25"' },
      },
      {
        id: `row-${Date.now()}-2`,
        size: 'L',
        measurements: { 'Chest (Round)': '42"', 'Body Length': '29"', 'Sleeve Length': '25.5"' },
      },
      {
        id: `row-${Date.now()}-3`,
        size: 'XL',
        measurements: { 'Chest (Round)': '44"', 'Body Length': '30"', 'Sleeve Length': '26"' },
      },
    ]);
    setIsChartModalOpen(true);
  };

  // Open Edit Chart Modal
  const openEditModal = (chart: SizeChart) => {
    setEditingChartId(chart.id);
    setFormTitle(chart.title);
    setFormCategory(chart.category);
    setFormFitType(chart.fitType);
    setFormFabricTag(chart.fabricTag);
    setFormUnit(chart.unit);
    setFormColumns([...chart.columns]);
    setNewColumnInput('');
    setFormRows(JSON.parse(JSON.stringify(chart.rows)));
    setIsChartModalOpen(true);
  };

  // Add column to form
  const handleAddColumn = () => {
    const col = newColumnInput.trim();
    if (!col) return;
    if (formColumns.includes(col)) {
      alert('Column header already exists.');
      return;
    }
    setFormColumns([...formColumns, col]);
    setNewColumnInput('');
  };

  // Remove column from form
  const handleRemoveColumn = (colToRemove: string) => {
    if (formColumns.length <= 1) {
      alert('At least one measurement column is required.');
      return;
    }
    setFormColumns(formColumns.filter((c) => c !== colToRemove));
    // Also remove from row measurements
    setFormRows(
      formRows.map((row) => {
        const updated = { ...row.measurements };
        delete updated[colToRemove];
        return { ...row, measurements: updated };
      })
    );
  };

  // Add Row to form
  const handleAddFormRow = () => {
    const newRow: SizeChartRow = {
      id: `row-${Date.now()}-${formRows.length}`,
      size: 'XXL',
      measurements: {},
    };
    formColumns.forEach((col) => {
      newRow.measurements[col] = '';
    });
    setFormRows([...formRows, newRow]);
  };

  // Delete Row from form
  const handleDeleteFormRow = (rowId: string) => {
    if (formRows.length <= 1) {
      alert('At least one size row is required.');
      return;
    }
    setFormRows(formRows.filter((r) => r.id !== rowId));
  };

  // Update row measurement value in form
  const handleRowValueChange = (rowId: string, col: string, value: string) => {
    setFormRows((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              measurements: {
                ...row.measurements,
                [col]: value,
              },
            }
          : row
      )
    );
  };

  // Update row size label (e.g. M, L, XL)
  const handleRowSizeChange = (rowId: string, newSize: string) => {
    setFormRows((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, size: newSize } : row))
    );
  };

  // Save Chart
  const handleSaveChart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please provide a chart title.');
      return;
    }

    const chartToSave: SizeChart = {
      id: editingChartId || `chart-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory.trim() || 'General',
      fitType: formFitType.trim() || 'Standard Fit',
      fabricTag: formFabricTag.trim() || 'Fabric Fit Guide',
      unit: formUnit.trim() || 'Inches',
      columns: formColumns,
      rows: formRows,
    };

    const updated = await saveSizeChart(chartToSave);
    setCharts(updated);
    setIsChartModalOpen(false);
    showToast(editingChartId ? 'Size chart updated successfully!' : 'New size chart created!');
  };

  // Delete Chart
  const handleDeleteChart = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = await deleteSizeChart(id);
      setCharts(updated);
      showToast('Size chart removed.');
    }
  };

  // Quick Add Row inside a specific chart card directly
  const openQuickRowModal = (chart: SizeChart) => {
    setQuickRowChartId(chart.id);
    setQuickRowSize('3XL');
    const initialValues: Record<string, string> = {};
    chart.columns.forEach((col) => {
      initialValues[col] = '';
    });
    setQuickRowMeasurements(initialValues);
  };

  const handleSaveQuickRow = async () => {
    if (!quickRowChartId) return;
    const chart = charts.find((c) => c.id === quickRowChartId);
    if (!chart) return;

    const newRow: SizeChartRow = {
      id: `row-${Date.now()}`,
      size: quickRowSize.trim() || 'Custom',
      measurements: quickRowMeasurements,
    };

    const updatedChart: SizeChart = {
      ...chart,
      rows: [...chart.rows, newRow],
    };

    const updated = await saveSizeChart(updatedChart);
    setCharts(updated);
    setQuickRowChartId(null);
    showToast(`Added size ${newRow.size} to ${chart.category}!`);
  };

  // Delete Row directly from chart card
  const handleDeleteRowDirect = async (chartId: string, rowId: string) => {
    const chart = charts.find((c) => c.id === chartId);
    if (!chart) return;
    if (chart.rows.length <= 1) {
      alert('A chart must have at least one size row.');
      return;
    }
    const updatedChart: SizeChart = {
      ...chart,
      rows: chart.rows.filter((r) => r.id !== rowId),
    };
    const updated = await saveSizeChart(updatedChart);
    setCharts(updated);
    showToast('Size row removed.');
  };

  // Reset to default
  const handleResetDefaults = async () => {
    if (confirm('Reset all size charts and measurement guidelines back to factory defaults?')) {
      const def = await resetSizeChartsToDefault();
      setCharts(def);
      showToast('All sizing charts reset to factory defaults.');
    }
  };

  // Tip Editing
  const startEditTip = (index: number) => {
    setEditingTipIndex(index);
    setTipEditTitle(tips[index].title);
    setTipEditDesc(tips[index].description);
  };

  const saveTipEdit = async () => {
    if (editingTipIndex === null) return;
    const updated = [...tips];
    updated[editingTipIndex] = {
      ...updated[editingTipIndex],
      title: tipEditTitle.trim(),
      description: tipEditDesc.trim(),
    };
    setTips(updated);
    await saveMeasurementTips(updated);
    setEditingTipIndex(null);
    showToast('Measurement guide step updated!');
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-rose-500" />
            <span>Store Size Guide &amp; Measurement Charts</span>
          </h2>
          <p className="text-xs text-slate-500">
            Manage measurement charts and sizing recommendations displayed to customers on the storefront.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition cursor-pointer"
            title="Restore original factory size charts"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/size-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-950 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <span>Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sizing Chart</span>
          </button>
        </div>
      </div>

      {/* Sizing Measurement Instructions (Collapsible Section) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => setIsTipsExpanded(!isTipsExpanded)}
          className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 transition cursor-pointer text-left"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-indigo-950">
                Measurement Methodology Guidelines (4 Steps)
              </h3>
              <p className="text-xs text-slate-500">
                Instructions shown above size tables explaining how to measure Chest, Length, Sleeves &amp; Shoulders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>{isTipsExpanded ? 'Collapse' : 'Configure'}</span>
            {isTipsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isTipsExpanded && (
          <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/40">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
              {tips.map((tip, idx) => {
                const isEditing = editingTipIndex === idx;
                return (
                  <div
                    key={tip.step}
                    className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-md bg-rose-50 text-rose-500 font-bold text-xs flex items-center justify-center">
                        {tip.step}
                      </span>
                      {!isEditing && (
                        <button
                          type="button"
                          onClick={() => startEditTip(idx)}
                          className="text-slate-400 hover:text-indigo-950 p-1 cursor-pointer"
                          title="Edit instruction"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={tipEditTitle}
                          onChange={(e) => setTipEditTitle(e.target.value)}
                          className="w-full text-xs font-bold p-1.5 border border-slate-200 rounded-lg"
                        />
                        <textarea
                          rows={3}
                          value={tipEditDesc}
                          onChange={(e) => setTipEditDesc(e.target.value)}
                          className="w-full text-xs p-1.5 border border-slate-200 rounded-lg leading-relaxed resize-none"
                        />
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingTipIndex(null)}
                            className="text-[11px] font-bold text-slate-500 px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={saveTipEdit}
                            className="text-[11px] font-bold text-white bg-rose-500 px-2.5 py-1 rounded-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-extrabold text-indigo-950 text-xs">{tip.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{tip.description}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-indigo-950 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
            }`}
          >
            <span>{cat}</span>
            <span
              className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {cat === 'All'
                ? charts.length
                : charts.filter((c) => c.category.toLowerCase() === cat.toLowerCase()).length}
            </span>
          </button>
        ))}
      </div>

      {/* Sizing Charts List */}
      <div className="space-y-6">
        {filteredCharts.length > 0 ? (
          filteredCharts.map((chart) => (
            <div
              key={chart.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden"
            >
              {/* Chart Card Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 border border-rose-100 tracking-wider">
                      {chart.fabricTag || chart.category}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {chart.fitType}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Unit: {chart.unit}
                    </span>
                    {chart.updatedAt && (
                      <span className="text-[10px] text-slate-400">• Updated {chart.updatedAt}</span>
                    )}
                  </div>
                  <h3 className="text-base font-extrabold text-indigo-950">
                    {chart.title}
                  </h3>
                </div>

                {/* Card Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openQuickRowModal(chart)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-950 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-rose-500" />
                    <span>Add Size Row</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditModal(chart)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-950 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-2xs cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Chart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteChart(chart.id, chart.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete entire size chart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-black text-indigo-950">Size</th>
                      {chart.columns.map((col) => (
                        <th key={col} className="py-3 px-4">{col}</th>
                      ))}
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {chart.rows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-4 font-black text-indigo-950 text-sm">
                          <span className="inline-block bg-slate-100 px-2 py-0.5 rounded-md">
                            {row.size}
                          </span>
                        </td>
                        {chart.columns.map((col) => (
                          <td key={col} className="py-3.5 px-4 font-medium">
                            {row.measurements[col] || <span className="text-slate-300">—</span>}
                          </td>
                        ))}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteRowDirect(chart.id, row.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title={`Delete size ${row.size}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
            No sizing charts found for "{selectedCategory}". Click "Add Sizing Chart" above to create one.
          </div>
        )}
      </div>

      {/* Add / Edit Size Chart Modal */}
      {isChartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  <TableIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-indigo-950">
                    {editingChartId ? 'Edit Sizing Chart' : 'Create New Sizing Chart'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure apparel category, fit label, measurement dimensions, and size rows.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChartModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChart} className="space-y-4">
              
              {/* Basic Meta Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-indigo-950 mb-1">Chart Title *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Hoodies & Sweatshirts Sizing (Inches)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-indigo-950 mb-1">Apparel Category *</label>
                  <input
                    type="text"
                    required
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="e.g. Hoodies, Jackets, Thermals"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-indigo-950 mb-1">Fit Type Label</label>
                  <input
                    type="text"
                    value={formFitType}
                    onChange={(e) => setFormFitType(e.target.value)}
                    placeholder="e.g. Regular / Relaxed Fit, Tailored Fit"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-indigo-950 mb-1">Fabric Tag / Subtitle</label>
                  <input
                    type="text"
                    value={formFabricTag}
                    onChange={(e) => setFormFabricTag(e.target.value)}
                    placeholder="e.g. 350 GSM Heavy Fleece"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium"
                  />
                </div>
              </div>

              {/* Columns Header Editor */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <label className="block text-xs font-bold text-indigo-950">
                  Measurement Columns
                </label>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold bg-slate-200 text-slate-700 px-2 py-1 rounded-lg">
                    Size (Fixed)
                  </span>
                  {formColumns.map((col) => (
                    <span
                      key={col}
                      className="inline-flex items-center gap-1 text-[11px] font-bold bg-white border border-slate-200 text-indigo-950 px-2.5 py-1 rounded-lg shadow-2xs"
                    >
                      <span>{col}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColumn(col)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add new column field */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="New measurement column (e.g. Waist, Shoulder Width)..."
                    value={newColumnInput}
                    onChange={(e) => setNewColumnInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddColumn();
                      }
                    }}
                    className="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                  />
                  <button
                    type="button"
                    onClick={handleAddColumn}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-950 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Column</span>
                  </button>
                </div>
              </div>

              {/* Rows Editor Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-indigo-950">
                    Size Dimensions &amp; Measurement Values
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFormRow}
                    className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Size Row</span>
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold sticky top-0 z-10 border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 w-20">Size</th>
                        {formColumns.map((col) => (
                          <th key={col} className="p-2.5">{col}</th>
                        ))}
                        <th className="p-2.5 w-12 text-center">Del</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {formRows.map((row) => (
                        <tr key={row.id}>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.size}
                              onChange={(e) => handleRowSizeChange(row.id, e.target.value)}
                              className="w-16 p-1.5 font-bold text-center border border-slate-200 rounded-lg text-xs"
                            />
                          </td>
                          {formColumns.map((col) => (
                            <td key={col} className="p-2">
                              <input
                                type="text"
                                value={row.measurements[col] || ''}
                                onChange={(e) => handleRowValueChange(row.id, col, e.target.value)}
                                placeholder={`e.g. 40"`}
                                className="w-full p-1.5 border border-slate-200 rounded-lg text-xs font-medium"
                              />
                            </td>
                          ))}
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteFormRow(row.id)}
                              className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsChartModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-sm shadow-rose-200 transition cursor-pointer"
                >
                  {editingChartId ? 'Update Size Chart' : 'Save & Publish Chart'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Quick Add Row Modal */}
      {quickRowChartId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-indigo-950">
                Add Size Row
              </h3>
              <button
                type="button"
                onClick={() => setQuickRowChartId(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-indigo-950 mb-1">Size Tag</label>
                <input
                  type="text"
                  value={quickRowSize}
                  onChange={(e) => setQuickRowSize(e.target.value)}
                  placeholder="e.g. S, 3XL, Free Size"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              {charts.find((c) => c.id === quickRowChartId)?.columns.map((col) => (
                <div key={col}>
                  <label className="block font-semibold text-slate-700 mb-1">{col}</label>
                  <input
                    type="text"
                    value={quickRowMeasurements[col] || ''}
                    onChange={(e) =>
                      setQuickRowMeasurements({
                        ...quickRowMeasurements,
                        [col]: e.target.value,
                      })
                    }
                    placeholder={`Measurement for ${col}...`}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setQuickRowChartId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuickRow}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs"
              >
                Add Row
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

