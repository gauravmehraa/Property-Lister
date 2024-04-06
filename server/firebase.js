const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, query, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAm3cZBN0gzmA00JEgXC-PlrYIN-kTF_RI",
  authDomain: "property-lister-710ef.firebaseapp.com",
  projectId: "property-lister-710ef",
  storageBucket: "property-lister-710ef.appspot.com",
  messagingSenderId: "747141093715",
  appId: "1:747141093715:web:3ae7aa65a563a01de1e9a6"
};

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

const addProperty = async(data) => {
  const id = data.name.toLowerCase().replace(/\s+/g, '-');
  try{
    const document = doc(firestoreDb, "properties", id);
    let uploaded = await setDoc(document, data);
    return uploaded;
  } catch (error) {
    console.log(error);
  }
}

const getProperties = async(from, to) => {
  try{
    const collectionRef = collection(firestoreDb, "properties");
    const data = [];
    const q = query(collectionRef);
    const docSnapshot = await getDocs(q);

    docSnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;

  } catch (error) {
    console.log(error);
  }
}



const getFirebaseApp = () => app;

module.exports = {
  getFirebaseApp,
  addProperty,
  getProperties
}