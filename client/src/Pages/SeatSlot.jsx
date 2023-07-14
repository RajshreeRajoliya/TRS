import React, { useEffect, useRef, useState } from "react";
import "../Style/SeatSlot.css";
import { Link, Navigate, useParams } from "react-router-dom";
import { PiCaretCircleUpDownBold, PiWindowsLogo } from "react-icons/pi";
import axios from "axios";
import { TbArmchair, TbArmchairOff } from "react-icons/tb";
import { Badge, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { GetBus } from "../Redux/tickets/tickets.actions";
import { AddCart } from "../Redux/cart/cart.actions";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Navigate } from "react-router-dom";

import {
  Box,
  CloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

const SeatSlot = () => {
  const parm = useParams();

  const [singledata, setSingleData] = useState([]);
  const singlebus = useSelector((state) => state.ticketReducer.BUSID);
  const dispatch = useDispatch();
  const [Number, setNumber] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const CartData = useSelector((state) => state.cartReducer.data);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setSingleData(singlebus);
  }, [singlebus]);

  useEffect(() => {
    dispatch(GetBus(parm.id));
  }, [dispatch, parm.id]);

  const handelSeat = (num) => {
    if (Number.includes(num)) {
      // If the seat number is already in the selected seats, remove it
      setNumber(Number.filter((seat) => seat !== num));
    } else {
      // If the seat number is not in the selected seats, add it
      setNumber([...Number, num]);
    }

    localStorage.setItem("seatnumber", JSON.stringify(Number)); // Convert Number to a string
  };

  const handelUpdateSeat = (item) => {
    if (!item.isBooked) {
      handelSeat(item.num);
    }
  };

  useEffect(() => {
    const storedSeatNumber = localStorage.getItem("seatnumber");
    if (storedSeatNumber) {
      setNumber(JSON.parse(storedSeatNumber)); // Parse storedSeatNumber back to an array
    }
  }, []);
  function openCustomAlert() {
    document.getElementById("custom-alert").style.display = "flex";
  }
  
  function closeCustomAlert() {
    document.getElementById("custom-alert").style.display = "none";
  }
 
  const handleConfirmReservation = () => {
    // const updatedCartData = CartData || [];
    // dispatch(AddCart(singledata, Number, updatedCartData));
    onClose();
    window.alert("Ticket Comfirmed Successfully!")

     // Close the modal
  };

  return (
    <div className="SeatSlotMainDiv">
      <h3>CHOOSE SEATS ACCORDING TO YOUR COMFORT</h3>
      <div className="SeatsDiv">
        {singledata.seats?.map((item, id) => (
          <div
            key={id}
            className={Number.includes(item.num) ? "selected" : "nonSelected"}
            onClick={() => handelUpdateSeat(item)}
          >
            <Badge variant="outline" colorScheme="green">
              {item.num}
            </Badge>
            <button
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1200"
              disabled={item.isBooked ? true : false}
              onClick={() => handelSeat(item.num)}
              className={item.isBooked ? "bookedseats" : "emptyseats"}
            >
              {item.isBooked ? <TbArmchairOff /> : <TbArmchair />}
            </button>
          </div>
        ))}
      </div>
      <Button
        disabled={Number.length === 0 ? true : false}
        mt={"20px"}
        colorScheme="red"
        variant="outline"
        width={"70%"}
        onClick={onOpen}
      >
        Book
      </Button>{" "}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>TICKET DETAILS</ModalHeader>

          <div className="MainDetailsDivModal">
            <h1>Proceed Further For Confirmation</h1>
            <img
              src="https://img.freepik.com/premium-vector/airline-tickets-paper-creative-travel-illustration_194782-105.jpg"
              alt=""
            />
          </div>
          <ModalCloseButton />

          <ModalFooter>
            
              <Link to="/alltickets">
              <Button
                m={"10px"}
                onClick={handleConfirmReservation}
                colorScheme="teal"
                variant="outline"
              >
                Confirm Reservation
              </Button>
              </Link>
           

            <Button colorScheme="teal" variant="solid" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SeatSlot;
