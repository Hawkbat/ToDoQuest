
import IQuest from "./quest"
import IStep from "./step"
import Status from "./Status"

export interface State {
	quests: IQuest[]
	level: number
	exp: number
	selectedQuest: number
	selectedStep: number
	editing: boolean
	tempQuest: IQuest
	filter: number
}

export class Store {
	state: State
	callback: () => void = () => { }

	constructor() {
		this.loadState()
	}

	addNewQuest() {
		this.state.quests.push({ name: "New Quest", info: "", status: Status.Editing, exp: 20, steps: [{ name: "Step 1", info: "", complete: false }] })
		this.state.selectedQuest = this.state.quests.length - 1
		this.state.selectedStep = 0
		this.setEditing(true)
		this.refresh()
	}

	selectQuest(questId: number) {
		this.state.selectedQuest = questId
		if (this.state.editing) {
			this.setEditing(false)
		}
		this.refresh()
	}

	removeCurrentQuest() {
		this.state.quests.splice(this.state.selectedQuest, 1)
		this.state.selectedQuest = -1
		this.state.selectedStep = -1
		this.refresh()
	}

	setCurrentQuestStatus(status: Status) {
		var quest = this.state.quests[this.state.selectedQuest]
		if (quest.status == Status.Completed && status != Status.Completed) {
			this.state.exp -= quest.exp
			while (this.state.exp < 0) {
				this.state.exp += 100
				this.state.level--
			}
		}
		quest.status = status
		if (status == Status.Completed) {
			this.state.exp += quest.exp
			while (this.state.exp >= 100) {
				this.state.exp -= 100
				this.state.level++
			}
		} else {
			for (let i = 0; i < quest.steps.length; i++) {
				quest.steps[i].complete = false
			}
		}
		this.refresh()
	}

	addNewStep() {
		this.state.tempQuest.steps.push({ name: "Step " + (this.state.tempQuest.steps.length + 1), info: "", complete: false })
		this.selectStep(this.state.tempQuest.steps.length - 1)
		this.refresh()
	}

	selectStep(stepId: number) {
		this.state.selectedStep = stepId
		this.refresh()
	}

	removeCurrentStep() {
		this.state.tempQuest.steps.splice(this.state.selectedStep, 1)
		this.state.selectedStep = -1
		this.refresh()
	}

	setStepCompletion(stepId: number, complete: boolean) {
		this.state.quests[this.state.selectedQuest].steps[stepId].complete = complete
		this.refresh()
	}

	applyEdit() {
		this.state.quests.splice(this.state.selectedQuest, 1, this.state.tempQuest)
		this.setEditing(false)
		this.refresh()
	}

	setEditing(editing: boolean) {
		this.state.editing = editing
		if (editing) {
			this.state.tempQuest = JSON.parse(JSON.stringify(this.state.quests[this.state.selectedQuest]))
		} else {
			this.state.tempQuest = null
		}
		this.refresh()
	}

	toggleFilter(status: Status) {
		if ((this.state.filter & status) == status) {
			this.state.filter -= status
		} else {
			this.state.filter += status
		}
		this.refresh()
	}

	refresh() {
		this.saveState()
		this.callback()
	}

	saveState() {
		localStorage.setItem("state", JSON.stringify(this.state))
	}

	loadState() {
		if (localStorage.getItem("state")) {
			this.state = JSON.parse(localStorage.getItem("state"))
		} else {
			this.state = {
				quests: [],
				level: 1,
				exp: 0,
				selectedQuest: -1,
				selectedStep: -1,
				editing: false,
				tempQuest: null,
				filter: Status.Editing | Status.InProgress
			}
		}
	}
}

export default Store