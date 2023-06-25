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
                <ul class={"solid-select-input-list"}>
                    <For each={props.selectedItems}>
                        {item => (
                            <li>
                                <span class="solid-select-input-list-label">{item.label}</span>
                                {props.isMulti && (
                                    <span class="solid-select-input-list-remove" onClick={() => props.onUnselectItem(item)}>×</span>
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
            <div class="solid-select-indicators">
                {props.selectedItems.length > 0 && props.isClearable && (
                    <div class="solid-select-input-reset-all" onClick={props.onResetValues}>×</div>
                )}
            </div>
        </div>
    </>
}
