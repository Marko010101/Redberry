import styled from "styled-components";

import PlusCircle from "../../assets/plus-circle.svg?react";
import Delete from "../../assets/delete.svg?react";

const FileUploadWrapper = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 12rem;
  border: 0.1rem dashed
    ${(props) =>
      props.isError ? "var(--color-primary)" : "var(--color-cloudy-gray)"};
  border-radius: 0.8rem;

  & > div {
    position: relative;
    display: flex;
  }

  & img {
    height: 8.2rem;
    width: auto;
    object-fit: cover;
    border-radius: 0.4rem;
    margin: 0;
  }

  & span {
    position: absolute;
    right: -0.8rem;
    bottom: -0.5rem;

    cursor: pointer;
  }

  & label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & input {
    display: none;
  }
`;

const Upload = ({ value, onChange, handleDelete, name, isError, setError }) => {
  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setError(null);
      onChange(file);
    }
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete();
  };

  return value ? (
    <FileUploadWrapper className="group" isError={isError}>
      <div>
        <img src={value} alt={`${name}`} />
        <span onClick={onDeleteClick}>
          <Delete />
        </span>
      </div>
    </FileUploadWrapper>
  ) : (
    <FileUploadWrapper isError={isError}>
      <label htmlFor={name}>
        <PlusCircle />
        <input id={name} type="file" onChange={onFileChange} />
      </label>
    </FileUploadWrapper>
  );
};

export default Upload;
