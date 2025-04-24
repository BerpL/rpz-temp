import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import usePagination from 'hooks/usePagination';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

const strategies = {
  sort(items, key) {
    return items.sort((itemA, itemB) => {
      const valueA = itemA[key] ? itemA[key].toString() : '';
      const valueB = itemB[key] ? itemB[key].toString() : '';
      return valueA.localeCompare(valueB);
    });
  },
  reverseSort(items, key) {
    return items
      .sort((itemA, itemB) => {
        const valueA = itemA[key] ? itemA[key].toString() : '';
        const valueB = itemB[key] ? itemB[key].toString() : '';
        return valueA.localeCompare(valueB);
      })
      .reverse();
  },
};


const executeStrategy = (strategyName, items, key) => {
  const strategy = strategies[strategyName];
  return strategy(items, key);
};

function Table({ data = [], titles = [], actions = [], itemsPerPage = 50, initialPage = 1, clickChange }) {
  const [sortConf, setSortConf] = useState({ strategy: null, key: null });
  const pagination = usePagination({ items: data, itemsPerPage, initialPage });

  const handleOnClickTitle = (key, strategy = 'sort') => {
    let newStrategy;
    if (key === sortConf.key) {
      if (
        strategy === 'sort' &&
        sortConf.strategy &&
        strategy === sortConf.strategy
      ) {
        newStrategy = 'reverseSort';
      }
    }
    setSortConf({
      key,
      strategy: newStrategy || strategy,
    });
  };

  useEffect(
    () => {
      if (!sortConf.strategy) return;
      const filteredItems = executeStrategy(
        sortConf.strategy,
        pagination.currentItems,
        sortConf.key,
      );
      pagination.updateItems(filteredItems);
    },
    [sortConf],
  );

  return (
    <>
      <TableHeader titles={titles} onClickTitle={handleOnClickTitle} />
      <TableBody
        titles={titles}
        pagination={pagination}
        actions={actions}
        clickChange={clickChange}
      />
      <TableFooter count={data.length} pagination={pagination} />
    </>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  titles: PropTypes.array,
  actions: PropTypes.array,
  itemsPerPage: PropTypes.number,
};

export default Table;
