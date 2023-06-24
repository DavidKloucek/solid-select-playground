import { For, JSX, Match, Switch } from "solid-js";
import { OptionType } from "./select";

export type InputProps = {
    selectedItems: OptionType[]
    isMulti: boolean
    isClearable: boolean
    placeholder?: string
    onUnselectItem: (item: OptionType) => void
    onResetValues: () => void
}

export const Input = (props: InputProps): JSX.Element => {
    return <>
        <Switch>
            <Match when={props.selectedItems.length > 0}>
                <ul class={"solid-select-input-selected-list"}>
                    <For each={props.selectedItems}>
                        {item => (
                            <li>
                                <span>{item.label}</span>
                                {props.isMulti && (
                                    <button type="button" class="solid-select-input-selected-list-remove" onClick={() => props.onUnselectItem(item)}>×</button>
                                )}
                            </li>
                        )}
                    </For>
                </ul>
            </Match>
        </Switch>
        <div class="solid-select-input-inner">
            {props.selectedItems.length === 0 && props.placeholder && <>
                {props.placeholder}
            </>}
            {props.selectedItems.length > 0 && props.isClearable && (
                <button class="solid-select-input-reset-all" type="button" onClick={props.onResetValues}>×</button>
            )}
        </div>
    </>
}
