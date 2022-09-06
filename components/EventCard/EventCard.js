import { useMutation } from "@apollo/client";
import { REMOVE_EVENT } from "../../helpers/query";

const EventCard = ({
  activeEvent,
  eventItem,
  setActiveEvent,
  handleEdit,
  handleRemoveEvent,
}) => {
  const [removeEvent] = useMutation(REMOVE_EVENT);

  return (
    <div
      onClick={() => {
        setActiveEvent(eventItem);
      }}
    >
      {activeEvent && (
        <div>
          <button onClick={() => handleEdit(eventItem)}>
            <img src="/edit.svg" width={24} height={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveEvent(eventItem);
            }}
          >
            <img src="/delete.svg" width={24} height={24} />
          </button>
        </div>
      )}
      <div>
        {eventItem.title} ({eventItem.examples.length})
      </div>
    </div>
  );
};

export default EventCard;
