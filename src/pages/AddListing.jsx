import styled from "styled-components";

const StyledAddListing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    font-weight: var(--font-weight-medium);
    margin: 6.2rem 0 6.1rem 0;
  }
`;
const StyledForm = styled.div`
  width: 79rem;

  display: flex;
  flex-direction: column;
  gap: 8rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > h4 {
      font-family: "Helvetica Neue";
      font-weight: var(--font-weight-medium);
      color: var(--color-text-helvetica);
    }

    & > div {
      display: flex;
      gap: 3.2rem;
      align-items: center;

      & > label {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 2.3rem;

        & > input[type="radio"] {
          display: none;
        }

        & > span {
          height: 1.7rem;
          width: 1.7rem;
          border-radius: 50%;
          border: 0.2rem solid var(--color-text);
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        & > span::after {
          content: "";
          height: 0.7rem;
          width: 0.7rem;
          background-color: var(--color-text);
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          border-radius: 50%;
          transition: transform 0.2s ease-in-out;
        }

        & > input[type="radio"]:checked + span::after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  }
`;

const AddListing = () => {
  return (
    <StyledAddListing>
      <h1>ლისტინგის დამატება</h1>

      <StyledForm>
        <div>
          <h4>გარიგების ტიპი</h4>
          <div>
            <label>
              <input type="radio" name="dealType" value="buy" />
              იყიდება
              <span></span>
            </label>
            <label>
              <input type="radio" name="dealType" value="rent" />
              ქირავდება
              <span></span>
            </label>
          </div>
        </div>

        <div>
          <h4>მდებარეობა</h4>
        </div>
        <div>
          <h4>ბინის დეტალები</h4>
        </div>
        <div>
          <h4>აგენტი</h4>
        </div>
      </StyledForm>
    </StyledAddListing>
  );
};

export default AddListing;
