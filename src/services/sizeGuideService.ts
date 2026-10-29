// src/services/sizeGuideService.ts

export interface SizeChartRow {
  id: string;
  size: string;
  measurements: Record<string, string>;
}

export interface SizeChart {
  id: string;
  title: string;
  category: string;
  fitType: string;
  fabricTag: string;
  unit: string;
  columns: string[];
  rows: SizeChartRow[];
  updatedAt?: string;
}

export interface MeasurementTip {
  step: number;
  title: string;
  description: string;
}

const STORAGE_KEY = 'wintercart_size_charts';
const TIPS_STORAGE_KEY = 'wintercart_measurement_tips';

export const DEFAULT_MEASUREMENT_TIPS: MeasurementTip[] = [
  {
    step: 1,
    title: 'Chest / Bust',
    description: 'Measure around the fullest part of your chest, keeping the tape horizontal under your arms.',
  },
  {
    step: 2,
    title: 'Body Length',
    description: 'Measure from the highest point of the shoulder down to your desired bottom hemline.',
  },
  {
    step: 3,
    title: 'Sleeve Length',
    description: 'Measure from the shoulder seam along the outer edge of your arm down to the wrist bone.',
  },
  {
    step: 4,
    title: 'Shoulder Width',
    description: 'Measure straight across your back from one shoulder point seam to the other.',
  },
];

export const DEFAULT_SIZE_CHARTS: SizeChart[] = [
  {
    id: 'chart-hoodies',
    title: 'Hoodies & Sweatshirts Sizing (Inches)',
    category: 'Hoodies',
    fitType: 'Regular / Relaxed Fit',
    fabricTag: '350 GSM Heavy Fleece',
    unit: 'Inches',
    columns: ['Chest (Round)', 'Body Length', 'Sleeve Length', 'Recommended Weight'],
    rows: [
      {
        id: 'row-1',
        size: 'M',
        measurements: {
          'Chest (Round)': '38" - 40"',
          'Body Length': '27"',
          'Sleeve Length': '24.5"',
          'Recommended Weight': '50 - 62 kg',
        },
      },
      {
        id: 'row-2',
        size: 'L',
        measurements: {
          'Chest (Round)': '40" - 42"',
          'Body Length': '28"',
          'Sleeve Length': '25"',
          'Recommended Weight': '63 - 74 kg',
        },
      },
      {
        id: 'row-3',
        size: 'XL',
        measurements: {
          'Chest (Round)': '42" - 44"',
          'Body Length': '29"',
          'Sleeve Length': '25.5"',
          'Recommended Weight': '75 - 85 kg',
        },
      },
      {
        id: 'row-4',
        size: 'XXL',
        measurements: {
          'Chest (Round)': '44" - 46"',
          'Body Length': '30"',
          'Sleeve Length': '26"',
          'Recommended Weight': '86 - 98 kg',
        },
      },
    ],
    updatedAt: '28 Oct 2026',
  },
  {
    id: 'chart-jackets',
    title: 'Jackets & Coats Sizing (Inches)',
    category: 'Jackets',
    fitType: 'Tailored Fit',
    fabricTag: 'Outerwear Layering',
    unit: 'Inches',
    columns: ['Chest (Round)', 'Shoulder Width', 'Jacket Length', 'Sleeve Length'],
    rows: [
      {
        id: 'row-j1',
        size: 'M',
        measurements: {
          'Chest (Round)': '40"',
          'Shoulder Width': '17.5"',
          'Jacket Length': '26.5"',
          'Sleeve Length': '24.5"',
        },
      },
      {
        id: 'row-j2',
        size: 'L',
        measurements: {
          'Chest (Round)': '42"',
          'Shoulder Width': '18.5"',
          'Jacket Length': '27.5"',
          'Sleeve Length': '25"',
        },
      },
      {
        id: 'row-j3',
        size: 'XL',
        measurements: {
          'Chest (Round)': '44"',
          'Shoulder Width': '19.5"',
          'Jacket Length': '28.5"',
          'Sleeve Length': '25.5"',
        },
      },
      {
        id: 'row-j4',
        size: 'XXL',
        measurements: {
          'Chest (Round)': '46"',
          'Shoulder Width': '20.5"',
          'Jacket Length': '29.5"',
          'Sleeve Length': '26"',
        },
      },
    ],
    updatedAt: '28 Oct 2026',
  },
  {
    id: 'chart-thermals',
    title: 'Thermal Innerwear Sets',
    category: 'Thermals',
    fitType: 'Body-Hugging Stretch',
    fabricTag: 'Heat-Lock Stretch Fabric',
    unit: 'Inches',
    columns: ['Top Chest', 'Bottom Waist', 'Bottom Length', 'Recommended Height'],
    rows: [
      {
        id: 'row-t1',
        size: 'S / M',
        measurements: {
          'Top Chest': '34" - 38"',
          'Bottom Waist': '28" - 32"',
          'Bottom Length': '37"',
          'Recommended Height': "5'2\" - 5'7\"",
        },
      },
      {
        id: 'row-t2',
        size: 'L / XL',
        measurements: {
          'Top Chest': '38" - 42"',
          'Bottom Waist': '32" - 36"',
          'Bottom Length': '39"',
          'Recommended Height': "5'7\" - 6'0\"",
        },
      },
      {
        id: 'row-t3',
        size: 'XXL',
        measurements: {
          'Top Chest': '42" - 46"',
          'Bottom Waist': '36" - 40"',
          'Bottom Length': '41"',
          'Recommended Height': "6'0\" +",
        },
      },
    ],
    updatedAt: '28 Oct 2026',
  },
];

export async function getSizeCharts(): Promise<SizeChart[]> {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse size charts from localStorage:', err);
      }
    }
  }
  return DEFAULT_SIZE_CHARTS;
}

export async function saveSizeChart(chart: SizeChart): Promise<SizeChart[]> {
  const current = await getSizeCharts();
  const exists = current.some((c) => c.id === chart.id);
  const updated = exists
    ? current.map((c) => (c.id === chart.id ? { ...chart, updatedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) } : c))
    : [...current, { ...chart, updatedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }];

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export async function deleteSizeChart(id: string): Promise<SizeChart[]> {
  const current = await getSizeCharts();
  const updated = current.filter((c) => c.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export async function getMeasurementTips(): Promise<MeasurementTip[]> {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(TIPS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse measurement tips:', err);
      }
    }
  }
  return DEFAULT_MEASUREMENT_TIPS;
}

export async function saveMeasurementTips(tips: MeasurementTip[]): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TIPS_STORAGE_KEY, JSON.stringify(tips));
  }
}

export async function resetSizeChartsToDefault(): Promise<SizeChart[]> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TIPS_STORAGE_KEY);
  }
  return DEFAULT_SIZE_CHARTS;
}
