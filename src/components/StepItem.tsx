
import * as React from 'react'
import IQuest from "../data/Quest"
import IStep from "../data/Step"
import Status from "../data/Status"
import CStatus from "./Status"
import CButton from "./Button"
import Store from "../data/Store"

interface StepItemProps {
	store: Store
	id: number
}

class CStepItem extends React.Component<StepItemProps, {}> {
	changeName(e: React.FormEvent<HTMLInputElement>) {
		this.props.store.state.tempQuest.steps[this.props.id].name = (e.target as any).value
		this.props.store.refresh()
	}
	changeInfo(e: React.FormEvent<HTMLTextAreaElement>) {
		this.props.store.state.tempQuest.steps[this.props.id].info = (e.target as any).value
		this.props.store.refresh()
	}
	clickHandler(e: React.MouseEvent<HTMLElement>) {
		this.props.store.selectStep(this.props.id)
	}
	keyHandler(e: React.KeyboardEvent<HTMLElement>) {
		if (e.keyCode == 13 || e.keyCode == 32) this.props.store.selectStep(this.props.id)
	}
	checkboxClickHandler(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault()
		e.stopPropagation()
		this.props.store.setStepCompletion(this.props.id, !this.props.store.state.quests[this.props.store.state.selectedQuest].steps[this.props.id].complete)
	}
	checkboxKeyHandler(e: React.KeyboardEvent<HTMLElement>) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			this.props.store.setStepCompletion(this.props.id, !this.props.store.state.quests[this.props.store.state.selectedQuest].steps[this.props.id].complete)
		}
	}
	render() {
		var quest: IQuest = null
		if (this.props.store.state.editing) quest = this.props.store.state.tempQuest
		else quest = this.props.store.state.quests[this.props.store.state.selectedQuest]

		var step = quest.steps[this.props.id]

		if (this.props.id == this.props.store.state.selectedStep) {
			if (this.props.store.state.editing) {
				return <article tabIndex={0} className='col active'>
					<h3><input type="text" onChange={(e) => this.changeName(e)} value={step.name} placeholder="Step Label" /></h3>
					<h4>Info:</h4>
					<p><textarea onChange={(e) => this.changeInfo(e)} value={step.info} placeholder="Additional step details" /></p>
					<CButton label="Remove Step" className="" onClick={() => this.props.store.removeCurrentStep()} />
				</article>
			} else {
				if (quest.status == Status.InProgress) {
					return <article tabIndex={0} className="col active">
						<h3>{step.name}</h3>
						<h4>Info:</h4>
						<p>{step.info}</p>
						<div className="checkbox" tabIndex={0} onClick={(e) => this.checkboxClickHandler(e)} onKeyUp={(e) => this.checkboxKeyHandler(e)}>
							<i className={step.complete ? 'fa fa-check' : ''} />
						</div>
					</article >
				} else {
					return <article tabIndex={0} className="col active">
						<h3>{step.name}</h3>
						<h4>Info:</h4>
						<p>{step.info}</p>
					</article>
				}
			}
		} else {
			if (quest.status == Status.InProgress) {
				return <article tabIndex={0} onClick={(e) => this.clickHandler(e)} onKeyUp={(e) => this.keyHandler(e)}>
					<h4>{step.name}</h4>
					<div className="checkbox" tabIndex={0} onClick={(e) => this.checkboxClickHandler(e)} onKeyUp={(e) => this.checkboxKeyHandler(e)}>
						<i className={step.complete ? 'fa fa-check' : ''} />
					</div>
				</article>
			} else {
				return <article tabIndex={0} onClick={(e) => this.clickHandler(e)} onKeyUp={(e) => this.keyHandler(e)}>
					<h4>{step.name}</h4>
				</article>
			}
		}
	}
}

export default CStepItem