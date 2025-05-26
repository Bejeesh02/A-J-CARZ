import React from "react";
import './hotel.css';
import { useNavigate } from 'react-router-dom';
import Image1 from './self/9bcc13b6c9107e02292e498252136445.jpg';
import Image2 from './self/maruti-swift-removebg-preview.png';
import Image3 from './self/maruti-suzuki-dzire-zxi1733720954280.webp';
import Image4 from './self/c6es93a_1572125-Photoroom.png';
import Slider from "react-slick";
import { FaUsers, FaCogs } from 'react-icons/fa';  
import img1 from './self/Adobe_Express_20250226_2235170_1.png';
import { GiGearStickPattern } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import { BsFuelPump } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";


const Hotel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const navigate = useNavigate();

  const images1 = [
    { id: 1, src: Image1, alt: 'Image 1', title: 'BELENO', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern /> Manual</>, price: '₹2,000/per day' },
    { id: 2, src: Image2, alt: 'Image 2', title: 'SWIFT', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern /> Manual</>, price: '₹1,500/per day' },
    { id: 3, src: Image3, alt: 'Image 3', title: 'DZIRE', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern />Manual</>, price: '₹1,500/per day' },
    { id: 4, src: Image4, alt: 'Image 4', title: 'ERTIGA', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern /> Manual</>, price: '₹2,000/per day' },
    { id: 1, src: Image1, alt: 'Image 1', title: 'BELENO', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern /> Manual</>, price: '₹2,000/per day' },
    { id: 2, src: Image2, alt: 'Image 2', title: 'SWIFT', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern /> Manual</>, price: '₹1,500/per day' },
    { id: 3, src: Image3, alt: 'Image 3', title: 'DZIRE', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern />Manual</>, price: '₹1,500/per day' },
    { id: 4, src: Image4, alt: 'Image 4', title: 'ERTIGA', caption: <><FaUsers /> 5 seats &nbsp; <GiGearStickPattern /> Manual</>, price: '₹2,000/per day' },
   
  ];


  const handleBooking = (title) => {
    navigate('/services');
  };

  return (
    <div>
      <div><img id="im" src={img1} alt="hotel banner" /></div>

      <div className="image-card-slider-container">
        <h1> CAR  RENTAL</h1>
        <Slider {...settings}>
          {images1.map((image) => (
            <div key={image.id} className="image-card">
              <div className="image-card-img-container">
                <img src={image.src} alt={image.alt} className="image-card-img" />
                <div className="image-card-overlay">
                  <div className="image-card-overlay-content">
                    <h3>{image.title}</h3>
                    <h5>{image.caption}</h5>
                    <h5>{image.price}</h5>
                  </div>
                </div>
              </div>
              <div className="image-card-content">
                <h3 className="image-card-title">{image.title}</h3>
                <h5 className="image-card-caption">{image.caption}</h5>
                <h5 className="image-card-price">{image.price}</h5>
                <button
                  className="book-now-button"
                  onClick={() => handleBooking(image.title)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </Slider>

        
      </div>
  


    </div>
  );
};

export default Hotel;
