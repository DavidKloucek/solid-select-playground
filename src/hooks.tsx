import { createEffect, onCleanup } from "solid-js"

export function useInterval(func: () => void, ms: number|(() => number)): void {
    createEffect(() => {
        const timer = setInterval(func, typeof ms === 'number' ? ms : ms())
        onCleanup(() => {
            clearInterval(timer)
        })
    })
}
