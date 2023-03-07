import React, { useCallback } from "react";

export default function useCheckList<T>() {
  const [list, setList] = React.useState<T[]>([]);

  const setChecked = useCallback((item: T) => {
    setList((prev) => {
      const index = prev.findIndex(
        (i) => JSON.stringify(i) === JSON.stringify(item)
      );
      const value = [...prev];
      if (index > -1) {
        value.splice(index, 1);
      } else {
        value.push(item);
      }
      //   console.log("----", value);
      return value;
    });
  }, []);

  return { list, setChecked };
}
