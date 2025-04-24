import React from 'react';
import { ContainerItem } from './Styles';
const DocItem = ({ doc, onClickDocument }) => (
  <ContainerItem onClick={() => onClickDocument(doc.url)}>
    <img
      alt={doc.nombre}
      width="50"
      src="https://www.namepros.com/a/2018/05/106343_82907bfea9fe97e84861e2ee7c5b4f5b.png"
    />
    {doc.nombre}
  </ContainerItem>
);

export default DocItem;
