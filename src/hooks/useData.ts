import { useState } from 'react';

interface IData {
  _id?: string;
  [key: string]: any;
}

// perform repeating check
function useData<T extends IData>(initState: T[]) {
  const [data, setInnerData] = useState<T[]>(initState);

  const setData = (dataList: T[]) => {
    console.log(dataList, 'dataList');
    // delete all
    if (dataList && dataList.length === 0) setInnerData([]);

    // remove existed
    const newDataList = dataList.filter(
      item => !data.find(dataElem => dataElem?._id === item?._id),
    );

    setInnerData(prev => [...prev, ...newDataList]);
  };

  return { data, setData };
}

export default useData;
