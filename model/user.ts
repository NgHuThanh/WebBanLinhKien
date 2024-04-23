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
    password:string;
    // classId: string
    constructor(
        id: string,
        address: string,
        email:string,
        username:string,
        password:string,
    ) {
      this.id = id;
      this.address = address;
      this.email = email;
      this.username = username;
      this.password=password;
    }
  }
  
  export const userConverter = {
    toFirestore: (user: User) => {
      return {
        address: user.address,
        email: user.email,
        username: user.username,
        password:user.password,
      };
    },
  
    fromFirestore: (
      snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
      options: SnapshotOptions
    ) => {
      const data = snapshot.data(options);
      return new User(
        snapshot.id,
        data.address,
        data.email,
        data.username,
        data.password
      );
    },
  };
  