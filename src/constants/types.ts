export type MessageType = {
    _id: string;
    text: string;
    createdAt: Date;
    user: {
      _id: string;
      name?: string;
      avatar?: string;
    };
  };

export type MessageReceivedType = {
  _id: string;
  status: 'delivered';
  deliveredAt: Date;
};