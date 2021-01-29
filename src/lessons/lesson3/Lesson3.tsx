import React, { useState } from 'react';
import API from './API';
import './lesson_3';

const Lesson3 = () => {
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchNameByType, setSearchNameByType] = useState('');
  const [searchResultByType, setSearchResultByType] = useState([]);


  //utility
  let apiFn = (fn: any) => {
    return fn.then((response: any) => {
      if (response.Search) {
        setSearchResult(response.Search);
      }
    });
  };

  const searchFilm = () => {
    apiFn(API.searchFilmsByTitle(searchName));
  };

  const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
    apiFn(API.searchFilmsByType(searchNameByType, type));
  };

  return (
    <div>
      <h1>Promises</h1>
      <div>
        <h3><p>Search by name:</p></h3>
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.currentTarget.value)} />
        <button onClick={searchFilm}>Search</button>
        <div>
          {
            searchResult.map((item: any, index: number) => <div key={index}>{item.Title}</div>)
          }
        </div>
      </div>

      <div>
        <h3><p>Search by type:</p></h3>
        <input type="text" value={searchNameByType} onChange={(e) => setSearchNameByType(e.currentTarget.value)} />
        <button onClick={searchByType} data-t='movie'>Movie</button>
        <button onClick={searchByType} data-t='series'>Series</button>
        <div>
          {
            searchResultByType.map((item: any, index: number) => <div key={index}>{item.Title}</div>)
          }
        </div>
      </div>
    </div>
  );
};
export default Lesson3;