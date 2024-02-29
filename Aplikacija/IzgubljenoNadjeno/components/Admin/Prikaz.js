import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, doc, FieldPath } from 'firebase/firestore';
import React from 'react';
import PieChart from './PieChart.js';

const getDistinctValuesCount = async (collectionName, parameterName) => {
  const firestore = getFirestore();
  const collectionRef = collection(firestore, collectionName);
  const snapshot = await getDocs(collectionRef);

  const distinctValues = new Set();

  snapshot.forEach(doc => {
    const parameterRef = doc.get(parameterName);
    const parameterValue = parameterRef ? parameterRef.id : null;
    if (parameterValue) {
      distinctValues.add(parameterValue);
    }
  });

  return distinctValues.size;
};

const getCollectionSize = async (collectionName) => {
  const firestore = getFirestore();
  const collectionRef = collection(firestore, collectionName);
  const snapshot = await getDocs(collectionRef);

  return snapshot.size;
};


 
const Prikaz = () => {
  const [distinctValuesCount, setDistinctValuesCount] = useState(0);
  const [collectionSize, setCollectionSize] = useState(0);
  const [segment1Value,setSegment1Value]=useState(0);
    const [segment2Value,setSegment2Value]=useState(0);

  const [collectionSize2, setCollectionSize2] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const distinctCount = await getDistinctValuesCount('postovi', 'vlasnik');
      setDistinctValuesCount(distinctCount);

      const size = await getCollectionSize('postovi');
      setCollectionSize(size);
      const size2 = await getCollectionSize('users');
      setCollectionSize2(size2);
        setSegment1Value(distinctCount/size2*100);
        setSegment2Value((size2-distinctCount)/size2*100);
    };

    fetchData();
  }, []);

  return (
    <div>
      <PieChart segment1Value={segment1Value} segment2Value={segment2Value} />
    </div>
  );
};

export default Prikaz;
