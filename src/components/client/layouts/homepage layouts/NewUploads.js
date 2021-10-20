import React, { useContext } from 'react';
import { SideBar } from '../SideBar';
import { GlobalContext } from '../../../../context/global state/GlobalState';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MobileHeader } from '../MobileHeader';
import { TopSlider } from '../TopSlider';
import { BottomSlider } from '../BottomSlider';
import { SearchResults } from '../SearchResults';
import { Helmet } from 'react-helmet-async';
import { SongElement } from '../SongElement';

export const NewUploads = () => {
  const {
    songs,
    currentPaginationIndex,
    newTotalPaginationIndex,
    goToNextPage,
    goToPrevPage,
    searchResults,
    searchQuery,
  } = useContext(GlobalContext);

  // filter only 16 songs for the each page
  const newSongs = songs.filter((song, index) => {
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

  const songElements = newSongs.map((song, index) => {
    const { id } = song;
    return <SongElement key={id} song={song} />;
  });

  return (
    <div>
      <Helmet>
        <title>Newly Uploaded Songs - TrillSound</title>
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
                <h3 className='page-title'>Newly Uploaded</h3>
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
        <BottomSlider />
      </main>
      <div className='body-container mobile-only'></div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
