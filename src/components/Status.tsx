
import * as React from 'react'
import Status from "../data/Status"

interface StatusProps {
	status: Status
}

class CStatus extends React.Component<StatusProps, {}> {
	render() {
		return <i>{Status.print(this.props.status)}{this.props.children}</i>
	}
}

export default CStatus