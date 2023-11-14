import { useState } from 'react';

interface IData {
  _id?: string;
  [key: string]: any;
}

// perform repeating check
function useMsgData<T extends IData>(initState: T[]) {
  const [msgData, setInnerData] = useState<T[]>(initState);

  const setMsgData = (dataList: T[]) => {
    console.log(dataList, 'dataList');
    // delete all
    if (dataList && dataList.length === 0) setInnerData([]);

    setInnerData(prev => {
      // existing list
      const remainList = prev.filter(
        item => !dataList.find(dataELem => dataELem?._id === item?._id),
      );

      return [...dataList, ...remainList];
    });
  };

  return { msgData, setMsgData };
}

export default useMsgData;
