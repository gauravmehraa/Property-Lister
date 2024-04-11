const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, query, getDocs, getDoc } = require('firebase/firestore');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

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
const storage = getStorage(app);

const addProperty = async (data, images, video) => {
  const id = data.name.toLowerCase().replace(/\s+/g, '-');
  try {
    const storageRef = ref(storage);
    const imageUrls = [];
    
    for (let i = 1; i <= 3; i++) {
      const imageName = `image${i}`;
      const imageFile = images[imageName][0];
      const imageRef = ref(storageRef, `${id}/${imageName}`);
      await uploadBytes(imageRef, imageFile);
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL);
    }
    
    const videoFile = video[0];
    const videoRef = ref(storageRef, `${id}/video`);
    await uploadBytes(videoRef, videoFile);
    const videoUrl = await getDownloadURL(videoRef);

    data.images = imageUrls;
    data.video = videoUrl;

    const document = doc(firestoreDb, "properties", id);
    let uploaded = await setDoc(document, data);
    return uploaded;
  } catch (error) {
    console.log(error);
  }
};


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

const getProperty = async(id, from, to) => {
  try{
    const docRef = doc(firestoreDb, "properties", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }

  } catch (error) {
    console.log(error);
  }
}

const getFirebaseApp = () => app;

module.exports = {
  getFirebaseApp,
  addProperty,
  getProperty,
  getProperties
}