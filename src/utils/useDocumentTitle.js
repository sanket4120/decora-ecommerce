import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `Decora | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
