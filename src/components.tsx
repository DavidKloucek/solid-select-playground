import { createEffect, createSignal, JSXElement, untrack, JSX } from "solid-js";

export function Collapsible(props: {
    title?: string
    onToggle?: () => any,
    children: JSXElement,
    defaultIsOpen?: boolean
    isOpen?: boolean
    onOpen?: boolean
}): JSXElement {
    const [isOpen, setOpen] = createSignal<boolean>(!!props.defaultIsOpen)

    createEffect(() => {
        untrack(() => {
            if (props.onToggle) {
                props.onToggle()
            }
        })
    })

    const toggle = () => {
        setOpen(!isOpen())
    }

    return (
        <div style={{ border: 'solid silver 2px', margin: '10px 0' }}>
            <button onClick={toggle} type="button">{isOpen() ? 'Skrýt' : 'Zobrazit'}</button>
            {props.title !== undefined && (
                <h3>{props.title}</h3>
            )}
            {isOpen() && (
                <>
                    <hr />
                    <div>{props.children}</div>
                </>
            )}
        </div>
    )
}

export function Panel(props: {
    title?: string
    children: JSX.Element
}): JSX.Element {
    return <>
        <br />
        <div style={{
        }}>
            {props.title && (
                <h2>{props.title}</h2>
            )}
            <br />
            {props.children}
            <br />
            <br />
        </div>
        <br />
    </>
}
