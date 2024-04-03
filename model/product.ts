import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
export class ListProduct {
  products: Product[];
  constructor() {
    this.products = [];
  }
}
export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offer: string;
  technical: string;
  image: string;
  saleinfor: number;
  // classId: string
  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    offer: string,
    technical: string,
    image: string,
    saleinfor: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.offer = offer;
    this.technical = technical;
    this.image = image;
    this.saleinfor = saleinfor;
  }
}

export const productConverter = {
  toFirestore: (product: Product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      offer: product.offer,
      technical: product.technical,
      image: product.image,
      saleinfor: product.saleinfor,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Product(
      snapshot.id,
      data.name,
      data.description,
      data.price,
      data.offer,
      data.technical,
      data.image,
      data.saleinfor
    );
  },
};
