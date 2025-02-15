//import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { searchGithub } from '../api/API';

const CandidateSearch = () => {
  useEffect(() => {
    async function fetchData() {
      // const user = await searchGithubUser('stanmoriasi');
      const users = await searchGithub();
      console.log(users);
          }
    fetchData();
  }, []);



  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
