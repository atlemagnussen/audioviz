import { BehaviorSubject } from "rxjs"
// @ts-ignore
import butterchurnPresets from "butterchurn-presets"
export const presets: Record<string, any> = butterchurnPresets.getPresets()
const presetSubject = new BehaviorSubject<string>("Flexi, martin + geiss - dedicated to the sherwin maxawow")
export const butterPreset = presetSubject.asObservable()
export const setButterPreset = (name: string) => {
    presetSubject.next(name)
}
