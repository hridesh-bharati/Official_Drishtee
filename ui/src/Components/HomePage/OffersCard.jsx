import React from 'react';
import { Link } from 'react-router-dom';
import UseFullCard from '../Verification/UseFullCard';
import OfferPic1 from '../../../public/images/vender/offer.gif';
import python from '../../../public/images/vender/python1.gif';
import react from '../../../public/images/vender/react1.gif';
import worldImage from '../../../public/images/vender/world1.gif';

const OffersCard = () => (
    <div className="offers-card" style={{ margin: '4rem 0 0 0', position: 'relative' }}>
        <div className='blur-overlay' style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: `url(${worldImage})`, filter: 'blur(2px)'
        }}></div>
        <div className='card-effects-border card-effects'>
            <div className="container-fluid my-shadow py-4">
                <div className="row d-flex justify-content-around">
                    <OfferSection style={{ zIndex: '999' }} />
                    <UseFullCard className='d-inline w-50' />
                </div>
            </div>
            <div className="row d-flex justify-content-center align-items-center px-0 my-3 m-auto text-center p-4">
                <OfferBox image={python} className='img-fluid' buttonText="APPLY" link="/AdmissionForm" text="Free Registration" />
                <OfferBox image={react} className='img-fluid' buttonText="APPLY" link="/AdmissionForm" text="Free Registration" />
                <OfferBox buttonText="APPLY" link="/AdmissionForm" text="Free on ADCA" additionalText="CCC FREE on 1 Year's Course" />
            </div>
        </div>
    </div>
);

const OfferSection = () => (
    <div className="col-md-6 bg-light d-flex cardEffectsBorder align-items-center" style={{ zIndex: '999' }}>
        <div>
            <b className='fs-3'>Drishtee give to You a mega offer </b> <br />
            <p className="text-warning">50% Discount on Registration.</p>
            <p>दृष्टि आप सभी को दे रहा है , <br /> बंपर ऑफर , जिसमें आपको किसी भी डिप्लोमा पर 50% का डिस्साउंट दिया जा रहा है।</p>
        </div>
        <img src={OfferPic1} width={200} className='img-fluid' alt="Offer" />
    </div>
);

const OfferBox = ({ image, buttonText, link, text, additionalText }) => (
    <div className="col-md-3 m-1 border border-1 bg-dark cardEffects d-flex flex-column" style={{ height: '300px' }}>
        <div className="text-center myshadow2 d-flex">
            <h4 className='text-center w-100 text-white ' style={{ textShadow: '1px 2px 1px black' }}>{text}</h4>
            <button type="button" className="btn btn-primary btn-sm   btn-sm d-flex align-items-center">
                <Link to={link} className="nav-link ">{buttonText}</Link>
            </button>
        </div>
        {additionalText && <b className='BadLine fs-1 lh-1 text-warning pt-5 mt-4'>{additionalText}</b>}
        {image && <img src={image} className='img-fluid mt-2 pt-1 overflow-hidden'
            style={{ width: '100%', height: '120%', maxWidth: '120%', maxHeight: '80%', alignSelf: 'center' }}
            alt="Offer" />}
    </div>
);

export default OffersCard;
