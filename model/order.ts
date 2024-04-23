import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
// export class ListCart {
//   carts: Cart[];
//   constructor() {
//     this.carts = [];
//   }
// }
export class OrderDetail {
  id: string;
  price: number;
  product_id: DocumentReference;
  quantity: number;
  
  // classId: string
  constructor(
    id: string,
    price: number,
    product_id: DocumentReference,
    quantity:number,
  ) {
    this.id = id;
    this.price = price;
    this.product_id = product_id;
    this.quantity = quantity;
    
  }
}

export const orderDetailConverter = {
  toFirestore: (orderDetail: OrderDetail) => {
    return {
      price: orderDetail.price,
      product_id: orderDetail.product_id,
      quantity: orderDetail.quantity,
      
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new OrderDetail(
      snapshot.id,
      data.price,
      data.product_id,
      data.quantity,
    );
  },
};
