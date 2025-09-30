/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "../../ui/Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortByValue}
      options={options}
      onChange={handleChange}
      type="white"
    />
  );
}

export default SortBy;
