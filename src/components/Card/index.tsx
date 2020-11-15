import './index.css';
import React from 'react';

interface Props {
  id: number;
  name: string;
  loading: boolean;
  changeLoading: () => void;
}

const toUpperCase = (name: string): string => {
  return name.toUpperCase();
};

const Card = ({ id, name, loading, changeLoading }: Props): JSX.Element => {
  return (
    <div className="col">
      <div
        className={`card shadow mb-5 mx-auto border ${loading ? 'blur' : ''}`}>
        <div className="card-body border-bottom">
          <h5 className="card-title mb-0 text-center">{toUpperCase(name)}</h5>
        </div>
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          className="card-img-top p-2 mb-4 mt-4"
          onLoad={() => changeLoading()}
        />
      </div>
    </div>
  );
};

export default Card;

/*
<button className="btn btn-primary btn-block">Go somewhere</button>


*/
