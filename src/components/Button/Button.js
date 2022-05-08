import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onPress, name }) => {
  
    return (
      <button type="button" onClick={onPress} className={s.Button}>
          {name}
      </button>
    );
};


Button.propTypes = {
  name: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default Button;
