import { useMutation } from "@apollo/client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { QUERY_EVENTS, REMOVE_EVENT } from "../../helpers/query";
import {
  expandedState,
  activeEventState,
  resetActiveEventGlobal,
  activeUser,
} from "../../state/slices/globalSlice";
import Dropdown from "../Dropdown/UserAvatar";
import { TopBarWrapper, SelectedPair, CtaButton } from "./TopBarStyle";

const EUR = <img src="/icons/euro.svg" className="currencyIcon" alt="Euro" />;
const USD = (
  <img src="/icons/dollar.svg" className="currencyIcon" alt="Dollar" />
);
const GBP = <img src="/icons/gbp.svg" className="currencyIcon" alt="Pound" />;
const MONEY = (
  <img src="/icons/money.svg" className="currencyIcon" alt="Money" />
);

export default function TopBar({ activeEvent, handleEditEvent }) {
  const expanded = useSelector(expandedState);
  const dispatch = useDispatch();
  const loadedUser = useSelector(activeUser);

  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
  });

  const renderCurrencyIcon = (string) => {
    const stringExtract = string.slice(-3);

    if (stringExtract === "USD") {
      return USD;
    } else if (stringExtract === "GBP") {
      return GBP;
    } else if (stringExtract === "EUR") {
      return EUR;
    } else return MONEY;
  };

  const handleRemoveEvent = (selectedEvent) => {
    removeEvent({
      variables: { id: selectedEvent._id },
    });
    dispatch(resetActiveEventGlobal());
  };

  return (
    <TopBarWrapper expand={expanded}>
      {activeEvent && (
        <>
          {renderCurrencyIcon(activeEvent?.pair)}
          <SelectedPair>{activeEvent?.pair}</SelectedPair>
          <CtaButton onClick={handleEditEvent}>
            <img src="icons/edit.svg" width={16} height={16} />
            Edit Event
          </CtaButton>
          <CtaButton onClick={() => handleRemoveEvent(activeEvent)} btnDelete>
            <img src="icons/delete.svg" width={16} height={16} />
            Remove Event
          </CtaButton>
        </>
      )}

      <Dropdown user={loadedUser} />
    </TopBarWrapper>
  );
}
