// src/services/supportService.ts

/**
 * Contact Message submitted through the website Contact Form (/contact)
 * Contains the exact fields from the customer submission:
 * - Full Name (name)
 * - Phone Number (phone)
 * - Selected Subject (subject)
 * - Message (message)
 */
export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Replied' | 'Closed';
  adminReply?: {
    text: string;
    answeredAt: string;
    answeredBy: string;
  };
}

export async function getSupportMessages(): Promise<ContactMessage[]> {
  return [
    {
      id: 'MSG-101',
      name: 'Tanvir Ahmed',
      phone: '01711223344',
      subject: 'Size Exchange Request',
      message: 'Hello, I received the Biker Style Leather Jacket today. The quality is great, but size L feels slightly tight around my shoulders. Can I exchange it for XL? The tags are still attached.',
      createdAt: 'Today, 1:45 PM',
      status: 'New',
    },
    {
      id: 'MSG-102',
      name: 'Nusrat Jahan',
      phone: '01899112233',
      subject: 'Order & Delivery Inquiry',
      message: 'Hi, I placed an order yesterday for the Kashmiri Embroidered Shawl. Will it arrive before Thursday evening in Dhanmondi? We have a family wedding on Friday.',
      createdAt: 'Today, 10:15 AM',
      status: 'Replied',
      adminReply: {
        text: 'Contacted customer via WhatsApp. Confirmed parcel is with Pathao Express and scheduled for Wednesday afternoon delivery.',
        answeredAt: 'Today, 11:20 AM',
        answeredBy: 'Admin'
      }
    },
    {
      id: 'MSG-103',
      name: 'Rahim Chowdhury',
      phone: '01677889900',
      subject: 'Corporate & Bulk Winter Gifting',
      message: 'We are organizing an annual company retreat in Sreemangal and want to order 50 units of the Over-Sized Fleece Hoodie with our company logo embroidered. Do you provide bulk discounts and custom embroidery?',
      createdAt: 'Yesterday, 4:20 PM',
      status: 'Replied',
      adminReply: {
        text: 'Called client on phone. Shared corporate wholesale tier list and mockup design guidelines via WhatsApp.',
        answeredAt: 'Yesterday, 5:10 PM',
        answeredBy: 'Admin'
      }
    },
    {
      id: 'MSG-104',
      name: 'Saiful Islam',
      phone: '01522334455',
      subject: 'Order & Delivery Inquiry',
      message: 'Do you offer doorstep Cash on Delivery to Halishahar, Chittagong for the Padded Winter Vest? How many working days will delivery take?',
      createdAt: 'Yesterday, 2:10 PM',
      status: 'New',
    },
    {
      id: 'MSG-105',
      name: 'Farhana Begum',
      phone: '01911445566',
      subject: 'Other Questions',
      message: 'Can the Women Buttoned Knit Cardigan be washed in a domestic washing machine, or is dry cleaning recommended to prevent shrinkage?',
      createdAt: '28 Oct 2026',
      status: 'Closed',
      adminReply: {
        text: 'Sent care instructions via SMS: hand wash in cold water or delicate wool cycle recommended.',
        answeredAt: '28 Oct 2026, 5:30 PM',
        answeredBy: 'Admin'
      }
    }
  ];
}
