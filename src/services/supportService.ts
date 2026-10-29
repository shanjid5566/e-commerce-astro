// src/services/supportService.ts

export interface SupportReply {
  id: string;
  author: string;
  authorRole: 'Admin' | 'Customer';
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  subject: string;
  orderId?: string;
  message: string;
  status: 'Pending' | 'In Progress' | 'Answered' | 'Closed';
  priority: 'High' | 'Medium' | 'Normal';
  createdAt: string;
  replies: SupportReply[];
}

export async function getSupportTickets(): Promise<SupportTicket[]> {
  return [
    {
      id: 'TICK-801',
      customerName: 'Tanvir Ahmed',
      customerPhone: '01711223344',
      customerEmail: 'tanvir.ahmed@gmail.com',
      subject: 'Size Exchange Request for Biker Jacket',
      orderId: 'WC-98412',
      message: 'Hello, I received my Biker Style Leather Jacket (Order #WC-98412) today. The quality and finishing are outstanding, but size L feels slightly snug across the shoulders. Can I exchange it for XL? The tags are still attached.',
      status: 'Pending',
      priority: 'High',
      createdAt: 'Today, 1:45 PM',
      replies: []
    },
    {
      id: 'TICK-802',
      customerName: 'Nusrat Jahan',
      customerPhone: '01899112233',
      customerEmail: 'nusrat.jahan@yahoo.com',
      subject: 'Order & Delivery Inquiry',
      orderId: 'WC-98411',
      message: 'Hi team, I ordered the Kashmiri Embroidered Shawl yesterday. Will it arrive in Dhanmondi before Thursday evening? We have a family wedding on Friday.',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: 'Today, 10:15 AM',
      replies: [
        {
          id: 'rep-1',
          author: 'Customer Care Lead',
          authorRole: 'Admin',
          message: 'Hello Nusrat, your order was dispatched this morning via Pathao Express. Our tracking shows expected delivery by Wednesday afternoon, well before Friday.',
          createdAt: 'Today, 11:30 AM'
        }
      ]
    },
    {
      id: 'TICK-803',
      customerName: 'Rahim Chowdhury',
      customerPhone: '01677889900',
      customerEmail: 'r.chowdhury@techcorp.com',
      subject: 'Corporate & Bulk Winter Gifting',
      message: 'We are organizing an annual company retreat in Sreemangal and want to order 50 units of the Over-Sized Fleece Hoodie with our custom corporate logo embroidered. Do you provide bulk enterprise rates and custom branding?',
      status: 'Answered',
      priority: 'Normal',
      createdAt: 'Yesterday, 4:20 PM',
      replies: [
        {
          id: 'rep-2',
          author: 'Enterprise Sales',
          authorRole: 'Admin',
          message: 'Greetings Mr. Rahim! Yes, we do provide bulk embroidery and enterprise discounts for orders over 25 units. We have emailed you the bulk pricing brochure and sample mockups.',
          createdAt: 'Yesterday, 5:45 PM'
        }
      ]
    },
    {
      id: 'TICK-804',
      customerName: 'Saiful Islam',
      customerPhone: '01522334455',
      customerEmail: 'saiful.islam@gmail.com',
      subject: 'Delivery to Halishahar, Chittagong',
      message: 'Do you offer doorstep Cash on Delivery to Halishahar, Chittagong for the Padded Winter Vest? How many working days will it take to arrive?',
      status: 'Pending',
      priority: 'Medium',
      createdAt: 'Yesterday, 2:10 PM',
      replies: []
    },
    {
      id: 'TICK-805',
      customerName: 'Farhana Begum',
      customerPhone: '01911445566',
      customerEmail: 'farhana.b@outlook.com',
      subject: 'Washing instructions for Woolen Cardigan',
      message: 'Can the Women Buttoned Knit Cardigan be washed in a washing machine, or is dry cleaning recommended to avoid shrinkage?',
      status: 'Closed',
      priority: 'Normal',
      createdAt: '28 Oct 2026',
      replies: [
        {
          id: 'rep-3',
          author: 'Fabric Care Specialist',
          authorRole: 'Admin',
          message: 'Dear Farhana, the cardigan is crafted with premium wool blend. We recommend hand washing in cold water with mild detergent or machine washing on a delicate wool cycle inside a mesh laundry bag.',
          createdAt: '28 Oct 2026, 6:00 PM'
        }
      ]
    }
  ];
}
