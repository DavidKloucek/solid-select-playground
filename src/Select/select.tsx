import { createEffect, createSignal, mergeProps, JSX, on, onMount, onCleanup } from "solid-js";
import './Select.css'
import { Menu } from "./menu";
import { Input } from "./input";

export type OptionType = {
    label: string
    value: string
}

export type SelectProps = {
    isMulti?: boolean
    placeholder?: string
    options: OptionType[]
    value?: OptionType[]
    closeMenuOnSelect?: boolean
    closeMenuOnReset?: boolean
    isClearable?: boolean
    className?: string
    onMenuOpen?: () => void
    onChange?: (options: OptionType[]) => void
}

export const Select = (defaultProps: SelectProps): JSX.Element => {

    let props = mergeProps({
        isMulti: false,
        closeMenuOnSelect: true,
        closeMenuOnReset: true,
        isClearable: true,
        value: [],
    }, defaultProps)

    createEffect(on(() => props.value, () => {
        setSelectedItems(props.value)
    }))

    const [selectedItems, setSelectedItems] = createSignal<OptionType[]>(props.value)
    const [isOpen, setOpen] = createSignal<boolean>(false)

    function handleSelect(item: OptionType) {
        let exists = selectedItems().map(v => v.value).includes(item.value)
        if (exists) {
            setSelectedItems(selectedItems().filter(x => x.value !== item.value))
        } else {
            setSelectedItems(props.isMulti ? selectedItems().concat(item) : [item])
        }
        if (props.closeMenuOnSelect) {
            setOpen(false)
        }
    }

    createEffect(on(selectedItems, () => {
        if (props.onChange) {
            props.onChange(selectedItems())
        }
    }))

    function unselectItem(item: OptionType) {
        setSelectedItems(selectedItems().filter(x => x.value !== item.value))
    }

    function resetValues() {
        setSelectedItems([])
        if (props.closeMenuOnReset) {
            setOpen(false)
        }
    }

    let containerRef: HTMLDivElement | undefined
    onMount(() => {
        function onClick(e: any) {
            if (containerRef && !containerRef.contains(e.target as HTMLDivElement)) {
                setOpen(false);
            }
        }
        document.body.addEventListener("click", onClick);
        onCleanup(() => document.body.removeEventListener("click", onClick));
    })

    return (
        <div
            ref={containerRef}
            classList={{
                "solid-select": true,
                'solid-select-multi': props.isMulti,
                'solid-select-single': !props.isMulti,
                'solid-select-clearable': !!props.isClearable,
                [props.className ?? '']: !!props.className,
            }}
        >
            <div
                class={"solid-select-input"}
                onClick={
                    () => {
                        if (!isOpen() && props.onMenuOpen) {
                            props.onMenuOpen();
                        }
                        setOpen(!isOpen())
                    }
                }
            >
                <Input
                    selectedItems={selectedItems()}
                    placeholder={props.placeholder}
                    isClearable={props.isClearable}
                    onResetValues={resetValues}
                    onUnselectItem={unselectItem}
                    isMulti={props.isMulti}
                />
            </div>
            {isOpen() && (
                <Menu
                    selectedOptions={selectedItems()}
                    options={props.options}
                    onSelect={handleSelect}
                />
            )}
        </div>
    )
}
