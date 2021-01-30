import React, { useState } from 'react';
import API from './API';
import './lesson_3';
import s from './Lesson3.module.css';

const Lesson3 = () => {
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchNameByType, setSearchNameByType] = useState('');
  const [searchResultByType, setSearchResultByType] = useState([]);


  //utility
  let apiFn = (fn: any) => {
    return fn.then((response: any) => {
      if (response.Search) {
        console.log(response.Search);
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
      {/*<h1>Promises</h1>*/}
      <div className={s.movies}>

        <div className={s.movies_search}>

          <div className={s.search_block}>
            <h3><p>Search by name:</p></h3>
            <input className={s.input} type="text" value={searchName}
                   onChange={(e) => setSearchName(e.currentTarget.value)} />
            <button className={s.button} onClick={searchFilm}>Search</button>
          </div>


          <div className={s.search_block}>
            <h3><p>Search by type:</p></h3>
            <input className={s.input} type="text" value={searchNameByType}
                   onChange={(e) => setSearchNameByType(e.currentTarget.value)} />
            <button className={s.button} onClick={searchByType} data-t='movie'>Movie</button>
            <button className={s.button} onClick={searchByType} data-t='series'>Series</button>
          </div>
        </div>

        <div>
          <ul className={s.movies_list}>

            {
              searchResult.map((item: any, index: number) =>
                <li className={s.movie_item} key={index}>
                  <div className={s.movie_poster}>
                    <img src={item.Poster} alt={item.Title} width={250} height={350} />
                  </div>

                  <div className={s.movie_info}>
                    <p>{item.Title}</p>
                    <p>{item.Type}</p>
                    <p>{item.Year}</p>
                  </div>
                </li>)
            }
          </ul>
        </div>

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