
import * as React from 'react'
import Status from "../data/Status"
import CStepItem from "./StepItem"
import CStatus from "./Status"
import CButton from "./Button"
import CProgress from "./Progress"
import IQuest from "../data/Quest"
import Store from "../data/Store"

interface QuestInfoProps {
	store: Store
}

class CQuestInfo extends React.Component<QuestInfoProps, {}> {
	changeName(e: React.FormEvent<HTMLInputElement>) {
		this.props.store.state.tempQuest.name = (e.target as any).value
		this.props.store.refresh()
	}
	changeInfo(e: React.FormEvent<HTMLTextAreaElement>) {
		this.props.store.state.tempQuest.info = (e.target as any).value
		this.props.store.refresh()
	}
	changeExp(e: React.FormEvent<HTMLInputElement>) {
		this.props.store.state.tempQuest.exp = (e.target as any).value
		this.props.store.refresh()
	}
	render() {
		if (this.props.store.state.selectedQuest >= 0) {
			var quest = this.props.store.state.quests[this.props.store.state.selectedQuest]
			if (this.props.store.state.editing) quest = this.props.store.state.tempQuest
			var stepsComplete = quest.steps.reduce((p, c) => p + (c.complete ? 1 : 0), 0)
			var stepsTotal = quest.steps.length

			if (this.props.store.state.editing) {
				return <section>
					<header>
						<h2><input type="text" onChange={(e) => this.changeName(e)} value={quest.name} placeholder="Quest Name" /></h2>
					</header>
					<div className="row"><h4>Reward:&nbsp;</h4><i><input type="number" onChange={(e) => this.changeExp(e)} min={0} value={quest.exp} />&nbsp;XP</i></div>
					<h4>Info:</h4>
					<p><textarea onChange={(e) => this.changeInfo(e)} value={quest.info} placeholder="Additional quest details" /></p>
					<CButton label="Add Step" className="" onClick={() => this.props.store.addNewStep()} />
					<ul>
						{quest.steps.map((step, i) => <CStepItem key={i} id={i} store={this.props.store} />)}
					</ul>
					<CButton label="Apply Changes" className="main" onClick={() => this.props.store.applyEdit()} />
					<CButton label="Cancel Changes" className="" onClick={() => this.props.store.setEditing(false)} />
					<CButton label="Delete Quest" className="danger" onClick={() => this.props.store.removeCurrentQuest()} />
				</section >
			} else {
				var questOpts: JSX.Element[] = []
				if (quest.status == Status.InProgress && stepsComplete == stepsTotal) {
					questOpts.push(<CButton key={0} label="Complete Quest" className="main" onClick={() => this.props.store.setCurrentQuestStatus(Status.Completed)} />)
				}
				if (quest.status == Status.Editing) {
					questOpts.push(<CButton key={1} label="Accept Quest" className="main" onClick={() => this.props.store.setCurrentQuestStatus(Status.InProgress)} />)
					questOpts.push(<CButton key={2} label="Edit Quest" className="" onClick={() => this.props.store.setEditing(true)} />)
				} else {
					questOpts.push(<CButton key={3} label="Cancel Quest" className="" onClick={() => this.props.store.setCurrentQuestStatus(Status.Editing)} />)
				}
				return <section>
					<header>
						<h2>{quest.name}</h2>
						<CProgress value={stepsTotal > 0 ? stepsComplete / stepsTotal : 1} />
					</header>
					<CStatus status={quest.status}> - {stepsComplete} of {stepsTotal} complete</CStatus>
					<div className="row"><h4>Reward:&nbsp;</h4><i>{quest.exp} XP</i></div>
					<h4>Info:</h4>
					<p>{quest.info}</p>
					<ul>
						{quest.steps.map((step, i) => <CStepItem key={i} id={i} store={this.props.store} />)}
					</ul>
					{...questOpts}
				</section>
			}
		} else {
			return <section style={{ visibility: "hidden" }}></section>
		}
	}
}

export default CQuestInfo