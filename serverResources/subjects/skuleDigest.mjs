import Subject from '../Subject.mjs'

import axios from 'axios'

export default class SkuleDigest extends Subject {
    initialize (params) {
        ({ depth: this.depth, url: this.baseUrl } = params)
        this.numCalls = Math.ceil(this.depth / 20) || 1
    }

    getDigest (cursor) {
        const startPos = cursor * 20
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseUrl}/${startPos}`)
                .then(res => {
                    if (res.status === 200) {
                        resolve(res.data)
                    } else {
                        reject(res.status)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    async update () {
        const digest = []
        for (let i = 0; i < this.numCalls; i++) {
            const currDigest = await this.getDigest(i)
            digest.push(...currDigest)
        }
        return digest
    }
}