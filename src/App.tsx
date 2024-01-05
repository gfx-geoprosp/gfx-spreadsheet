import React, { useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Spreadsheet } from "./lib/components/Spreadsheet";
import { Showcase } from "./Showcase";
import { FilterIconComponent } from "./HeaderIcon/Filter";
import { PencilIconComponent } from "./HeaderIcon/Pencil";

export const DATA = [
  {
    name: "lele",
    age: 1,
    gender: "m",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
  {
    name: "yeye1",
    age: 2,
    gender: "f",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
  {
    name: "hehe1",
    age: 3,
    gender: "m",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
  {
    name: "lele",
    age: 4,
    gender: "m",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
  {
    name: "yeye2",
    age: 1,
    gender: "f",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
  {
    name: "hehe2",
    age: 3,
    gender: "m",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
  {
    name: "lele",
    age: 3,
    gender: "m",
    title: "",
    booking: "",
    checkin: "",
    earlyCheckin: "",
    additional: "",
  },
];
export const COLUMNS = [
  "name",
  "age",
  "gender",
  "title",
  "booking",
  "checkin",
  "earlyCheckin",
  "additional",
];

function Basic() {
  const navigate = useNavigate();
  const ref = useRef<any>();
  const [titleRef] = useState<Record<string, string[]>>({
    m: ["mr", "sir"],
    f: ["ms", "mrs", "ma'am"],
  });
  let refSort = useRef<any>();
  const handleClickSort = () => {
    if (refSort.current?.value) {
      let sortStringArray = refSort.current.value.split("&");
      ref && ref.current && ref.current.sortData(sortStringArray);
    }
  }
  return (
    <div>
      <Spreadsheet
        className={"spreadsheet-style"}
        style={{
          fontFamily: "monospace",
          fontWeight: "bolder",
          color: "black",
          backgroundColor: "beige",
        }}
        ref={ref}
        sheetData={DATA}
        sheetOption={{
          includes: COLUMNS,
          columnType: {
            age: "number",
            gender: "dropdown",
            title: "dropdown",
            booking: "date",
            checkin: "time",
            earlyCheckin: "checkbox",
            additional: "s_creatable",
          },
          headerIcon: {
            gender: (data) => (
              <FilterIconComponent
                onClick={() => console.log(`filter click with props = ${data}`)}
              />
            ),
            age: (data) => (
              <PencilIconComponent
                onClick={() => console.log(`pencil click with props = ${data}`)}
              />
            ),
            title: (data) => (
              <PencilIconComponent
                onClick={() => console.log(`pencil click with props = ${data}`)}
              />
            ),
          },
          valuesMap: {
            gender: ["m", "f"],
            title: ["mr", "ms", "mrs", "sir", "ma'am"],
          },
          valuesFilter: {
            title: (option, row) => {
              if (!row["gender"]) {
                return true;
              }
              return titleRef[row["gender"].toString()].includes(
                option.toString()
              );
            },
          },
          initialSheetStyle: [
            [
              ":gender-title",
              {
                color: "orange",
                background: "green",
                paddingLeft: "0",
                // overflow: 'scroll', // will mess with 's_creatable' and 'dropdown' behavior
                // border: { left: { color: 'blue', width: '25px', }, top: { color: 'blue', width: '25px', }, bottom: { color: 'blue', width: '25px', }, right: { color: 'blue', width: '25px', }, }, // cellstyle border are broken since v4.0.4
              },
            ],
          ],
          headerStyle: {
            color: "violet",
            background: "grey",
          },
          validateMap: {
            age: [{ fn: () => true, message: "test" }],
          },
          validationCellStyle: {
            color: "orange",
            background: "black",
          },
        }}
      />
      <div>
        <button
          onClick={() => {
            ref &&
              ref.current &&
              console.log(ref.current.getStyleState(), "getstylestate");
          }}
        >
          StyleState
        </button>
        <button
          onClick={() => {
            ref && ref.current && ref.current.setFocusState(undefined);
          }}
        >
          Remove Focus
        </button>
        <button
          onClick={() => {
            navigate("/showcase");
          }}
        >
          To Showcases
        </button>
        <button
          onClick={() => {
            ref && ref.current.addRow();
          }}
        >
          Add New Row
        </button>
        <button
          onClick={() => {
            ref && ref.current.removeRow();
          }}
        >
          Remove Row
        </button>
        <button
          onClick={() => {
            ref &&
              ref.current &&
              console.log(ref.current.getData(), "get data");
          }}
        >
          Get all value
        </button>
        <button
          onClick={() => {
            ref &&
              ref.current &&
              console.log(ref.current.getCellChanges(), "cell changes");
          }}
        >
          Get change Cell
        </button>
        <input
          type="text"
          ref={refSort}
          // onChange={(e) => {
          //   setSortCol(e.target.value);
          // }}
        />
        <button onClick={handleClickSort}>Sort Data</button>
      </div>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/" element={<Basic />} />
        <Route path="*" element={<Basic />} />
      </Routes>
    </Router>
  );
}

export default App;
