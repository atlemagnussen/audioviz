import { BehaviorSubject } from "rxjs"

const streamSubject = new BehaviorSubject<MediaStream | null>(null)
export const currentStream = streamSubject.asObservable()

export const setCurrentStream = (stream: MediaStream | null) => {
    streamSubject.next(stream)
}