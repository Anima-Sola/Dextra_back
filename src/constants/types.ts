export type MessageType = {
  chatId: string;
  messageId: string;
  type: "income" | "outgoing";
  content: string;
  createdAt: Date;
  userId: string;
  status: "delivered" | "notDelivered" | "sending";
};

export type MessageDeliveredStatusType = {
  chatId: string;
  messageId: string;
  status: 'delivered' | 'notDelivered' | 'sending';
  deliveredAt: Date;
};