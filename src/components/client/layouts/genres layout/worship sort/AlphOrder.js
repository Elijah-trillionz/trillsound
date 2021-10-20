import React, { useContext, useEffect } from 'react';
import { SideBar } from '../../SideBar';
import { GlobalContext } from '../../../../../context/global state/GlobalState';
import { Header } from '../../Header';
import { Footer } from '../../Footer';
import { MobileHeader } from '../../MobileHeader';
import { TopSlider } from '../../TopSlider';
import { BottomSlider } from '../../BottomSlider';
import { SortMenu } from '../../SortMenu';
import { SearchResults } from '../../SearchResults';
import { Helmet } from 'react-helmet-async';
import { SongElement } from '../../SongElement';

export const WorshipAlphOrder = () => {
  const {
    worshipSongs,
    songTitles,
    currentPaginationIndex,
    newTotalPaginationIndex,
    worshipInAlphOrder,
    goToNextPage,
    goToPrevPage,
    getWorshipSongs,
    searchQuery,
    searchResults,
    songs,
  } = useContext(GlobalContext);

  useEffect(() => {
    songs && getWorshipSongs();
    // eslint-disable-next-line
  }, [songs]);
  useEffect(() => {
    worshipSongs && worshipInAlphOrder();
    // eslint-disable-next-line
  }, [worshipSongs]);

  let sortSongIndex;
  if (songTitles.length >= 1) {
    songTitles.sort();
    sortSongIndex = songTitles.map((songTitle) => {
      return +songTitle.substr(songTitle.indexOf('.') + 1);
    });
  } else {
    sortSongIndex = worshipSongs.map((song, index) => {
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
    if (newTotalPaginationIndex < worshipSongs.length) {
      goToNextPage(newTotalPaginationIndex);
    } else {
      return;
    }
  };

  const songElements = newSongIndex.map((songIndex) => {
    const { id } = worshipSongs[songIndex];
    return <SongElement key={id} song={worshipSongs[songIndex]} />;
  });

  return (
    <div>
      <Helmet>
        <title>Worship Songs - Alphabetical Order - TrillSound</title>
      </Helmet>
      <Header />
      <MobileHeader />
      <main>
        <TopSlider />
        <div className='main-container'>
          <div className='left-side songs'>
            {searchResults.length >= 1 ? (
              <SearchResults
                searchResults={searchResults}
                searchQuery={searchQuery}
              />
            ) : (
              <>
                <h3 className='page-title'>
                  Worship Songs - Alphabetical Order
                </h3>
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

          <SortMenu genre={'worship'} />
        </div>
        <BottomSlider />
      </main>
      <div className='body-container mobile-only'></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
