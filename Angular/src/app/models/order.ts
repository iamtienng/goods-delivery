export class Order {
  _id: string;
  orderID: string;
  itemName: string;
  senderName: string;
  receiverName: string;
  receiverAddress: string;
  deliver: string;
  status: Boolean;
  note: string;
  updated: Date;
  geometryCoordinate: Object;
}
