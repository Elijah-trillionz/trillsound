import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { SearchResults } from '../SearchResults';
import { SideBar } from '../SideBar';
import { SongElement } from '../SongElement';

export const MainBody = () => {
  const {
    songs,
    trending,
    currentPaginationIndex,
    newTotalPaginationIndex,
    sortByTrending,
    goToNextPage,
    goToPrevPage,
    searchResults,
    searchQuery,
  } = useContext(GlobalContext);

  useEffect(() => {
    songs && sortByTrending();
    // eslint-disable-next-line
  }, [songs]);

  let sortSongIndex;
  if (trending.length >= 1) {
    trending.sort((a, b) => {
      return b - a;
    });
    sortSongIndex = trending.map((tally) => {
      return +tally.substr(tally.indexOf('.') + 1);
    });
  } else {
    sortSongIndex = songs.map((song, index) => {
      return index;
    });
  }

  // filter only 16 songs for the each page
  const newSongIndex = sortSongIndex.filter((song, index) => {
    return (
      index + 1 <= newTotalPaginationIndex && index + 1 > currentPaginationIndex
    );
  });

  const prevPage = () => {
    if (currentPaginationIndex > 0) {
      goToPrevPage(currentPaginationIndex);
    } else {
      return;
    }
  };

  const nextPage = () => {
    if (newTotalPaginationIndex < songs.length) {
      goToNextPage(newTotalPaginationIndex);
    } else {
      return;
    }
  };

  const songElements = newSongIndex.map((songIndex) => {
    const { id } = songs[songIndex];
    return <SongElement key={id} song={songs[songIndex]} />;
  });

  return (
    <div className='main-container'>
      <Helmet>
        <title>Trending Songs - TrillSound</title>
      </Helmet>
      <div className='left-side songs'>
        {searchResults.length >= 1 ? (
          <SearchResults
            searchResults={searchResults}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            <h3 className='page-title'>Trending Songs</h3>
            <div className='pagination top'>
              <div className='pagination-s'>
                <ul>
                  <li onClick={prevPage}>
                    <span className='prev-page'>❮ Previous</span>
                  </li>
                  <li onClick={nextPage}>
                    <span className='next-page'>Next ❯</span>
                  </li>
                </ul>
              </div>
            </div>
            <ul className='songs-container'>{songElements}</ul>
            <div className='pagination'>
              <div className='pagination-s'>
                <ul>
                  <li onClick={prevPage}>
                    <span className='prev-page'>❮ Previous</span>
                  </li>
                  <li onClick={nextPage}>
                    <span className='next-page'>Next ❯</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='right-side sidebar-container'>
        <SideBar />
      </div>
    </div>
  );
};
