
import * as React from 'react'
import CQuestItem from "./QuestItem"
import CButton from "./Button"
import CFilterItem from "./FilterItem"
import IQuest from "../data/Quest"
import Store from "../data/Store"
import Status from "../data/Status"

interface QuestListProps {
	store: Store
}

class CQuestList extends React.Component<QuestListProps, {}> {
	render() {
		var quests = this.props.store.state.quests
		var filteredCount = this.props.store.state.quests.reduce((prev, quest) => {
			return prev + (((this.props.store.state.filter & quest.status) == quest.status) ? 1 : 0)
		}, 0)
		return <section>
			<header>
				<h2>Quest Log</h2>
				<div className="row">
					<CFilterItem status={Status.Editing} store={this.props.store} />
					<CFilterItem status={Status.InProgress} store={this.props.store} />
					<CFilterItem status={Status.Completed} store={this.props.store} />
				</div>
			</header>
			<i>Displaying {filteredCount} out of {quests.length} quests</i>
			<ul>
				{quests.map((quest, i) => {
					if ((this.props.store.state.filter & quest.status) == quest.status)
						return <CQuestItem key={i} id={i} store={this.props.store} />
					else return null
				})}
			</ul>
			<CButton label="Create Quest" className="main" onClick={() => this.props.store.addNewQuest()} />
		</section >
	}
}

export default CQuestList