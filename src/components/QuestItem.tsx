
import * as React from 'react'
import Status from "../data/Status"
import CStatus from "./Status"
import CProgress from "./Progress"
import IQuest from "../data/Quest"
import Store from "../data/Store"

interface QuestItemProps {
	store: Store
	id: number
}

class CQuestItem extends React.Component<QuestItemProps, {}> {
	clickHandler(e: React.MouseEvent<HTMLElement>) {
		this.props.store.selectQuest(this.props.id)
	}
	keyHandler(e: React.KeyboardEvent<HTMLElement>) {
		if (e.keyCode == 13 || e.keyCode == 32) this.props.store.selectQuest(this.props.id)
	}
	render() {
		var quest = this.props.store.state.quests[this.props.id]
		var stepsComplete = quest.steps.reduce((p, c) => p + (c.complete ? 1 : 0), 0)
		var stepsTotal = quest.steps.length

		return <article tabIndex={0} className={(this.props.store.state.selectedQuest == this.props.id) ? 'active' : null} onClick={(e) => this.clickHandler(e)} onKeyUp={(e) => this.keyHandler(e)}>
			<h3>{quest.name}</h3>
			<CStatus status={quest.status} />
			<CProgress value={stepsTotal > 0 ? stepsComplete / stepsTotal : 1} />
		</article>
	}
}

export default CQuestItem