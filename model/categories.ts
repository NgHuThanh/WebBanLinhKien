import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
export class ListCategories {
  categories: Categories[];
  constructor() {
    this.categories = [];
  }
}
export class Categories {
  id: string | undefined;
  name: string;
  cateimage: string;
  constructor(id: string, name: string, cateimage: string) {
    this.id = id;
    this.name = name;
    this.cateimage = cateimage;
  }
}

export const categoriesConverter = {
  toFirestore: (category: Categories) => {
    return {
      id: category.id,
      name: category.name,
      cateimage: category.cateimage,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Categories(data.id, data.name, data.cateimage);
  },
};
