import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import useCheckList from "./hooks/useCheckList";

interface Item {
  id: number;
}

function App() {
  const { list, setChecked } = useCheckList<Item>();

  const listDemo = useMemo(() => {
    return new Array(6).fill(0).map((_, index) => ({ id: index }));
  }, []);

  return (
    <div className="App">
      {listDemo.map((item) => (
        <ItemElement
          key={item.id}
          item={item}
          onCheck={setChecked}
        ></ItemElement>
      ))}
      <div>
        now checked elements is:{" "}
        {list.map((item) => {
          return <span key={item.id}>{item.id}</span>;
        })}
      </div>
    </div>
  );
}

export default App;
const ItemElement = memo(
  (props: {
    item: Item;
    // isChecked: boolean;
    onCheck: (event: Item) => void;
  }): JSX.Element => {
    const { item, onCheck } = props;
    const [isChecked, setChecked] = useState(false);
    const handleCheckEvent = useCallback(() => {
      setChecked((prev) => !prev);
      onCheck(item);
    }, [item]);
    console.log("---", item.id);
    return useMemo(() => {
      console.log("-", item.id);
      return (
        <div className={isChecked ? "checked" : ""} onClick={handleCheckEvent}>
          {item.id}
        </div>
      );
    }, [item, isChecked]);
  }
);
