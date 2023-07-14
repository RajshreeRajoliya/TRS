import React, { useEffect, useRef, useState } from "react";
import "../Style/AllTickets.css";
import axios from "axios";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Input,
  color,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetBus, GetTicket } from "../Redux/tickets/tickets.actions";
import Loading from "./Loading";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AOS from "aos";
import "aos/dist/aos.css";
const AllTickets = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showCalender, setShowCalener] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleData, setsingleData] = useState();
  const [businessClass, setBusinessClass] = useState([]);
  const [economyClass, setEconomyClass] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const dispatch = useDispatch();
  const aeroplanes = useSelector((state) => state.ticketReducer.data);
  const singlaeroplane = useSelector((state) => state.ticketReducer.BUSID);
  const load = useSelector((state) => state.ticketReducer.loading);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    dispatch(GetTicket(searchobj));
  }, []);

  useEffect(() => {
    setIsLoading(load);
    setData(aeroplanes);
    const business = aeroplanes.filter((item) => item.class === true);
    const economy = aeroplanes.filter((item) => item.class === false);
    setBusinessClass(business);
    setEconomyClass(economy);
  }, [aeroplanes, load]);

  useEffect(() => {
    setsingleData(singlaeroplane);
     
  }, [singlaeroplane]);

  const showModal = (id) => {
    dispatch(GetBus(id));
    onOpen();
  };
  const searchobj = {
    start,
    end,
    selectedDate,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(GetTicket(searchobj));
    setEnd("");
    setStart("");
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
    setSelectedDate(
      `0${value.getDate()}/0${value.getMonth() + 1}/${value.getFullYear()}`
    );
    
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <div className="AllTicketsMainDiv">
        <div>
          <form style={{backgroundColor : "rgb(242,242,242)"}} onSubmit={handleSubmit}>
            {}
            {/* {  showCalender && <Calendar onChange={onChange} value={value} minDate={new Date()} />} */}
            <Button
              colorScheme="red"
              width={"230px"}
              margin={"auto"}
              onClick={() => setShowCalener(!showCalender)}
            >
              Select Date
            </Button>
            <Input
              type="text"
              placeholder="From"
              value={start}
              onChange={handleStartChange}
            />
            <Input
              type="text"
              placeholder="To"
              value={end}
              onChange={handleEndChange}
            />

            <Button
              colorScheme="red"
              variant="outline"
              width={"180px"}
              type="submit"
              margin={"auto"}
            >
              Search
            </Button>
          </form>
          <div
            style={{ margin: "auto", width: "30%" }}
            onClick={() => setShowCalener(!showCalender)}
          >
            {showCalender && (
              <Calendar
                onChange={onChange}
                value={value}
                minDate={new Date()}
              />
            )}
          </div>
        </div>

        <div className="FilterDiv">
          <button
            onClick={() => setData(businessClass)}
            m={"10px"}
            variant="outline"
            style={{background:"red" , color : "white" , border : "none"}}
          >
            Business 
          </button>
          <button
            onClick={() => setData(economyClass)}
            m={"10px"}
            colorScheme="red"
            variant="outline"
            style={{background:"red" , color : "white" , border : "none"}}
          >
            Economy 
          </button>
          <button
            onClick={() => setData(aeroplanes)}
            m={"10px"}
            colorScheme="red"
            variant="outline"
            style={{background:"red" , color : "white" , border : "none"}}
          >
            ALL
          </button>
        </div>

        <div className="BusDiv" >
          {data.map((item) => (
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1200"
              className="MainDetailsDiv"
              style={{background:"#3F2E3E" , color : "white"}}
              key={item.id}
            >
              <h1>
                {item.start} To {item.destination}
              </h1>
              <img
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
                data-aos-duration="1200"
                src={item.image}
                alt=""
              />
              <p>Time: {item.duration}</p>
              <div id="BusNumberDiv">
                <p>Sr no: {item.number}</p>
                <button> {item.class ? "Business" : "Economy"} </button>
              </div>
              <div className="PriceDiv">
                <p>price: ₹{item.price}</p>
              </div>

              <p>Date: {item.date}</p>

              <div className="BudBookingDiv">
                <Link to={`/aeroplane/${item.id}`}>
                  <Button colorScheme="red">Buy Now</Button>
                </Link>

                <Button
                  onClick={() => showModal(item.id)}
                  colorScheme="whatsapp"
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        {data.length == 0 ? (
          <div>
            <img
              style={{ width: "200px", height: "200px", margin: "auto" }}
              src="https://previews.123rf.com/images/alessandro0770/alessandro07701702/alessandro0770170200062/72389847-no-tickets-available-sign.jpg"
              alt=""
            />
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              No bus Avaible for This Route{" "}
            </p>
          </div>
        ) : null}

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
              <h1>
                {" "}
                {singleData && singleData.start} To{" "}
                {singleData && singleData.destination}
              </h1>
              <img
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                data-aos-duration="1200"
                src={singleData && singleData.image}
                alt=""
              />
              <p>Time: {singleData && singleData.duration}</p>
              <div id="BusNumberDiv">
                <p>Sr no: {singleData && singleData.number}</p>
                <button>
                  {" "}
                  {singleData && singleData.class ? "Business" : "Economy"}{" "}
                </button>
              </div>

              <p>Date: {singleData && singleData.date}</p>
              <p>Total Seats: {singleData && singleData.seats?.length}</p>
              <p>Ticket Price: {singleData && singleData.price}</p>
            </div>
            <ModalCloseButton />

            <ModalFooter>
              <Button m={"10px"} colorScheme="red">
                ₹{singleData && singleData.price}
              </Button>

              <Link to={`/aeroplane/${singleData && singleData.id}`}>
                <Button m={"10px"} colorScheme="teal" variant="outline">
                  Book Seats
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
  }
};

export default AllTickets;
