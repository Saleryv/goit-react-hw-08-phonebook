import React from 'react';
import { Dna } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

function Loader() {
  return (
    <div className={css.wrapper}>
      <Dna className={css.loader} />
    </div>
  );
}

export default Loader;