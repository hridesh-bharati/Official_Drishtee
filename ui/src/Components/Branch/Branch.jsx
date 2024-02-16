import React, { useEffect, useRef } from 'react';
import CounterCard from "../Counter/CounterCard";
import Typed from 'typed.js';
import { Link } from 'react-router-dom';

function Branch() {
    const timersRef = useRef([]);

    useEffect(() => {
        const counter = (id, start, end, duration) => {
            let obj = document.getElementById(id),
                current = start,
                range = end - start,
                increment = end > start ? 1 : -1,
                step = Math.abs(Math.floor(duration / range)),
                timer = setInterval(() => {
                    current += increment;
                    obj.textContent = current;
                    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                        clearInterval(timer);
                    }
                }, step);
            timersRef.current.push(timer);
        };

        counter("count1", 0, 200, 7000);
        counter("count2", 0, 20, 6000);
        counter("count3", 0, 16, 6000);
        
        return () => {
            timersRef.current.forEach(timer => clearInterval(timer));
        };
    }, []);

    useEffect(() => {
        const typed = new Typed('#typingAmt', {
            strings: ['Growing', 'Faster.', 'Bigger'],
            typeSpeed: 50,
            loop: true,
        });
        
        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <div >
            <div className=" mx-sm-0 px-sm-0 px-0">

                <div className="myshadow " style={{ background: 'white', margin: '4.1rem 0' }} id="BranchHeadSection">
                    <div className="row   p-0  m-0" style={{ background: 'var(--dark-blue)' }}>
                        <div className="col-md-6 p-0">
                            <div id="carouselExampleAutoplaying" className="carousel slide carousel-fade p-0 m-0 aboutMainImg" data-bs-ride="carousel">
                                <div className="carousel-inner MainCarousel p-0 m-0">
                                    {[
                                        "images/vender/diitOffice.jpg",
                                        "images/vender/diitOffice2.jpg",
                                        "images/vender/diit2Lab.jpg",
                                        "images/vender/diitOffice2.jpg",
                                        "images/vender/diit2Lab.jpg"
                                    ].map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3000">
                                            <img src={image} className="d-block img-fluid w-100" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 " style={{ background: 'var(--cardHeadColorDark)' }}>
                            <div className="row ">
                                <div className="col-md-12 text-warning fw-bolder  py-4" data-aos="fade-up" data-aos-duration="1000">
                                    <h3 className="fw-bolder">WELCOME TO DRISHTEE COMPUTER CENTER </h3>
                                    <h6 className="p-2"> <span>Branch:-</span>
                                        Main Market road in front of Rauniyar chitra mandir, Thoothibari
                                        Maharajganj
                                    </h6>
                                </div>
                            </div>
                            <div className="row mt-2" data-aos="fade-down" data-aos-duration="2000">
                                <div className="col-12" style={{ color: 'white' }}>
                                    <h3 className="pt-2 px-md-4">We Provide High Quality Education For Everyone</h3>
                                    <p className="px-md-4">
                                        Drishtee Institute of Technology is started as one in the best of Technical
                                        computer institute in the year 2018.
                                        Drishtee Institute of Technology is established under the best computer center Education Trust in thoothibari .
                                        <br />
                                        "Drishtee Institute of Technology is known for quality and excellence in education as
                                        well as extra-curricular activities. It is committed to providing abundant learning
                                        opportunities to students,
                                        <br /> <br />
                                        <button className="button btn btn-primary yellow-btn fw-bolder" data-aos="fade-down">
                                            <Link to="/Contact" className="nav-link"> Contact <i className="bi bi-arrow-right-short"></i> </Link>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center fs-4 fw-bold">
                    <div className="row">
                        <div className="col-12 my-3" id="BranchTypingText">
                            <small>
                                Drishtee Institute of Technology is{' '}
                                <span className="text-warning" id="typingAmt"></span>
                            </small>
                        </div>
                    </div>
                </div>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-4  my-1">
                            {/* <div className="card myshadow" style={{ border: FeatureCardBorder, background: FeatureCard, color: FeatureCardText }}> */}
                            <div className="card myshadow">
                                <div className="card-header h4 text-white " style={{ background: 'var(--d-blue)' }}>
                                    <div data-aos="fade-right"><i className="fa fa-line-chart text-warning"></i> Feature</div>
                                </div>
                                <div className="card-body FeatureCard1">
                                    <marquee direction="up" scrollamount="3" behavior="scroll"> <small>[1]. Course certified by Microsoft. </small>
                                        <hr width="90%" /> <small>[2]. Training on live project </small>
                                        <hr width="90%" /> <small>[3]. Highly class Technology. </small>
                                        <hr width="90%" /> <small>[4]. Highly Equipped lab. </small>
                                        <hr width="90%" /> <small>[5]. Classes by will experienced & qualified trainers </small>
                                        <hr width="90%" /> <small>[6]. Affordable fees. </small>
                                        <hr width="90%" /> <small>[7]. Conducted by will experienced professional </small>
                                        <hr width="90%" /> <small>[8]. CCC free on ADCA course</small> <img
                                            src="images/icon/gifPic.gif" width="40px" />
                                    </marquee>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-1">
                            {/* <div className="card  myshadow" style={{border: NotificationsCardBorder, background: NotificationsCard, color: NotificationsColor }} > */}
                            <div className="card  myshadow" >
                                <div className="card-header h4 text-white " style={{ background: 'var(--d-blue)' }}>
                                    <div data-aos="fade-right"> <i className="bi bi-bell-fill text-warning "></i> Notifications
                                    </div>
                                </div>
                                <div className="card-body FeatureCard2">
                                    <marquee direction="up" scrollamount="3" behavior="scroll"> <small>[1]. CCC free on ADCA course</small> <img
                                        src="images/icon/gifPic.gif" width="40px" />
                                        <hr width="90%" /> <small>[2]. "O" Level <del className="text-warning">20,000rs.</del> <b
                                            className="fw-bold "> 14,999.</b> Only </small> <img src="images/icon/gifPic.gif"
                                                width="40px" />
                                        <hr width="90%" /> <small>[3]. Monthly test facility </small>
                                        <hr width="90%" /> <small>[4]. GOVT. recognized institute </small>
                                        <hr width="90%" /> <small>[5]. online examination facility </small>
                                    </marquee>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 my-1">
                            {/* <div className="card  myshadow " style={{background: rightFeatureFirst, color: rightFeatureFirstText, border: rightFeatureBorder }} > */}
                            <div className="card  myshadow">
                                <div className="card-body p-0 m-0">
                                    <div
                                        className="card-header fs-4"
                                        style={{ background: "var(--d-blue)" }}
                                    >
                                        <div className="fw-bold text-white" data-aos="fade-right">
                                            {" "}
                                            <i className="bi bi-card-list  
                                            fst-normal text-uppercase text-warning">
                                                {" "}
                                            </i>
                                            Basic Information :
                                        </div>
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush text-start basicStuctureShadow small">
                                    <li className="list-group-item transparentTableData" data-aos="fade-right">
                                        <img src="images/icon/homeTwo.png" width="20px" alt="" />
                                        Address: <span className='px-1'>Thoothibari Road in front Rauniyar chitra mandir </span>
                                    </li>
                                    <li className="list-group-item transparentTableData" data-aos="fade-right">
                                        <i className="bi bi-map-fill text-success mx-1" /> City: <span className='px-1'>Thoothibari</span>
                                    </li>
                                    <li className="list-group-item transparentTableData" data-aos="fade-right">
                                        <i className="bi bi-globe-central-south-asia text-success mx-1" /> District: <span className='px-1'>Maharajganj</span>
                                    </li>
                                    <li className="list-group-item transparentTableData" data-aos="fade-right">
                                        <i className="bi bi-pin-map-fill text-danger mx-1" /> State: <span className='px-1'>Uttar Pradesh</span>
                                    </li>
                                    <li className="list-group-item transparentTableData" data-aos="fade-right">
                                        <i className="fa fa-book text-primary mx-1" /> Library: <span className='px-1'>Yes</span>
                                    </li>
                                    <li className="list-group-item transparentTableData" data-aos="fade-right">
                                        <i className="bi bi-bank2 fw-bold text-success mx-1" /> Establishment(in year): <span className='px-1'>16+</span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-0 px-0  my-1">
                <CounterCard />
            </div>
            <div className="container-fluid mt-4" id="shortContact">
                <div className="row text-white" style={{ background: 'var(--dark-blue2)' }}>
                    <div className="col-12 py-4">
                        <div className="row my-4 d-flex align-items-center ">
                            <div className="col-md-6 text-uppercase" data-aos="fade-right">
                                For More Informations to contact us &nbsp; <img src="images/icon/arrow.png" width="50px" />
                            </div>
                            <div className="col-md-6">
                                <div className="row d-flex  justify-content-center">
                                    <div className="col-6 bg-warning yellow-btn border border-light fw-medium px-1 py-4 mx-1 my-3 d-flex justify-content-center"
                                        title="Santosh Singh Chauhan" data-aos="fade-right" data-aos-duration="1000">
                                        <Link to="mailto:santoshchauhan@gmail.com " className="nav-link  ">
                                            Drishteeeducation@yahoo.com</Link>
                                    </div>
                                    <div className="col-5 bg-warning yellow-btn border border-light fw-medium px-1 py-4 mx-1 my-3 d-flex justify-content-center"
                                        title="Santosh Singh Chauhan" data-aos="fade-right"> <img src="images/icon/call.gif"
                                            width="20px" />
                                        <Link to="tel:+917398889347" className="nav-link">+917398889347</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row m-0 p-0 mt-4  ">
                <div className="col-12 p-0 m-0">
                    <div className="card border border-0   rounded  rounded-0">
                        <div className="card-header h4 text-white  rounded  rounded-0" style={{ background: 'var(--d-blue)' }}>
                            <div data-aos="fade-right"> <i className="bi bi-geo-alt-fill"></i> Location</div>
                        </div>
                        <div className="card-body  m-0 p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.3484879661028!2d83.69061145032624!3d27.427248144117375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39942392249c9073%3A0x6b62ef81415149dd!2sDrishtee%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1696133570458!5m2!1sen!2sin"
                                width="100%" height="500px" style={{ border: '0' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                            </iframe>

                        </div>
                    </div>
                </div>
            </div >
            <div />
        </div>
    );
}
export default Branch 