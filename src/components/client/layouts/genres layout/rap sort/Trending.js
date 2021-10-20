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

export const RapTrending = () => {
  const {
    rapSongs,
    trendingRapSongs,
    currentPaginationIndex,
    newTotalPaginationIndex,
    getRapSongs,
    getTrendingRapSongs,
    goToNextPage,
    goToPrevPage,
    searchResults,
    searchQuery,
    songs,
  } = useContext(GlobalContext);

  useEffect(() => {
    songs && getRapSongs();
    // eslint-disable-next-line
  }, [songs]);
  useEffect(() => {
    rapSongs && getTrendingRapSongs();
    // eslint-disable-next-line
  }, [rapSongs]);

  let sortSongIndex;
  if (trendingRapSongs.length >= 1) {
    trendingRapSongs.sort((a, b) => {
      return b - a;
    });
    sortSongIndex = trendingRapSongs.map((tally) => {
      return +tally.substr(tally.indexOf('.') + 1);
    });
  } else {
    sortSongIndex = rapSongs.map((song, index) => {
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
    if (newTotalPaginationIndex < rapSongs.length) {
      goToNextPage(newTotalPaginationIndex);
    } else {
      return;
    }
  };

  const songElements = newSongIndex.map((songIndex, index) => {
    const { id } = rapSongs[songIndex];
    return <SongElement key={id} song={rapSongs[songIndex]} />;
  });

  return (
    <div>
      <Helmet>
        <title>Trending Rap Songs - TrillSound</title>
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
                <h3 className='page-title'>Rap Songs - Trending</h3>
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

          <SortMenu genre={'rap'} />
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
