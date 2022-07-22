// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView } from '../pokemon'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null }
	}

	static getDerivedStateFromError(error) {
		// update state so the next render will show the fallback UI
		return { error }
	}

	render() {
		const { error } = this.state;
		if (error) {
			return <this.props.FallbackComponent error={error} />
		}

		return this.props.children;
	}
}

function PokemonInfo({pokemonName}) {
  const [ pokemon, setPokemon ] = React.useState(null);
  const [ error, setError ] = React.useState(null)
  const [ status, setStatus ] = React.useState("idle");

  React.useEffect(() => {
    if (!pokemonName.length) {
      return;
    }

	setStatus("pending");
    fetchPokemon(pokemonName).then(
      pokemon => {
		  setPokemon(pokemon)
		  setStatus("resolved")

	  },
	  error => {
		  setError(error)
		  setStatus("rejected");
	  }
    )

  }, [pokemonName])

	if (status === "idle" ) {
		return <p>Submit a Pokemon</p>
	} else if (status === "pending") {
		return <PokemonInfoFallback name={pokemonName} />
	} else if (status === "resolved") {
		return <PokemonDataView pokemon={pokemon} />
	} else if (status === "rejected") {
		throw error;
	} else {
		throw new Error("This should not be possible")
	}
}

function ErrorFallback( { error } ) {
	return (
		<div role="alert">
			There was an error: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
		</div>
	)
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
	  	<ErrorBoundary key={ pokemonName } FallbackComponent={ErrorFallback}>
			<PokemonInfo pokemonName={pokemonName} />
	  	</ErrorBoundary>
      </div>
    </div>
  )
}

export default App
