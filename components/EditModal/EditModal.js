import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { QUERY_EVENTS, EDIT_EVENT } from "../../helpers/query";
import { activeEventState } from "../../state/slices/globalSlice";
import {
  AddEventCta,
  CancelCta,
  CtaWrap,
  ModalForm,
  ModalHeader,
  ModalInput,
  ModalInputLabel,
  ModalWrapper,
} from "../AddModal/AddModalStyle";

const Modal = ({ active, activeEvent, closeModal }) => {
  const [idValue, setIdValue] = useState();
  const [pairValue, setPairValue] = useState();
  const [titleValue, setTitleValue] = useState();

  /* const activeEvent = useSelector(activeEventState); */

  useEffect(() => {
    setIdValue(activeEvent?._id);
    setPairValue(activeEvent?.pair);
    setTitleValue(activeEvent?.title);
  }, [activeEvent]);

  const [editEvent, { data }] = useMutation(EDIT_EVENT, {
    refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
  });

  if (active) {
    return (
      <ModalWrapper>
        <ModalHeader>
          <h1>Edit event</h1>
        </ModalHeader>

        <ModalForm
          onSubmit={(e) => {
            e.preventDefault();
            editEvent({
              variables: {
                id: idValue,
                record: { pair: pairValue, title: titleValue },
              },
            });
            closeModal();
          }}
        >
          <ModalInputLabel htmlFor={"pair_input"}>Pair Input</ModalInputLabel>
          <ModalInput
            id="pair_input"
            value={pairValue}
            onChange={(e) => setPairValue(e.target.value)}
          />
          <ModalInputLabel htmlFor={"title_input"}>Title Input</ModalInputLabel>
          <ModalInput
            id="title_input"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />

          <CtaWrap>
            <CancelCta onClick={closeModal}>Cancel</CancelCta>
            <AddEventCta type="submit">
              <img
                src="icons/add.svg"
                height={16}
                width={16}
                className="color-invert"
                alt="Add event"
              />
              Edit event
            </AddEventCta>
          </CtaWrap>
        </ModalForm>
      </ModalWrapper>
    );
  }
};

export default Modal;
