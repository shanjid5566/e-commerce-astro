// src/services/announcementService.ts

export interface AnnouncementItem {
  id: string;
  icon: string;
  text: string;
  isActive: boolean;
  order: number;
  link?: string;
}

export async function getAnnouncements(): Promise<AnnouncementItem[]> {
  return [
    {
      id: 'ann-1',
      icon: '🔥',
      text: 'Free Cash on Delivery for orders above ৳2,500 across Bangladesh!',
      isActive: true,
      order: 1,
    },
    {
      id: 'ann-2',
      icon: '❄️',
      text: 'Guaranteed 100% Winter Warmth Fabric',
      isActive: true,
      order: 2,
    },
    {
      id: 'ann-3',
      icon: '🚚',
      text: '2-3 Days Fast Home Delivery Across Bangladesh',
      isActive: true,
      order: 3,
    },
    {
      id: 'ann-4',
      icon: '⭐',
      text: 'New Heavyweight Streetwear Collection Just Dropped!',
      isActive: true,
      order: 4,
      link: '/products',
    },
  ];
}

