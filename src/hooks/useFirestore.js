import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  getDocs 
} from 'firebase/firestore';

export const useFirestore = (collectionName) => {
  const add = async (data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  };

  const update = async (id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  const remove = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  const getAll = async () => {
    try {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  };

  return { add, update, remove, getAll };
}; 