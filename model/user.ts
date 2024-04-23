import {
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
  } from "firebase/firestore";
//   export class ListProduct {
//     products: Product[];
//     constructor() {
//       this.products = [];
//     }
//   }
  export class User {
    id: string;
    address: string;
    email:string;
    username:string;
    // classId: string
    constructor(
        id: string,
        address: string,
        email:string,
        username:string,
    ) {
      this.id = id;
      this.address = address;
      this.email = email;
      this.username = username;
    }
  }
  
  export const userConverter = {
    toFirestore: (user: User) => {
      return {
        address: user.address,
        email: user.email,
        username: user.username,
      };
    },
  
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
      options: SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      return new User(
        snapshot.id,
        data.Address,
        data.email,
        data.username,
      );
    },
  };
  