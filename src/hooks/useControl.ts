import { useState } from 'react';

interface IControl {
  pageSize?: number;
  page?: number;
  loading?: boolean;
  loadingMore?: boolean;
  isEnd?: boolean;
  isBlock?: boolean;
  isConfirm?: boolean;
}

// Use for controlling page loading & data fetching
function useControl(additionalState?: IControl) {
  const [control, setControl] = useState<IControl>({
    pageSize: 10, // document num / page
    page: 1,
    loading: true, // initial loading
    loadingMore: false, // more pages loading
    isEnd: false, // is data ended
    isBlock: false, // calling api
    isConfirm: false, // confirmation before submit
    ...additionalState, // more custom state
  });
  return { control, setControl };
}

export default useControl;
