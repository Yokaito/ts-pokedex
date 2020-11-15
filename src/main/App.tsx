import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Card from '../components/Card';

interface Types {
  slot: number;
  type: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
  types: Types;
}

interface Pokemons {
  count: number;
  next: string;
  previous?: string;
  results: Pokemon[];
}

function App(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemons>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => {
        setPokemons(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exibirPokemons = (): any => {
    return pokemons?.results.map((pokemon, index) => {
      const url = pokemon.url.split('/');
      const id = parseInt(url[6]);

      return (
        <Card
          key={index}
          id={id}
          name={pokemon.name}
          loading={loading}
          changeLoading={changeLoading}
        />
      );
    });
  };

  const nextPokemons = (): void => {
    setLoading(true);
    scrollTop();
    if (pokemons?.next) {
      axios.get(`${pokemons?.next}`).then((response) => {
        setPokemons(response.data);
      });
    }
  };

  const previousPokemons = (): void => {
    if (pokemons?.previous) {
      scrollTop();
      axios.get(`${pokemons?.previous}`).then((response) => {
        setPokemons(response.data);
      });
    }
  };

  const changeLoading = (): void => {
    setLoading(false);
  };

  const scrollTop = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <nav className="navbar mb-4 shadow">
        <a className="navbar-brand" href="#">
          <img
            src="https://icon-library.com/images/pokedex-icon/pokedex-icon-21.jpg"
            width="30"
            height="30"
          />
          <span className="ml-2">Pokedex</span>
        </a>
      </nav>
      <div className="container">
        <div className="row">{exibirPokemons()}</div>
        <div className="buttons mb-5">
          <button
            className="btn btn-lg btn-primary"
            onClick={() => previousPokemons()}>
            Back
          </button>
          <button
            className="btn btn-lg btn-primary float-right"
            onClick={() => nextPokemons()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
