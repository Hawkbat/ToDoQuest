
import * as React from 'react'
import Store from "../data/Store"
import Status from "../data/Status"

interface FilterItemProps {
	store: Store
	status: Status
}

class CFilterItem extends React.Component<FilterItemProps, {}> {
	clickHandler(e: React.MouseEvent<HTMLElement>) {
		this.props.store.toggleFilter(this.props.status)
	}
	keyHandler(e: React.KeyboardEvent<HTMLElement>) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			this.props.store.toggleFilter(this.props.status)
		}
	}
	render() {
		return <article tabIndex={0} className="grow" onClick={(e) => this.clickHandler(e)} onKeyUp={(e) => this.keyHandler(e)}>
			<h4>{Status.print(this.props.status)}</h4>
			<div className="checkbox"><i className={(this.props.store.state.filter & this.props.status) == this.props.status ? 'fa fa-check' : ''} /></div>
		</article>
	}
}

export default CFilterItem