
import ITask from "./Task"
import IStep from "./Step"
import Status from "./Status"

interface IQuest extends ITask {
	status: Status
	steps: IStep[]
	exp: number
}

export default IQuest