export type MessageType = {
  id: string;
  type: "income" | "outgoing";
  content: string;
  createdAt: Date;
  userId: string;
};

export type MessageDeliveredStatusType = {
  id: string;
  status: 'delivered';
  deliveredAt: Date;
};