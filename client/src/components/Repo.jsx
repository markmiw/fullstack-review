import React from 'react';

const Repo = (props) => {
  return (
    <div>
      <a href={props.repo[1]}>{props.repo[0]}</a>
    </div>
  );
};

export default Repo;
