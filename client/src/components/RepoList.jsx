import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => {
  return (
    <div>
      <h4> Repo List Component </h4>
    There are {props.repos.repos.length} repos.
      {
        props.repos.repos.map((repo) => (
          <Repo repo={repo}/>
        ))
      }
    </div>
  );
};

export default RepoList;
