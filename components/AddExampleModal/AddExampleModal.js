import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import { useRef, useState } from "react";
import { QUERY_EVENTS } from "../../helpers/query";
import {
  AddEventCta,
  CancelCta,
  CtaWrap,
  ModalForm,
  ModalFormRow,
  ModalHeader,
  ModalInput,
  ModalInputLabel,
  ModalInputWrapper,
  ModalWrapper,
} from "../AddModal/AddModalStyle";

export const EVENT_UPDATE_BY_ID = gql`
  mutation EventUpdateById($id: MongoID!, $record: UpdateByIdEventInput!) {
    eventUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

const Modal = ({ closeModal, active, activeEvent, onUpdate, exampleModal }) => {
  const [date, setDate] = useState();
  const [measureActual, setMeasureActual] = useState();
  const [measureForecast, setMeasureForecast] = useState();
  const [measurePrevious, setMeasurePrevious] = useState();
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const [updateEventById, { data, loading, error }] = useMutation(
    EVENT_UPDATE_BY_ID,
    {
      refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      axios
        .post("https://api.tbible.club/uploads", formData, {})
        .then((response) => {
          updateEventById({
            variables: {
              id: activeEvent?._id,
              record: {
                examples: [
                  ...(activeEvent?.examples || []),
                  {
                    date: date,
                    measureActual: measureActual,
                    measureForecast: measureForecast,
                    measurePrevious: measurePrevious,
                    image: response.data,
                  },
                ],
              },
            },
          });
        })
        .catch((err) => {
          console.log("aeraer", err);
        });
    } else {
      updateEventById({
        variables: {
          id: activeEvent?._id,
          record: {
            examples: [
              ...(activeEvent?.examples || []),
              {
                date: date,
                measureActual: measureActual,
                measureForecast: measureForecast,
                measurePrevious: measurePrevious,
                image: null,
              },
            ],
          },
        },
      });
    }

    setDate(null);
    setMeasureActual(null);
    setMeasureForecast(null);
    setMeasurePrevious(null);
    setFile(null);

    closeModal();
    /* onUpdate(); */
  };

  const handlePopFileDialog = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  if (active) {
    return (
      <ModalWrapper exampleModal>
        <ModalHeader>
          <h1>Add Example</h1>
        </ModalHeader>

        <ModalForm onSubmit={onSubmit}>
          <ModalFormRow>
            <ModalInputWrapper>
              <ModalInputLabel htmlFor={"date_input"}>Date</ModalInputLabel>
              <ModalInput
                type="date"
                id="date_input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </ModalInputWrapper>
            <ModalInputWrapper>
              <ModalInputLabel htmlFor={"measureActual_input"}>
                Actual
              </ModalInputLabel>
              <ModalInput
                id="measureActual_input"
                value={measureActual}
                placeholder="Enter actual measurement"
                onChange={(e) => setMeasureActual(e.target.value)}
              />
            </ModalInputWrapper>
          </ModalFormRow>
          <ModalFormRow>
            <ModalInputWrapper>
              <ModalInputLabel htmlFor={"measureForecast_input"}>
                Forecast
              </ModalInputLabel>
              <ModalInput
                id="measureForecast_input"
                value={measureForecast}
                placeholder="Enter forecast measurement"
                onChange={(e) => setMeasureForecast(e.target.value)}
              />
            </ModalInputWrapper>
            <ModalInputWrapper>
              <ModalInputLabel htmlFor={"measurePrevious_input"}>
                Previous
              </ModalInputLabel>
              <ModalInput
                id="measurePrevious_input"
                value={measurePrevious}
                placeholder="Enter previous measurement"
                onChange={(e) => setMeasurePrevious(e.target.value)}
              />
            </ModalInputWrapper>
          </ModalFormRow>

          <ModalFormRow>
            <ModalInputWrapper halfWidth>
              <ModalInputLabel htmlFor={"file_input"}>
                Upload Image
              </ModalInputLabel>
              <input
                id="file_input"
                type="file"
                accept=".png, .jpg, .jpeg"
                name="image"
                className="hiddenFileInput"
                ref={inputFileRef}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <AddEventCta onClick={(e) => handlePopFileDialog(e)}>
                <img
                  src="icons/addImg.svg"
                  height={16}
                  width={16}
                  alt="Add event"
                />
                Upload Image
              </AddEventCta>
            </ModalInputWrapper>

            <img
              src="/icons/placeholder.svg"
              height={120}
              width={200}
              className="placeholder"
              alt="image placeholder"
              onClick={(e) => handlePopFileDialog(e)}
            />
          </ModalFormRow>
          <CtaWrap>
            <CancelCta onClick={closeModal}>Cancel</CancelCta>
            <AddEventCta type="submit">
              <img
                src="icons/add.svg"
                height={16}
                width={16}
                alt="Add event"
                className="color-invert"
              />
              Add Example
            </AddEventCta>
          </CtaWrap>
        </ModalForm>
      </ModalWrapper>
    );
  }
};

export default Modal;
