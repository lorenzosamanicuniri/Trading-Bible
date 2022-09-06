import { gql, useMutation } from "@apollo/client";
import { QUERY_EVENTS } from "../../helpers/query";
import {
  AddEventCta,
  CancelCta,
  CtaWrap,
  ModalForm,
  ModalHeader,
  ModalInput,
  ModalInputLabel,
  ModalWrapper,
} from "./AddModalStyle";

export const EVENT_CREATE = gql`
  mutation EventCreate($pair: String, $title: String) {
    eventCreate(record: { pair: $pair, title: $title }) {
      recordId
    }
  }
`;

const Modal = ({ active, closeModal }) => {
  let pair_input;
  let title_input;

  const [addEvent, { data }] = useMutation(EVENT_CREATE, {
    refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
  });

  if (active) {
    return (
      <ModalWrapper>
        <ModalHeader>
          <h1>Add Event</h1>
        </ModalHeader>

        <ModalForm
          onSubmit={(e) => {
            e.preventDefault();
            addEvent({
              variables: { pair: pair_input.value, title: title_input.value },
            });
            pair_input.value = "";
            title_input.value = "";
            closeModal();
          }}
        >
          <ModalInputLabel htmlFor={"pair_input"}>Pair Input</ModalInputLabel>
          <ModalInput
            id="pair_input"
            ref={(node) => {
              pair_input = node;
            }}
          />
          <ModalInputLabel htmlFor={"title_input"}>Title Input</ModalInputLabel>
          <ModalInput
            id="title_input"
            ref={(node) => {
              title_input = node;
            }}
          />
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
              Add events
            </AddEventCta>
          </CtaWrap>
        </ModalForm>
      </ModalWrapper>
    );
  }
};

export default Modal;
