
import * as React from 'react'
import CProgress from "./Progress"
import Store from '../data/Store'

interface HeaderProps {
	store: Store
}

class CHeader extends React.Component<HeaderProps, {}> {
	render() {
		return <header>
			<h1>To-Do Quest</h1>
			<section>
				<h3>Level</h3>
				<b>{this.props.store.state.level}</b>
				<div className="spacer" />
				<h3>XP</h3>
				<b>{this.props.store.state.exp}</b>
				<CProgress value={this.props.store.state.exp / 100} />
			</section>
		</header>
	}
}

export default CHeader
