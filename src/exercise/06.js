// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [ pokemon, setPokemon ] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName.length) {
      return;
    }

    setPokemon(null);

    fetchPokemon(pokemonName).then(
      pokemonData => { setPokemon(pokemonData) },
    )

  }, [pokemonName])

	if (pokemon) {
		return <PokemonDataView pokemon={pokemon} />
	} else if ( pokemonName ) {
		return <PokemonInfoFallback name={pokemonName} />
	} else {
		return <p>Submit a Pokemon</p>
	}
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
