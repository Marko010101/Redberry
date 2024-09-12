import styled from "styled-components";

import Button from "./Button.jsx";
import { InputCheckbox } from "./InputCheckbox.jsx";
import { StyledDropdown } from "./StyledDropdown.jsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const StyledDropdownCheckbox = styled(StyledDropdown)`
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  display: grid;
  width: 73rem;
  column-gap: 3.2rem;
  row-gap: 1.6rem;

  & h4 {
    grid-column: 1 / -1;
    margin-bottom: 1.6rem;
    font-size: var(--font-size-medium);
  }

  & label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  & label,
  & input,
  & span {
    cursor: pointer;
  }

  & > button {
    grid-column: 1 / -1;
    justify-self: end;
    margin-top: 3.2rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: var(--font-size-small);
`;

const Dropdown = ({
  data,
  onClick,
  title,
  onFilterChange,
  selectedRegions = [],
}) => {
  const [searchedParams, setSearchedParams] = useSearchParams();

  const [checkedRegions, setCheckedRegions] = useState(
    data.reduce((acc, region) => {
      acc[region.name] = selectedRegions.includes(region.name);
      return acc;
    }, {})
  );
  console.log(checkedRegions);
  function handleClick(value) {
    searchedParams.set("regions", value);
    setSearchedParams(searchedParams);
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCheckedRegions((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const handleApplyClick = () => {
    const selected = Object.keys(checkedRegions).filter(
      (key) => checkedRegions[key]
    );
    onFilterChange(selected);
  };

  return (
    <StyledDropdownCheckbox onClick={onClick}>
      <h4>{title}</h4>
      {data?.map((region) => (
        <label key={region.id}>
          <InputCheckbox
            type="checkbox"
            value={region.name}
            checked={checkedRegions[region.name] || false}
            onChange={handleCheckboxChange}
          />
          <span>{region.name}</span>
        </label>
      ))}
      <StyledButton type="primary" p="0.8rem 1.4rem" onClick={handleApplyClick}>
        არჩევა
      </StyledButton>
    </StyledDropdownCheckbox>
  );
};

export default Dropdown;
