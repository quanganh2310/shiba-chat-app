import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

const useFirestore = (dbCollection, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = query(collection(db, dbCollection), orderBy("createdAt"));
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }

      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }
    const unsubcribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });

    return unsubcribe;
  }, [dbCollection, condition]);

  return documents;
};

export default useFirestore;
