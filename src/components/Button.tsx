
import * as React from 'react'

interface ButtonProps {
	label: string
	onClick: () => void
	className: string
}

class CButton extends React.Component<ButtonProps, {}> {
	render() {
		return <button className={this.props.className} onClick={(e) => { e.preventDefault(); this.props.onClick() }}> {this.props.label}</button>
	}
}

export default CButton