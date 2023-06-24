import { For, JSX, createEffect, createSignal, untrack } from "solid-js"

type OptionType = {
    label: string
    value: string
}

export type SelectMenuProps = {
    options: OptionType[]
    selectedOptions: OptionType[]
    onSelect: (item: OptionType) => void
}

export const Menu = (props: SelectMenuProps): JSX.Element => {

    const [selValues, setSelValues] = createSignal<string[]>([])

    createEffect(() => {
        const values = props.selectedOptions
        untrack(() => {
            setSelValues(values.map(x => x.value))
        })
    })

    return <>
        <ul class={"solid-select-menu-list"}>
            <For each={props.options}>
                {(item) => (
                    <li
                        class={selValues().includes(item.value) ? 'selected' : ''}
                        onClick={() => props.onSelect(item)}
                    >{item.label}</li>
                )}
            </For>
        </ul>
    </>
}
