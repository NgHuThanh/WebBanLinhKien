import {
  DocumentData,
  DocumentReference,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
export class ListCart {
  carts: Cart[];
  constructor() {
    this.carts = [];
  }
}
export class Cart {
  id: string;
  price: number;
  product_id: DocumentReference;
  quantity: number;
  discount: number;
  // classId: string
  constructor(
    id: string,
    price: number,
    product_id: DocumentReference,
    quantity: number,
    discount: number
  ) {
    this.id = id;
    this.price = price;
    this.product_id = product_id;
    this.quantity = quantity;
    this.discount = discount;
  }
}

export const cartConverter = {
  toFirestore: (cart: Cart) => {
    return {
      price: cart.price,
      product_id: cart.product_id,
      quantity: cart.quantity,
      discount: cart.discount,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Cart(
      snapshot.id,
      data.price,
      data.product_id,
      data.quantity,
      data.discount
    );
  },
};
