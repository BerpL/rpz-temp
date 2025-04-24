import React from 'react';

import Tag from './Tag';

const ListTags = ({ tags, selected, onSelect }) => (
  <div>
    {tags.map(tag => (
      <Tag tag={tag} cursor="pointer" key={tag.idEnclavamientoAlarma} selected={selected} onClick={onSelect} />
    ))}
  </div>
);

export default ListTags;
