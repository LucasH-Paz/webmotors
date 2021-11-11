import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Header = ({ setIsEditing, isEditing }) => (
  <header>
    <h1 className="title">Webmotors</h1>
    <button
      type="button"
      onClick={() => setIsEditing(!isEditing)}
      className="button is-primary"
    >
      Add new item
    </button>
  </header>
);

Header.propTypes = {
  setIsEditing: PropTypes.objectOf(PropTypes.func),
  isEditing: PropTypes.bool,
}.isRequired;

export default Header;
