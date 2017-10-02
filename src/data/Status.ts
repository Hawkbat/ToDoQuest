
enum Status {
	Editing = 1,
	InProgress = 2,
	Completed = 4
}

namespace Status {
	export function print(status: Status) {
		if (status == Status.InProgress) return "In Progress"
		else return Status[status]
	}
}

export default Status