import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { SearchResults } from '../SearchResults';
import { SideBar } from '../SideBar';
import { SongElement } from '../SongElement';
import { SortMenu } from '../SortMenu';

export const PraiseBody = () => {
  const {
    praiseSongs,
    currentPaginationIndex,
    newTotalPaginationIndex,
    goToNextPage,
    goToPrevPage,
    getPraiseSongs,
    searchResults,
    searchQuery,
    songs,
  } = useContext(GlobalContext);

  useEffect(() => {
    songs && getPraiseSongs();
    // eslint-disable-next-line
  }, [songs]);

  // filter only 16 songs for the each page
  const newSongs = praiseSongs.filter((song, index) => {
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
    if (newTotalPaginationIndex < praiseSongs.length) {
      goToNextPage(newTotalPaginationIndex);
    } else {
      return;
    }
  };

  const songElements = newSongs.map((song, index) => {
    const { id } = song;
    return <SongElement key={id} song={song} />;
  });

  return (
    <div className='main-container'>
      <Helmet>
        <title>Praise Songs - Newly Uploaded - TrillSound</title>
      </Helmet>
      <div className='left-side songs'>
        {searchResults.length >= 1 ? (
          <SearchResults
            searchResults={searchResults}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            <h3 className='page-title'>Praise Songs - Newly Uploaded</h3>
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

      <SortMenu genre={'praise'} />
    </div>
  );
};
