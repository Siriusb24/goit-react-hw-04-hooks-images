import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const  ImageGallery = ({ images, onItemClick, onClick, id }) => {
  const handleOpenModal = e => {
    if (e.target !== e.currentTarget) {
      onClick();
    }
  };
  
    return (
      <ul className={s.ImageGallery} onClick={handleOpenModal}>
        {images &&
          images.map(image => (
            <li key={id} className={s.ImageGalleryItem}>
              <ImageGalleryItem {...image} onItemClick={onItemClick} />
            </li>
          ))}
      </ul>
    );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
