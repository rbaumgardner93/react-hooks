// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState( key, defaultValue = '') {
	function getFromLocalStorage() {
		const storageVal = window.localStorage.getItem(key);

		if ( storageVal === "object" && storageVal !== null ) {
			return JSON.parse(storageVal);
		}

		return storageVal;
	}
	const [state, setState] = React.useState( () => getFromLocalStorage() || defaultValue );

	// 🐨 Here's where you'll use `React.useEffect`.
	// The callback should set the `name` in localStorage.
	// 💰 window.localStorage.setItem('name', name)
	React.useEffect(function getName() {
		let local = state;

		if ( state === 'object' && state !== null ) {
			local = JSON.stringify( state );
		}

		window.localStorage.setItem(key, local)
	}, [key, state])

	return [ state, setState ];
}

function Greeting({initialName = ''}) {
  const [ name, setName ] = useLocalStorageState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
