import React from 'react';

import Tag from './Tag2';

const ListTagsTagged = ({ tags, onRemove }) => (
  <div>
    {tags.map(tag => (
      <Tag
        tag={tag}
        key={tag.idDetalleEtiquetaModulo}
        enableRemove
        onRemove={onRemove}
      />
    ))}
  </div>
);

export default ListTagsTagged;
