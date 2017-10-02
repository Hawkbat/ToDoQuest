
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import CApp from "./components/App"
import Store from "./data/Store"

ReactDOM.render(
	<CApp store={new Store()} />,
	document.getElementById('root')
)
