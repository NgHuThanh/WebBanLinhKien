import React from 'react'
import { getApp, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, query, QueryDocumentSnapshot, DocumentData, SnapshotOptions, DocumentReference } from "firebase/firestore";

class User {
  name: string
  dob: string
  classRef: DocumentReference
  // classId: string
  constructor(name: string, dob: string, classRef: DocumentReference) {
    this.name = name
    this.dob = dob
    this.classRef = classRef
  }
}

class UserClass {
  name: string
  constructor(name: string) {
    this.name = name
  }
}


// Firestore data converter
const userConverter = {
  toFirestore: (user: User) => {
    return {
      name: user.name,
      state: user.dob,
      class: user.classRef
    };
  },

  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new User(data.name, data.dob, data.class);
  }
};

const classConverter = {
  toFirestore: (obj: UserClass) => {
    return {
      name: obj.name
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new UserClass(data.name);
  }
};


const Home = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBZ5SZ2bS0qelHkeJBYXMQi7jUcKRbvoyw",
    authDomain: "weblinhkien-b9612.firebaseapp.com",
    projectId: "weblinhkien-b9612",
    storageBucket: "weblinhkien-b9612.appspot.com",
    messagingSenderId: "514113053206",
    appId: "1:514113053206:web:dd7546c647ddcb65facb37",
    measurementId: "G-L6ZHHGL5HV",
  };

  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const writeData = async () => {
    // try {
    //   const docRef = await addDoc(doc(db, "users", ""), {
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815
    //   });
    //   console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }

  const getData = async () => {
    //1. ref
    //2. 
    //2.1. read - getDoc-record, getDocs-collection
    //2.2. write - 


    let userListRef = collection(db, "users").withConverter(userConverter)
    // let userRef = collection(db, "users") // refer to users collection
    let userList = await getDocs(userListRef);

    for (let doc of userList.docs) {
      let user = doc.data()
      let classRef = user.classRef.withConverter(classConverter)
      let classData = await getDoc(classRef)
      console.log(user.name + " " + classData.data()?.name)
    }
    // console.log(user.name)
    // classRef = user[0] -> classes -> id_class

    // getDoc(classRef)
    //   .then(snap => {
    //     let classData = snap.data()
    //     console.log(user.name + " " + classData?.name)
    //   })
    // let classRef = doc(db, "classes", user.classId).withConverter(classConverter)

    // .then(snap => {
    //   let classData = snap.data()
    //   classData.name
    // })
    // });
  }

  getData()
  return (
    <main>
      <h2>Home</h2>

    </main>
  )
}

export default Home