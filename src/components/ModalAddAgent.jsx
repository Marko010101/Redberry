import styled from "styled-components";
import { useState, useEffect } from "react";

import { useOutsideClick } from "../hooks/useOutsideClick.js";
import { useCreateAgent } from "../hooks/useCreateAgent.js";

import Upload from "./ui/Upload.jsx";
import Button from "./ui/Button.jsx";
import ValidationInput from "./ValidationInput.jsx";
import { StyledText } from "./ui/StyledText.jsx";
import { ModalOverlay } from "./ui/ModalOverlay.jsx";
import { errorText } from "../constants/errorText.js";
import { validationTextAgent } from "../constants/validationTextAgent.js";
import { validateInputAgent } from "../utils/validationAgent.js";

const ModalAddAgent = ({ handleToggleAgentModal }) => {
  const { createAgent, isLoading } = useCreateAgent();

  const [file, setFile] = useState(null);
  const ref = useOutsideClick(handleToggleAgentModal);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: "",
  });
  if (isLoading) return <isLoading />;
  const handleFileChange = (uploadedFile) => {
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(fileUrl);
      setFormValues({ ...formValues, avatar: uploadedFile });
      setErrors({
        ...errors,
        avatar: validateInputAgent("avatar", uploadedFile),
      });
    } else {
      setFile(null);
      setFormValues({ ...formValues, avatar: null });
      setErrors({ ...errors, avatar: "" });
    }
  };

  const handleDelete = () => {
    setFile(null);
    setFormValues({ ...formValues, avatar: null });
    setErrors({ ...errors, avatar: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setErrors({ ...errors, [name]: validateInputAgent(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = validateInputAgent(key, formValues[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error && error.length > 0
    );
    if (!hasErrors) {
      const agentData = { ...formValues };

      await createAgent(agentData);
      handleToggleAgentModal();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent ref={ref}>
        <h3 className="TextBolder">აგენტის დამატება</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <ValidationInput
              fieldName="სახელი"
              inputName="name"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextAgent}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="გვარი"
              inputName="surname"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextAgent}
              errorText={errorText}
            />
          </div>
          <div>
            <ValidationInput
              fieldName="ელ-ფოსტა"
              inputName="email"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextAgent}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="ტელეფონის ნომერი"
              inputName="phone"
              type="number"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextAgent}
              errorText={errorText}
            />
          </div>
          <div>
            <div className="grid-col">
              <label htmlFor="file-upload" className="TextBolder">
                ატვირთეთ ფოტო *
              </label>
              <Upload
                value={file}
                onChange={handleFileChange}
                handleDelete={handleDelete}
                name="file-upload"
                isError={Boolean(errors.avatar)}
                setError={(error) =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    avatar: error,
                  }))
                }
              />
              {errors.avatar && (
                <StyledText isError={true}>{errors.avatar}</StyledText>
              )}
            </div>
          </div>
          <div>
            <Button
              variant="secondary"
              type="button"
              onClick={handleToggleAgentModal}
            >
              გაუქმება
            </Button>
            <Button variant="primary" type="submit">
              აგენტის დამატება
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalAddAgent;

const ModalContent = styled.div`
  width: 100.9rem;
  height: 78.4rem;
  padding: 8.7rem 10.5rem;
  border-radius: 2rem;
  gap: 3.5rem;
  background-color: var(--white);

  & h3 {
    font-size: var(--font-size-extra-huge);
    text-align: center;
    margin-bottom: 6.1rem;
  }

  & form {
    & > div:not(:first-of-type) {
      margin-top: 2.8rem;
    }

    & > div:last-child {
      display: flex;
      justify-content: end;
      margin-top: 9.4rem;
    }

    & > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3.1rem;

      & > div {
        & > label {
          font-size: var(--font-size-small);
          margin-bottom: 1rem;
          width: max-content;
          cursor: pointer;
        }
      }
    }

    .grid-col {
      grid-column: 1/-1;
      display: grid;
    }
  }
`;
