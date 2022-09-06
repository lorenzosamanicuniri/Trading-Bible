import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { QUERY_EVENTS, EDIT_EVENT } from "../../helpers/query";
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

const Modal = ({ active, closeModal, activeEvent, example }) => {
  const [date, setDate] = useState();
  const [measureActual, setMeasureActual] = useState();
  const [measureForecast, setMeasureForecast] = useState();
  const [measurePrevious, setMeasurePrevious] = useState();
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    setDate(formatDate(example?.date));
    setMeasureActual(example?.measureActual);
    setMeasureForecast(example?.measureForecast);
    setMeasurePrevious(example?.measurePrevious);
    /* setFile(example?.image); */
  }, [example]);

  const [updateEventById, { data, loading, error, refetch }] = useMutation(
    EDIT_EVENT,
    {
      refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
      onCompleted: (newData) => {
        /* console.log("QUERY_EVENTS.onCompleted", newData); */
        /*         dispatch(
          setActiveEventGlobal(
            newData.events.filter((d) => d._id == event._id)[0]
          )
        ); */
      },
    }
  );

  const handleUpload = (e) => {
    e.preventDefault();
    inputFileRef.current.click();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let tempArray = [...activeEvent.examples];

    const result = tempArray.find((item) => item._id === example._id);
    const resultIndex = tempArray.findIndex((item) => item._id === example._id);

    if (resultIndex !== -1) {
      tempArray.splice(resultIndex, 1);
    }

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
                pair: activeEvent.pair,
                title: activeEvent.title,
                examples: [
                  ...tempArray,
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
          console.log(err);
        });
    } else {
      updateEventById({
        variables: {
          id: activeEvent?._id,
          record: {
            pair: activeEvent.pair,
            title: activeEvent.title,
            examples: [
              ...tempArray,
              {
                date: date,
                measureActual: measureActual,
                measureForecast: measureForecast,
                measurePrevious: measurePrevious,
                image: example?.image,
              },
            ],
          },
        },
      });
    }
    closeModal();
  };

  if (active) {
    return (
      <ModalWrapper exampleModal>
        <ModalHeader>
          <h1>Edit Example</h1>
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
                measureActual
              </ModalInputLabel>
              <ModalInput
                id="measureActual_input"
                value={measureActual}
                onChange={(e) => setMeasureActual(e.target.value)}
              />
            </ModalInputWrapper>
          </ModalFormRow>
          <ModalFormRow>
            <ModalInputWrapper>
              <ModalInputLabel htmlFor={"measureForecast_input"}>
                measureForecast
              </ModalInputLabel>
              <ModalInput
                id="measureForecast_input"
                value={measureForecast}
                onChange={(e) => setMeasureForecast(e.target.value)}
              />
            </ModalInputWrapper>
            <ModalInputWrapper>
              <ModalInputLabel htmlFor={"measurePrevious_input"}>
                measurePrevious
              </ModalInputLabel>
              <ModalInput
                id="measurePrevious_input"
                value={measurePrevious}
                onChange={(e) => setMeasurePrevious(e.target.value)}
              />
            </ModalInputWrapper>
          </ModalFormRow>

          <ModalFormRow>
            <ModalInputWrapper halfWidth>
              <ModalInputLabel htmlFor={"file_input"}>
                Upload Image
              </ModalInputLabel>
              <AddEventCta onClick={(e) => handleUpload(e)}>
                <img
                  src="icons/addImg.svg"
                  height={16}
                  width={16}
                  alt="Add event"
                />
                Upload Image
              </AddEventCta>
            </ModalInputWrapper>
            {example?.image && file == null && (
              <img
                src={"https://api.tbible.club/uploads/" + example.image}
                alt="Image"
                className="placeholder"
                width={200}
                height={120}
                onClick={() => inputFileRef.current.click()}
              />
            )}
            <input
              id="file_input"
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image"
              className="hiddenFileInput"
              ref={inputFileRef}
              onChange={(e) => setFile(e.target.files[0])}
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
              Edit Example
            </AddEventCta>
          </CtaWrap>
        </ModalForm>
      </ModalWrapper>
    );
  }
};

export default Modal;
