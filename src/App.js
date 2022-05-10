import React, { useState, useEffect } from 'react';

import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Spinner from './components/Spinner/Spinner';
import fetchImages from './services/apiServices';
import './App.css';

function App () {
  const [modalContent, setModalContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [id, setId] = useState('');
  

  
  
  useEffect((searchQuery, page) => {
    
    if (searchQuery !== searchQuery) {
    getData();
    }

    if (page !== page) {
    getData();
    
  console.log(getData())
  }
    }, [searchQuery,page]);
  

  const toggleModal = () => {
    setOpenModal(openModal => ({ openModal: !openModal }));
  };

  const toggleLoading = () => {
    setIsLoading(isLoading => ({ isLoading: !isLoading }));
  };

  const hadleChangeQuery = query => {
    if (query === searchQuery) {
      return;
    }
    setSearchQuery(query);
    setVisibleImages([]);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(page => page+1)
  };

  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const modalContentSet = itemId => {
    const element = visibleImages.find(({ id }) => id === itemId);
    setModalContent(modalContent => element.largeImageURL);
  };

  const getData = async () => {
    toggleLoading();
    try {
      const {hits} = await fetchImages(searchQuery, page);
        setVisibleImages(visibleImages => {
          console.log(hits)
          return { visibleImages: [...visibleImages, ...hits] };
        });
        handleScroll()
      }catch (error){ 
        console.log('Smth wrong with App fetch', error);
      } finally{
        toggleLoading()}
  };

  const isNotLastPage = visibleImages.length / page === 12;
  const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;

    return (
      <div className="App">
        <SearchBar onSubmit={hadleChangeQuery} />

        <ImageGallery
          key={id}
          images={visibleImages}
          onClick={toggleModal}
          onItemClick={modalContentSet}
          name={`Load more`}
        />

        {openModal && (
          <Modal content={modalContent} onBackdrop={toggleModal} />
        )}
        {isLoading && <Spinner />}
        {btnEnable && <Button name="Load more" onPress={handleNextPage} />}
      </div>
    );
}

export default App;
