
import * as React from 'react'
import { State, Store } from "../data/Store"
import CHeader from './Header'
import CQuestList from "./QuestList"
import CQuestInfo from "./QuestInfo"

interface AppProps {
	store: Store
}

class CApp extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props)
		this.props.store.callback = () => {
			this.setState((prevState, props) => this.props.store.state)
		}
		this.state = this.props.store.state
	}

	render() {
		return <main>
			<CHeader store={this.props.store} />
			<div className="row grow">
				<CQuestList store={this.props.store} />
				<CQuestInfo store={this.props.store} />
			</div>
		</main>
	}
}

export default CApp