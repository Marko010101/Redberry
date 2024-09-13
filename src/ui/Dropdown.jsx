import styled from "styled-components";

import Button from "./Button.jsx";
import { InputCheckbox } from "./InputCheckbox.jsx";
import { StyledDropdown } from "./StyledDropdown.jsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledDropdownCheckbox = styled(StyledDropdown)`
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  display: grid;
  width: 73rem;
  column-gap: 3.2rem;
  row-gap: 1.6rem;

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

const Dropdown = ({ data, onClick, title, onClose }) => {
  const [checkedRegions, setCheckedRegions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const regionQuery = searchParams.get("region");
    if (regionQuery) {
      const regionsFromUrl = regionQuery.split(",");
      setCheckedRegions(regionsFromUrl);
    }
  }, [searchParams]);

  const handleCheckboxChange = (regionName) => {
    setCheckedRegions((prev) =>
      prev.includes(regionName)
        ? prev.filter((name) => name !== regionName)
        : [...prev, regionName]
    );
  };

  const handleSave = () => {
    const regionsString = checkedRegions.join(",");

    const newParams = new URLSearchParams(searchParams);

    if (regionsString) {
      newParams.set("region", regionsString);
    } else {
      newParams.delete("region");
    }

    setSearchParams(newParams);
    onClose();
  };

  return (
    <StyledDropdownCheckbox onClick={onClick}>
      <h4>{title}</h4>
      {data?.map((region) => (
        <label key={region.id}>
          <InputCheckbox
            type="checkbox"
            value={region.name}
            onChange={() => handleCheckboxChange(region.name)}
            checked={checkedRegions.includes(region.name)}
          />
          <span>{region.name}</span>
        </label>
      ))}
      <StyledButton type="primary" p="0.8rem 1.4rem" onClick={handleSave}>
        არჩევა
      </StyledButton>
    </StyledDropdownCheckbox>
  );
};

export default Dropdown;
