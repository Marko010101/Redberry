import styled from "styled-components";
import { useState } from "react";

import { useOutsideClick } from "../hooks/useOutsideClick.js";
import { useCreateAgent } from "../hooks/useCreateAgent.js";

import Upload from "./ui/Upload.jsx";
import Button from "./ui/Button.jsx";
import ValidationInput from "./ValidationInput.jsx";
import { StyledText } from "./ui/StyledText.jsx";
import { ModalOverlay } from "./ui/ModalOverlay.jsx";

const validationText = {
  name: "მინიმუმ ორი სიმბოლო",
  surname: "მინიმუმ ორი სიმბოლო",
  email: "გამოიყენეთ @redberry.ge ფოსტა",
  phone: "მხოლოდ რიცხვები",
  avatar: "ფოტო სავალდებულოა",
};

const errorText = "ჩაწერეთ ვალიდური მონაცემები";

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

  const validateInput = (name, value) => {
    if (name === "name" || name === "surname") {
      if (!value.trim()) return validationText.name;
      if (value.length < 2) return errorText;

      return;
    }

    if (name === "email") {
      if (!value.trim()) return validationText.email;
      if (!/^.+@redberry\.ge$/.test(value)) return errorText;

      return;
    }

    if (name === "phone") {
      if (!value.trim()) return validationText.phone;
      const phonePattern = /^5[0-9]{8}$/;

      if (!phonePattern.test(value)) return errorText;

      return;
    }

    if (name === "avatar") {
      if (!value) return validationText.avatar;
      if (value.size > 1024 * 1024)
        return "ფაილის ზომა არუნდა აღემატებოდეს 1MB";

      return;
    }

    return "";
  };

  const handleFileChange = (uploadedFile) => {
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(fileUrl);
      setFormValues({ ...formValues, avatar: uploadedFile });
      setErrors({ ...errors, avatar: validateInput("avatar", uploadedFile) });
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

    setErrors({ ...errors, [name]: validateInput(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateInput("name", formValues.name),
      surname: validateInput("surname", formValues.surname),
      email: validateInput("email", formValues.email),
      phone: validateInput("phone", formValues.phone),
      avatar: validateInput("avatar", formValues.avatar),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error && error.length > 0
    );

    if (!hasErrors) {
      const agentData = {
        name: formValues.name,
        surname: formValues.surname,
        email: formValues.email,
        phone: formValues.phone,
        avatar: formValues.avatar,
      };

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
              validationText={validationText}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="გვარი"
              inputName="surname"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationText}
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
              validationText={validationText}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="ტელეფონის ნომერი"
              inputName="phone"
              type="number"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationText}
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

      & input {
        margin: 0.5rem 0 0.4rem 0;
      }
    }

    .TextBolder {
      font-weight: var(--font-weight-medium);
    }
    .grid-col {
      grid-column: 1/-1;
      display: grid;
    }
  }
`;
