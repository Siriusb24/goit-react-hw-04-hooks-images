import React, { Component } from 'react';

import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Spinner from './components/Spinner/Spinner';
import fetchImages from './services/apiServices';
import './App.css';

class App extends Component {
  state = {
    modalContent: '',
    searchQuery: '',
    page: 1,
    visibleImages: [],
    isLoading: false,
    openModal: false,
    error: null,
    id:''
  };

  componentDidUpdate(prevProps, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery) {
      this.getData();
    }

    if (page !== this.state.page) {
      this.getData();
    }
  }

  toggleModal = () => {
    this.setState(({ openModal }) => ({ openModal: !openModal }));
  };

  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };

  hadleChangeQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      visibleImages: [],
    });
  };

  handleNextPage = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  modalContentSet = itemId => {
    const { visibleImages } = this.state;
    const element = visibleImages.find(({ id }) => id === itemId);
    this.setState({ modalContent: element.largeImageURL });
  };

  getData = async () => {
    const { searchQuery, page } = this.state;
    this.toggleLoading();
    try {
      const {hits} = await fetchImages(searchQuery, page);
        this.setState(({ visibleImages }) => {
          console.log(hits)
          return { visibleImages: [...visibleImages, ...hits] };
        });
        this.handleScroll()
      }catch (error){ 
        console.log('Smth wrong with App fetch', error);
      } finally{
        this.toggleLoading()}
  };

  render() {
    const { visibleImages, openModal, modalContent, isLoading, page, id} =
      this.state;
    const isNotLastPage = visibleImages.length / page === 12;
    const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;
    return (
      <div className="App">
        <SearchBar onSubmit={this.hadleChangeQuery} />

        <ImageGallery
          key={id}
          images={visibleImages}
          onClick={this.toggleModal}
          onItemClick={this.modalContentSet}
          name={`Load more`}
        />

        {openModal && (
          <Modal content={modalContent} onBackdrop={this.toggleModal} />
        )}
        {isLoading && <Spinner />}
        {btnEnable && <Button name="Load more" onPress={this.handleNextPage} />}
      </div>
    );
  }
}

export default App;
