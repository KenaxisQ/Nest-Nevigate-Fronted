import React, {useState} from 'react';
import { MultiSelect } from "react-multi-select-component";

export const MultiselectDropdown = ({options, selected, setSelected}) => {
//   const options = [
//     { label: "Apple" },
//     { value: "Banana", label: "Banana" },
//     { value: "Cherry", label: "Cherry" },
//     { value: "Date", label: "Date" },
//     { value: "Grape", label: "Grape" },
//     { value: "Lemon", label: "Lemon" },
//     { value: "Orange", label: "Orange" },
//     { value: "Peach", label: "Peach" },
//     { value: "Plum", label: "Plum" }
//   ];

//   const [selected, setSelected] = useState([]);

  const customValueRenderer = (selected, options) => {
    var ret = !(options?.length === selected?.length) ?
    (selected?.length
      ? `${selected?.length} Selected`
      : "Select") : "All Selected";
    return ret;
  };

  return (
    <div style={{ width: 300, textAlign: "left"}}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy='Select'
        // valueRenderer={() => customValueRenderer(selected, options)}
      />
    </div>
  );
};
