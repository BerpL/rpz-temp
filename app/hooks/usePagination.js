/* eslint-disable prefer-destructuring */
import { useReducer, useEffect, useCallback, useMemo } from 'react';

export const getInitialState = props => {
  const { items, initialPage = 1, itemsPerPage } = props;

  if (itemsPerPage <= 0) {
    throw new Error('itemsPerPage must be > 0');
  }

  const maxPages = Math.ceil(items.length / itemsPerPage);
  const currentPage = clamp(initialPage, 1, maxPages);
  const currentItems = getCurrentItems(items, currentPage, itemsPerPage);
  const [previousPage, nextPage] = getBoundingPages(currentPage, maxPages);
  const hasNextPage = nextPage <= maxPages && currentPage !== maxPages;
  const hasPreviousPage = previousPage >= 1 && currentPage !== 1;

  return {
    currentItems,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    items,
    itemsPerPage,
    maxPages,
    nextPage,
    previousPage,
  };
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const getBoundingPages = (currentPage, maxPages) => {
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(currentPage + 1, maxPages);

  return [previousPage, nextPage];
};

const getCurrentItems = (items, currentPage, itemsPerPage) =>
  [...items].splice((currentPage - 1) * itemsPerPage, itemsPerPage);

const reducer = (state, action) => {
  const { items, itemsPerPage, maxPages } = state;
  let currentPage = state.currentPage;

  // console.log('action.type', action.type);
  // console.log('reducer.state', state);

  switch (action.type) {
    case 'next': {
      currentPage = clamp(state.currentPage + 1, 1, maxPages);
      break;
    }
    case 'previous': {
      currentPage = clamp(state.currentPage - 1, 1, maxPages);
      break;
    }
    case 'set': {
      currentPage = clamp(action.currentPage, 1, maxPages);
      break;
    }
    case 'update': {
      return Object.assign({}, state, {
        items: action.items,
      });
    }
    case 'reset': {
      // console.log('action.initialState', action.initialState);
      return Object.assign({}, state, getInitialState(action.initialState));
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
  const [previousPage, nextPage] = getBoundingPages(currentPage, maxPages);

  const currentItems = getCurrentItems(items, currentPage, itemsPerPage);

  // console.log('reducer.currentItems----', currentItems);

  const hasNextPage = nextPage <= maxPages && currentPage !== maxPages;
  const hasPreviousPage = previousPage >= 1 && currentPage !== 1;

  return Object.assign({}, state, {
    currentItems,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
  });
};

const usePagination = props => {
  const initialState = useMemo(() => getInitialState(props), [props.items]);

  // console.log('initialState', initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log('state', state);

  const onNextPage = useCallback(() => dispatch({ type: 'next' }), []);

  const onPreviousPage = useCallback(() => dispatch({ type: 'previous' }), []);

  const onResetPage = useEffect(
    () => {
      dispatch({ type: 'reset', initialState: props });
    },
    [props.items],
  );

  const setCurrentPage = useCallback(
    currentPage => dispatch({ type: 'set', currentPage }),
    [],
  );

  const updateItems = useCallback(
    () => {
      dispatch({ type: 'update', items: props.items });
    },
    [props.items],
  );

  /* useEffect(
    () => {
      dispatch({ type: 'update', items: props.items });
    },
    [props.items],
  ); */

  return {
    onNextPage,
    onPreviousPage,
    dispatch,
    onResetPage,
    updateItems,
    setCurrentPage,
    ...state,
  };
};

export default usePagination;
