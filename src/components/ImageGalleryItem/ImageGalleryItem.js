import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ onItemClick, id, webformatURL }) => {

const modalContent = id => {
    onItemClick(id);
  };

    return (
      <img
        key={id}
        src={webformatURL}
        alt=""
        className={s.ImageGalleryItem_image}
        onClick={() => modalContent(id)}
      />
    );
}


ImageGalleryItem.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
