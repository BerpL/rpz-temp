import { useState, useEffect, useCallback } from 'react';

import Tree from 'utils/Tree';

function useTree({ data, onMount, openAll }) {
  const [TreeManager] = useState(new Tree());
  const [tree, setTree] = useState({ id: 0, nodos: [] });
  const [node, setNode] = useState({ id: 0, nodos: [] });
  const [date, setDate] = useState(null);

  useEffect(
    () => {
      TreeManager.setData(data);
      TreeManager.getData(openAll);
      setTree(TreeManager.root);
      TreeManager.setSelectedNode(TreeManager.root.id);
      setNode(TreeManager.root);
      if (onMount) onMount(TreeManager.root);
    },
    [data],
  );

  const onSelectNode = useCallback((id, cb) => {
    const nodeTmp = TreeManager.findNode(id);

    setNode(nodeTmp);
    TreeManager.setSelectedNode(id);
    if (cb) {
      const parents = TreeManager.getParents(nodeTmp.id, true);
      cb(nodeTmp, parents);
    }
  });

  const addNode = useCallback((newNode, idParent) => {
    TreeManager.add(newNode, idParent, TreeManager.traverseBF);
  });

  const removeNode = useCallback((idNode, idParent) => {
    TreeManager.remove(idNode, idParent, TreeManager.traverseBF);
    setDate(Date.now());
  });

  const onMoveNode = useCallback((from, to, cb, afterMove) => {
    const nodeFromAfterMove = TreeManager.findNode(from);
    const nodeFromParent = TreeManager.findNode(nodeFromAfterMove.parent.id);
    const canMove = TreeManager.moveNode(from, to);
    const nodeFrom = TreeManager.findNode(from);
    const nodeTo = TreeManager.findNode(to);
    let parents = [];
    if (nodeFrom.selected) {
      setNode(nodeFrom);

      if (cb) {
        parents = TreeManager.getParents(from, true);
        cb(parents);
      }
    }
    if (nodeFromParent.selected) {
      setNode(nodeFromParent);
      if (cb) {
        parents = TreeManager.getParents(nodeFromParent.id, true);
        cb(parents);
      }
    }
    if (nodeTo.selected) {
      setNode(nodeTo);
      if (cb) {
        parents = TreeManager.getParents(to, true);
        cb(parents);
      }
    }

    afterMove(canMove);
  });

  const onOpenNode = useCallback(id => {
    TreeManager.setOpenNode(id, true);
    setDate(Date.now());
  });

  return [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    TreeManager.findNode,
    onOpenNode,
    addNode,
    removeNode,
    date,
  ];
}

export default useTree;
