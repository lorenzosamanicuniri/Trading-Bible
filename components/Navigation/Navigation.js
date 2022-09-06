/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactTooltip from "react-tooltip";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../helpers/query";
import {
  NavigationWrapper,
  LinkWrapper,
  NavigationLink,
  NavigationLinkWrapper,
  NavigationHeader,
  NavigationHeaderWrapper,
  NavTitle,
  ClosePanel,
  NavigationCta,
  SubLinkWrapper,
  NavigationSubLink,
} from "./NavigationStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  expandedState,
  controlExpand,
  expandNav,
} from "../../state/slices/globalSlice";
import TopBar from "../TopBar/TopBar";

const EUR = (
  <img
    src="/icons/euro.svg"
    height={24}
    width={24}
    className="currencyIcon"
    alt="Euro"
  />
);
const USD = (
  <img
    src="/icons/dollar.svg"
    height={24}
    width={24}
    className="currencyIcon"
    alt="Dollar"
  />
);
const GBP = (
  <img
    src="/icons/gbp.svg"
    height={24}
    width={24}
    className="currencyIcon"
    alt="Pound"
  />
);
const MONEY = (
  <img
    src="/icons/money.svg"
    height={24}
    width={24}
    className="currencyIcon"
    alt="Money"
  />
);

const Navigation = ({
  activeEvent,
  setActiveEvent,
  handleAddEvent,
  handleEdit,
  events,
  setEvents,
}) => {
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(width <= 768);
  const [activePair, setActivePair] = useState();
  const [filteredEvents, setFilteredEvents] = useState();
  const [isMounted, setIsMounted] = useState(false);

  const globalExpanded = useSelector(expandedState);

  const dispatch = useDispatch();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    setIsMounted(true);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  const handlePairClick = (pair) => {
    if (isMobile) {
      dispatch(expandNav());
    }
    setActivePair(pair);
    dispatch(expandNav());
  };

  const {
    data,
    loading,
    error,
    refetch,
    networkStatus,
    startPolling,
    stopPolling,
  } = useQuery(QUERY_EVENTS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (newData) => {
      //console.log("QUERY_EVENTS.onCompleted", newData)
      if (activeEvent) {
        setActiveEvent(
          newData.events.filter((d) => d._id == activeEvent._id)[0]
        );
      }
    },
    //onError: () => console.log("err"),
  });

  useEffect(() => {
    data?.events && setEvents(data.events);
    return () => {
      data?.events && setEvents(data.events);
    };
  }, [data]);

  useEffect(() => {
    const all = events?.map((obj, index) => obj?.pair);
    const filtered = all?.filter((pair, index) => all.indexOf(pair) === index);
    setFilteredEvents(filtered);
  }, [events]);

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

  return (
    <>
      <NavigationWrapper expanded={globalExpanded}>
        <NavigationHeaderWrapper expanded={globalExpanded}>
          <NavigationHeader expanded={globalExpanded}>
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="Trading Bible"
            />
            <NavTitle expanded={globalExpanded}>Trading Bible</NavTitle>
          </NavigationHeader>
          <ClosePanel data-tip data-for="close-panel" expanded={globalExpanded}>
            <Image
              src={
                globalExpanded
                  ? "/icons/panelClose.svg"
                  : "/icons/panelOpen.svg"
              }
              width={24}
              height={24}
              alt="Panel Close"
              className="close-panel"
              onClick={() => dispatch(controlExpand())}
            />
          </ClosePanel>
          {isMounted && (
            <ReactTooltip
              className="tooltip"
              id="close-panel"
              place="right"
              effect="solid"
              backgroundColor="#464B50"
              arrowColor="transparent"
              disable={globalExpanded}
            >
              Expand
            </ReactTooltip>
          )}
        </NavigationHeaderWrapper>
        <NavigationLinkWrapper expanded={globalExpanded}>
          <NavigationCta expanded={globalExpanded} onClick={handleAddEvent}>
            <img
              src="/icons/add.svg"
              height={16}
              width={16}
              alt="Add Event"
              className="addIcon"
            />
            <span>Add Event</span>
          </NavigationCta>
          {filteredEvents?.map((page, i) => (
            <React.Fragment key={i}>
              <LinkWrapper
                onClick={() => handlePairClick(page)}
                expanded={globalExpanded}
                active={page === activePair}
                data-tip
                data-for={page}
                key={i}
              >
                <NavigationLink
                  expanded={globalExpanded}
                  active={page === activePair}
                >
                  {renderCurrencyIcon(page)}
                  {globalExpanded && <p>{page}</p>}
                  {isMounted && (
                    <ReactTooltip
                      className="tooltip"
                      id={page}
                      place="right"
                      effect="solid"
                      backgroundColor="#464B50"
                      arrowColor="transparent"
                      disable={globalExpanded}
                    >
                      {page}
                    </ReactTooltip>
                  )}
                  <img
                    src="/icons/chev-down.svg"
                    height={16}
                    width={16}
                    alt="Item selected"
                    className="chevron"
                  />
                </NavigationLink>
              </LinkWrapper>
              {globalExpanded && activePair === page && (
                <>
                  {events
                    .filter((events) => events.pair === activePair)
                    .map((eventItem, i) => {
                      return (
                        <SubLinkWrapper
                          active={activeEvent === eventItem}
                          key={i}
                        >
                          <NavigationSubLink
                            onClick={() => {
                              setActiveEvent(eventItem);
                            }}
                          >
                            {eventItem.title}
                          </NavigationSubLink>
                        </SubLinkWrapper>
                      );
                    })}
                </>
              )}
            </React.Fragment>
          ))}
        </NavigationLinkWrapper>
      </NavigationWrapper>
      <TopBar activeEvent={activeEvent} handleEditEvent={handleEdit} />
    </>
  );
};

export default Navigation;
