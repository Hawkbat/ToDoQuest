
import * as React from 'react'

interface ProgressProps {
	value: number
}

class CProgress extends React.Component<ProgressProps, {}> {
	render() {
		return <div className="progress" data-value={this.props.value}>
			<div className="value" style={{ width: (this.props.value * 100) + '%' }} />
		</div>
	}
}

export default CProgress