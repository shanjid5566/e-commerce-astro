// src/components/react/PublicSizeGuideView.tsx
import { useState, useEffect } from 'react';
import {
  getSizeCharts,
  getMeasurementTips,
  type SizeChart,
  type MeasurementTip
} from '../../services/sizeGuideService';

interface Props {
  initialCharts: SizeChart[];
  initialTips: MeasurementTip[];
}

export default function PublicSizeGuideView({ initialCharts, initialTips }: Props) {
  const [charts, setCharts] = useState<SizeChart[]>(initialCharts);
  const [tips, setTips] = useState<MeasurementTip[]>(initialTips);

  useEffect(() => {
    getSizeCharts().then((data) => setCharts(data));
    getMeasurementTips().then((data) => setTips(data));
  }, []);

  return (
    <div className="space-y-12">
      {/* Measurement Method Visual Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tips.map((tip) => (
          <div
            key={tip.step}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2 hover:border-rose-200 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 font-black flex items-center justify-center text-sm">
              {tip.step}
            </div>
            <h4 className="font-extrabold text-indigo-950 text-sm">{tip.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{tip.description}</p>
          </div>
        ))}
      </div>

      {/* Sizing Tables Section */}
      <div className="space-y-8">
        {charts.map((chart) => (
          <div
            key={chart.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                  {chart.fabricTag || chart.category}
                </span>
                <h3 className="text-lg font-black text-indigo-950">{chart.title}</h3>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                {chart.fitType}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] border-b border-slate-100">
                    <th className="p-3 font-black text-indigo-950">Size</th>
                    {chart.columns.map((col) => (
                      <th key={col} className="p-3">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {chart.rows.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={idx % 2 === 1 ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}
                    >
                      <td className="p-3 font-bold text-indigo-950">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                          {row.size}
                        </span>
                      </td>
                      {chart.columns.map((col) => (
                        <td key={col} className="p-3">
                          {row.measurements[col] || <span className="text-slate-300">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Exchange Guarantee Reassurance Card */}
      <div className="bg-gradient-to-r from-rose-50 to-indigo-50 border border-rose-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-black text-indigo-950 text-base sm:text-lg">Still Unsure About Sizing?</h4>
          <p className="text-xs sm:text-sm text-slate-600">
            Order with complete peace of mind. If it doesn't fit right, our 7-day doorstep size exchange has you covered!
          </p>
        </div>
        <a
          href="/products"
          className="inline-block bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-sm whitespace-nowrap text-center cursor-pointer"
        >
          Shop Winter Collection
        </a>
      </div>
    </div>
  );
}

