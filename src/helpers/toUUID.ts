const toUUID = function (props: object) {
  return Object.entries(props)
    .filter((_, v) => typeof v !== "undefined")
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, value]) => {
      let newValue = value;
      if (typeof value === "object") {
        newValue = toUUID(value);
      } else if (typeof value === "number") {
        newValue = parseFloat(value.toFixed(4));
      }
      return newValue ? [key, newValue] : null;
    })
    .flat(Infinity)
    .filter((k) => k !== null)
    .join("-")
    .replace(/[\s\t]+/g, "-");
};

export default toUUID;
