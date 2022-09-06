import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  DropdownWrapper,
  DropdownButton,
  ImageWrapper,
  DropdownText,
  DropdownList,
  DropdownItem,
} from "./UserAvatarStyle";
import { useDispatch } from "react-redux";
import { resetUsername } from "../../state/slices/globalSlice";
import useOutsideClick from "../../helpers/clickOutside";

const Dropdown = ({ user, text }) => {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setShow(!show);
    dispatch(resetUsername());
  };

  useOutsideClick(ref, () => {
    if (show) setShow(false);
  });

  return (
    <DropdownWrapper ref={ref}>
      <ImageWrapper onClick={() => setShow(!show)}>{user}</ImageWrapper>
      <DropdownButton onClick={() => setShow(!show)}>
        <DropdownText>{text}</DropdownText>
        <Image
          src={"/icons/chev-down.svg"}
          width={16}
          height={16}
          alt="Dropdown"
          className={show ? "rotate" : ""}
        />
      </DropdownButton>
      <DropdownList show={show}>
        <DropdownItem onClick={() => handleLogout()}>Logout</DropdownItem>
      </DropdownList>
    </DropdownWrapper>
  );
};

export default Dropdown;
