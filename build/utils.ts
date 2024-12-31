interface Task {
  task: () => Promise<void>
  resolve: (value: unknown) => void
  reject: (value: unknown) => void
}

export default class ConcurrencyTask {
  tasks: Task[]
  runingCount: number
  limit: number
  constructor(limit = 3) {
    this.tasks = []
    this.runingCount = 0
    this.limit = limit
  }

  add(task: () => Promise<void>) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      })
      this._run()
    })
  }

  _run() {
    if (this.runingCount < this.limit && this.tasks.length > 0) {
      this.runingCount++
      const { task, resolve, reject } = this.tasks.shift()!
      task().then(resolve, reject).finally(() => {
        this.runingCount--
        this._run()
      })
    }
  }
}
