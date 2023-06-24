import "./App.module.css";
import { createSignal, JSX } from "solid-js";
import { Select } from "./Select/select";
import { Panel } from "./components";

function SimpleUncontrolledSelect(): JSX.Element {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return <>
    <Select
      placeholder={'Select your favorite flavor...'}
      options={options}
      value={[options[0]]}
    />
  </>
}

function SimpleControlledSelect(): JSX.Element {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [selected, setSelected] = createSignal([options[0]])

  return <>
    <Select
      placeholder={'Select your favorite flavor...'}
      options={options}
      value={selected()}
      onChange={(items) => {
        setSelected(items)
      }}
    />
    {selected().length > 0 && <>
      Selected value: {selected()[0].label}
      <button onClick={() => setSelected([])}>Unset</button>
    </>}
  </>
}

function AsyncLazyLoadSelect(): JSX.Element {

  const allData = [
    { value: "1", label: "10x10mm" },
    { value: "2", label: "20x20mm" },
    { value: "3", label: "30x30mm" },
  ];

  async function fetchData() {
    return new Promise<{ value: string, label: string }[]>((res) => {
      setTimeout(() => {
        return res(allData)
      }, 1500)
    })
  }

  const [selected, setSelected] = createSignal<string[]>([])

  const [options, setOptions] = createSignal([allData[1]])

  return <>
    <Select
      isMulti={true}
      placeholder={'Select dimensions...'}
      options={options()}
      value={[allData[1]]}
      onMenuOpen={async () => {
        setOptions(await fetchData())
      }}
      onChange={(items) => {
        setSelected(items.map(x => x.label))
      }}
    />
    <p>Selected values: {selected().length > 0 ? selected().join(", ") : <>nothing</>}</p>
  </>
}

export default function App(): JSX.Element {
  return (
    <div class="App">
      <h1>Select component in SolidJS</h1>
      <div>
        <Panel title="Uncontrolled single select">
          <SimpleUncontrolledSelect />
        </Panel>
        <Panel title="Controlled single select">
          <SimpleControlledSelect />
        </Panel>
        <Panel title="Controlled asynchronous multi select">
          <AsyncLazyLoadSelect />
        </Panel>
      </div>
    </div>
  )
}
