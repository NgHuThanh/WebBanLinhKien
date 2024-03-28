import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class Order {
  id: string;
  user_id: number;
  state: string;
  // classId: string
  constructor(id: string, user_id: number, state: string) {
    this.id = id;
    this.user_id = user_id;
    this.state = state;
  }
}
export const orderConverter = {
  toFirestore: (order: Order) => {
    return {
      user_id: order.user_id,
      state: order.state,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Order(snapshot.id, data.user_id, data.state);
  },
};
