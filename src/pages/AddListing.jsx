import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Done from "../assets/done.svg?react";

import { useCreateListing } from "../hooks/useCreateListing.js";
import { useRegions } from "../hooks/useRegions.js";
import { useAgents } from "../hooks/useAgents.js";
import { useCities } from "../hooks/useCities.js";
import { errorText } from "../constants/errorText.js";
import { StyledText } from "../components/ui/StyledText.jsx";
import RadioInput from "../components/ui/RadioInput.jsx";
import Upload from "../components/ui/Upload.jsx";
import Button from "../components/ui/Button.jsx";
import Loader from "../components/ui/Loader.jsx";
import ValidationInput from "../components/ValidationInput.jsx";
import DropdownSelect from "../components/ui/DropdownSelect.jsx";
import { validationTextListing } from "../constants/validationTextListing.js";
import { validateInputListing } from "../utils/validationListing.js";

const initialValues = {
  is_rental: "0",
  address: "",
  zip_code: "",
  region_id: "",
  city_id: "",
  description: "",
  price: "",
  area: "",
  bedrooms: "",
  image: null,
  agent_id: "",
};

const initialErrorValues = {
  is_rental: "",
  address: "",
  zip_code: "",
  region_id: "",
  city_id: "",
  price: "",
  area: "",
  bedrooms: "",
  description: "",
  image: "",
  agent_id: "",
};

const AddListing = () => {
  const navigate = useNavigate();
  const { regions, isLoading } = useRegions();
  const { cities, isLoading: isLoadingCities } = useCities();
  const { agents, isLoading: isLoadingAgents } = useAgents();
  const { createRealEstate, isLoading: isLoadingCreateRealEstate } =
    useCreateListing();

  const [file, setFile] = useState(null);
  const savedFormValues = localStorage.getItem("formValues");
  const initialFormValues = savedFormValues
    ? JSON.parse(savedFormValues)
    : initialValues;

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrorValues);

  useEffect(() => {
    const savedFormValues = localStorage.getItem("formValues");
    if (savedFormValues) {
      const parsedValues = JSON.parse(savedFormValues);
      if (parsedValues.image) {
        fetch(parsedValues.image)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "uploaded_image.jpg", {
              type: "image/jpeg",
            });
            setFormValues({ ...parsedValues, image: file });
            setFile(URL.createObjectURL(file));
          });
      } else {
        setFormValues(parsedValues);
      }
    }
  }, []);

  useEffect(() => {
    const saveValues = { ...formValues };
    if (saveValues.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveValues.image = reader.result;
        localStorage.setItem("formValues", JSON.stringify(saveValues));
      };
      reader.readAsDataURL(saveValues.image);
    } else {
      localStorage.setItem("formValues", JSON.stringify(saveValues));
    }
  }, [formValues]);

  if (
    isLoading ||
    isLoadingCities ||
    isLoadingAgents ||
    isLoadingCreateRealEstate
  )
    return <Loader />;

  const filteredCities = cities?.filter((city) => {
    return Number(formValues?.region_id) === city.region_id;
  });

  const handleFileChange = (uploadedFile) => {
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(fileUrl);
      setFormValues({ ...formValues, image: uploadedFile });
      setErrors({
        ...errors,
        image: validateInputListing("image", uploadedFile),
      });
    } else {
      setFile(null);
      setFormValues({ ...formValues, image: null });
      setErrors({ ...errors, image: "" });
    }
  };

  const handleDelete = () => {
    setFile(null);
    setFormValues({ ...formValues, image: null });
    setErrors({ ...errors, image: "" });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("formValues");
    setFormValues(initialValues);
    setFile(null);
    setErrors(initialErrorValues);
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "region_id") {
      setFormValues((prevValues) => ({
        ...prevValues,
        region_id: value,
        city_id: "",
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        region_id: validateInputListing("region_id", value),
        city_id: "",
      }));
      return;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateInputListing(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = validateInputListing(key, formValues[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error && error.length > 0
    );

    if (!hasErrors) {
      const listingData = {
        ...formValues,
      };
      await createRealEstate(listingData, {
        onSuccess: () => clearLocalStorage(),
      });
    }
  };

  return (
    <StyledAddListing>
      <h1>ლისტინგის დამატება</h1>

      <StyledForm onSubmit={handleSubmit}>
        <div>
          <h4 className="no-margin">გარიგების ტიპი</h4>
          <div>
            <RadioInput
              formValues={formValues}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <h4>მდებარეობა</h4>
          <div>
            <ValidationInput
              fieldName="მისამართი"
              inputName="address"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextListing}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="საფოსტო ინდექსი"
              inputName="zip_code"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextListing}
              errorText={errorText}
            />
            <div>
              <h5>რეგიონი *</h5>
              <DropdownSelect
                name="region_id"
                data={regions}
                defaultText="აირჩიე რეგიონი"
                handleAction={handleInputChange}
                reset={formValues.region_id === ""}
                validationText={validationTextListing}
                errors={errors}
                errorText={errorText}
              />
            </div>
            <div className="height">
              {formValues.region_id && (
                <>
                  <h5>ქალაქი</h5>
                  <DropdownSelect
                    name="city_id"
                    data={filteredCities}
                    defaultText="აირჩიე ქალაქი"
                    handleAction={handleInputChange}
                    reset={formValues.city_id === ""}
                    validationText={validationTextListing}
                    errors={errors}
                    errorText={errorText}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <h4>ბინის დეტალები</h4>
          <div>
            <ValidationInput
              fieldName="ფასი"
              inputName="price"
              type="number"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextListing}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="ფართობი"
              inputName="area"
              type="number"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextListing}
              errorText={errorText}
            />
            <ValidationInput
              fieldName="საძინებლების რაოდენობა"
              inputName="bedrooms"
              type="number"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextListing}
              errorText={errorText}
            />

            <div className="grid-col">
              <p className="TextBolder">აღწერა *</p>
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              />
              <StyledText
                isError={
                  errors.description === validationTextListing.description ||
                  errors.description === errorText
                }
                isSuccess={errors.description === errorText.description}
              >
                {errors.description !== errorText && <span>{<Done />}</span>}
                {errors.description || validationTextListing.description}
              </StyledText>
            </div>
            <div className="grid-col">
              <p className="TextBolder">ატვირთეთ ფოტო *</p>
              <Upload
                value={file}
                onChange={handleFileChange}
                handleDelete={handleDelete}
                name="file-upload"
                isError={Boolean(errors.image)}
                setError={(error) =>
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: error,
                  }))
                }
              />
              {errors.image && (
                <StyledText isError={true}>{errors.image}</StyledText>
              )}
            </div>
          </div>
        </div>
        <div>
          <h4>აგენტი</h4>
          <div>
            <div>
              <h5>აირჩიე *</h5>
              <DropdownSelect
                name="agent_id"
                data={agents}
                defaultText="აირჩიე აგენტი"
                handleAction={handleInputChange}
                reset={formValues.agent_id === ""}
                isAgent={true}
                validationText={validationTextListing}
                errors={errors}
                errorText={errorText}
              />
            </div>
          </div>
        </div>
        <div>
          <Button variant="secondary" type="button" onClick={clearLocalStorage}>
            გაუქმება
          </Button>
          <Button variant="primary" type="submit">
            დაამატე ლისტინგი
          </Button>
        </div>
      </StyledForm>
    </StyledAddListing>
  );
};

export default AddListing;

const StyledAddListing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6.2rem 0 8.7rem 0;

  & > h1 {
    font-weight: var(--font-weight-medium);
    margin-bottom: 6.1rem;
  }
`;
const StyledForm = styled.form`
  width: 79rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;

  & > div:last-child {
    flex-direction: row;
    justify-content: end;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > h4 {
      font-weight: var(--font-weight-medium);
      color: var(--color-text-helvetica);
      margin-bottom: 2.2rem;
      font-feature-settings: "case" on;
      text-transform: uppercase;
    }

    & > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      /* grid-template-rows: 8.3rem; */
      grid-gap: 2rem;
      position: relative;

      & h5 {
        font-size: var(--font-size-small);
        font-weight: var(--font-weight-medium);
        margin-bottom: 0.5rem;
      }
    }
    & textarea {
      grid-column: 1 / -1;
      height: 13rem;
      width: 100%;
      resize: none;
      border-radius: 0.6rem;
      border: 0.1rem solid var(--color-cloudy-gray);
      padding: 1rem;
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-regular);
    }

    .TextBolder {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-small);
      margin-bottom: 0.5rem;
    }
    .grid-col {
      grid-column: 1/-1;
    }
    .no-margin {
      margin: 0rem;
    }
    .height {
      height: 8.3rem;
    }
  }

  @media screen and (max-width: 768px) {
    width: max-content;
  }
`;
