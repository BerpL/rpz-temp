import { useState, useCallback } from 'react';
import { useCheckBox } from 'hooks/useCheckBox';
export const useListWithSelect = ({ data: dataTmp }) => {
  const [checkAll, toggleCheckAll, setCheckedAll] = useCheckBox();
  const [data, setData] = useState(dataTmp);
  const [date, setDate] = useState(null);

  const onCheckAll = useCallback(checked => {
    let itemFound = null;
    data.forEach(item => {
      itemFound = item;
      itemFound.checked = checked;
    });
    setCheckedAll(checked);
  });

  const getSelectedItems = useCallback(() => {
    const array = [];
    data.forEach(item => {
      let foundItem;
      if (item.checked) {
        foundItem = { ...item };
        foundItem.checked = false;
        array.push(foundItem);
      }
    });

    const nextData = data.filter(item => !item.checked);
    setCheckedAll(false);
    setData(nextData);
    return array;
  });
  const moveItems = useCallback(dataMoved => {
    data.push(...dataMoved);
    setData([...data]);
  });

  const onCheckItem = useCallback((checked, id) => {
    if (!checked) setCheckedAll(false);
    let itemFound = null;
    data.forEach(item => {
      if (item.idMedio === id) {
        itemFound = item;
        itemFound.checked = checked;
      }
    });
    setDate(Date.now());
  });

  return [
    data,
    checkAll,
    onCheckAll,
    onCheckItem,
    getSelectedItems,
    moveItems,
    setData,
  ];
};
