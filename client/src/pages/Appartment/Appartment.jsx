import "./appartment.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext,useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Appartment = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/appartment/find/${id}`)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick = ()=>{
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }

  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading?("loading"):(<div className="appartmentContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photo[slideNumber]} 
              alt="" 
              className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="appartmentWrapper">
          <button className="bookNow">EMI or Pay Now!</button>
          <h1 className="appartmentTitle">{data.name}</h1>
          <div className="appartmentAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="appartmentDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="appartmentPriceHighlight">
            staying over ${data.price} at this property and get a stress free ambiance
          </span>
          <div className="appartmentImages">
            {data.photo?.map((photo, i) => (
              <div className="appartmentImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="appartmentImg"
                />
              </div>
            ))}
          </div>
          <div className="appartmentDetails">
            <div className="appartmentDetailsTexts">
              <h1 className="appartmentTitle">{data.title}</h1>
              <p className="appartmentDesc">{data.desc}</p>
            </div>
            <div className="appartmentDetailsPrice">
              <h1>Perfect for your work environment</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location 
              </span>
              <h2>
                <b>{days*data.price* options.room}</b> (Good neighbourhood)
              </h2>
              <button onClick={handleClick}>Register Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)}
      {openModal && <Reserve setOpen={setOpenModal} appartmentId={id}/>}
    </div>
  );
};

export default Appartment;