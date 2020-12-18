import rxjs from 'rxjs'
const { BehaviorSubject, interval } = rxjs;

export default class Subject {
    constructor (params) {
        if (new.target === Subject) {
            throw new TypeError('Cannot construct instances of Subject directly.')
        }
        this.params = params
        const { updateInterval } = params

        this.onUpdate = new BehaviorSubject()
        interval(updateInterval).subscribe(() => this.spawnUpdate())
        
        this.initialize(params)
        this.spawnUpdate()
    }

    initialize (params) {

    }

    async update (params) {

    }

    async spawnUpdate () {
        const newVal = await this.update(this.params)
        this.onUpdate.next(newVal)
    }
}