import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { QUERY_EVENTS, EDIT_EVENT, REMOVE_EVENT } from "../helpers/query";
import { activeUser, expandedState } from "../state/slices/globalSlice";

import AddModal from "../components/AddModal/AddModal";
import EditModal from "../components/EditModal/EditModal";
import AddExampleModal from "../components/AddExampleModal/AddExampleModal";
import EditExampleModal from "../components/EditExampleModal/EditExampleModal";
import ExampleCard from "../components/ExampleCard/ExampleCard";
import EventImagesLightbox from "../components/EventImagesLightbox/EventImagesLightbox";
import Navigation from "../components/Navigation/Navigation";
import Charts from "../components/Charts/Charts";

import "react-image-lightbox/style.css";
import {
  ActiveEventTitle,
  AddExampleCta,
  Main,
  TableHeader,
  TableView,
  TitleRow,
} from "../styles/Global";
import { useRouter } from "next/router";

export default function Home() {
  const [events, setEvents] = useState();
  const [addModalActive, setAddModalActive] = useState(false);
  const [editModalActive, setEditModalActive] = useState(false);
  const [exampleModalActive, setExampleModalActive] = useState(false);
  const [editExampleModalActive, setEditExampleModalActive] = useState(false);
  const [activePair, setActivePair] = useState();
  const [activeEvent, setActiveEvent] = useState();
  const [activeExample, setActiveExample] = useState();
  const [isLightboxOpen, setisLightboxOpen] = useState(false);
  const router = useRouter();

  const user = useSelector(activeUser);
  const globalExpanded = useSelector(expandedState);

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

  const [updateEvent] = useMutation(EDIT_EVENT, {
    refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
  });

  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: [{ query: QUERY_EVENTS }, "Event"],
  });

  useEffect(() => {
    data?.events && setEvents(data.events);
    return () => {
      data?.events && setEvents(data.events);
    };
  }, [data]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    scrollTop();
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  const addExample = () => {
    setExampleModalActive(true);
  };

  const handleEditModal = (payload) => {
    setEditModalActive(true);
  };

  const handleEditExample = (payload) => {
    setActiveExample(payload);
    setEditExampleModalActive(true);
    refetch();
  };

  const handleRemoveExample = (payload) => {
    /* console.log(payload); */
    let tempArray = [...activeEvent.examples];
    /* console.log("tempArray1", tempArray); */
    let index = tempArray.indexOf(payload);
    if (index !== -1) {
      tempArray.splice(index, 1);
    }
    /* console.log("tempArray2", tempArray); */
    updateEvent({
      variables: {
        id: activeEvent._id,
        record: {
          pair: activeEvent.pair,
          title: activeEvent.title,
          examples: tempArray,
        },
      },
    });
  };

  return (
    <>
      <Navigation
        handleAddEvent={() => setAddModalActive(true)}
        handleEdit={handleEditModal}
        activeEvent={activeEvent}
        setActiveEvent={setActiveEvent}
        events={events}
        setEvents={setEvents}
      />
      <div>
        <Main expanded={globalExpanded}>
          {activeEvent ? (
            <>
              <TitleRow>
                <ActiveEventTitle>{activeEvent?.title}</ActiveEventTitle>
                <AddExampleCta
                  expanded={globalExpanded}
                  onClick={() => addExample()}
                >
                  <img
                    src="/icons/add.svg"
                    height={16}
                    width={16}
                    alt="Add Example"
                    className="addIcon"
                  />
                  <span>Add Example</span>
                </AddExampleCta>
              </TitleRow>

              <TableView>
                <TableHeader>
                  <span className="col-img">Image</span>
                  <span>Date of example</span>
                  <span>Previous</span>
                  <span>Actual</span>
                  <span>Forecast</span>
                  <span className="col-cta"></span>
                </TableHeader>
                {activeEvent.examples
                  /* ?.sort((a, b) => new Date(a.date) - new Date(b.date)) */
                  .map((example, i) => {
                    return (
                      <ExampleCard
                        key={i}
                        example={example}
                        activeExample={activeExample}
                        setActiveExample={setActiveExample}
                        handleEditExample={handleEditExample}
                        handleRemoveExample={handleRemoveExample}
                        setisLightboxOpen={setisLightboxOpen}
                      />
                    );
                  })}
                <EventImagesLightbox
                  activeEvent={activeEvent}
                  isLightboxOpen={isLightboxOpen}
                  setisLightboxOpen={setisLightboxOpen}
                />
              </TableView>
            </>
          ) : (
            <>
              <TitleRow>
                <ActiveEventTitle>Trading Bible Home</ActiveEventTitle>
              </TitleRow>
              <Charts data={events} />
            </>
          )}
        </Main>
      </div>

      <AddModal
        active={addModalActive}
        closeModal={() => {
          setAddModalActive(false);
          refetch();
        }}
      />

      <EditModal
        active={editModalActive}
        activeEvent={activeEvent}
        closeModal={() => {
          setEditModalActive(false);
          refetch();
        }}
      />

      <AddExampleModal
        exampleModal
        active={exampleModalActive}
        activeEvent={activeEvent}
        event={activeEvent}
        closeModal={() => {
          setExampleModalActive(false);
          refetch();
        }}
        onUpdate={() => {
          //refetch();
          //let _temp = activeEvent;
          //setActiveEvent(null);
          //setActiveExample(null);
          //setActiveEvent(_temp);
        }}
      />

      {editExampleModalActive && (
        <EditExampleModal
          exampleModal
          active={editExampleModalActive}
          activeEvent={activeEvent}
          example={activeExample}
          closeModal={() => {
            setEditExampleModalActive(false);
            refetch();
          }}
        />
      )}
    </>
  );
}
