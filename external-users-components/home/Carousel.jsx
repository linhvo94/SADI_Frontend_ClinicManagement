import React from 'react';

export const Carousel = (props) => {
    return (
        <div id='myCarousel' className='carousel slide' data-ride='carousel'>
            <ul className='carousel-indicators'>
                <li data-target='#myCarousel' data-slide-to="0" className='active'></li>
                <li data-target='#myCarousel' data-slide-to="1"></li>
                <li data-target='#myCarousel' data-slide-to="2"></li>
                <li data-target='#myCarousel' data-slide-to="3"></li>
            </ul>
            <div className='carousel-inner'>
                <div className='carousel-item active '>
                    <img 
                        src='https://www.midmichigan.org/app/files/public/29376/Heart-and-Vascular-Center-Rendering-1600x530-no-blurr.jpg'
                        alt='Hospital Outside' />
                </div>

                <div className='carousel-item'>
                    <img 
                        src='https://www.midmichigan.org/app/files/public/30080/Eric-Dobrzynski-web-1600x530.jpg'
                        alt='Doctor' />
                </div>

                <div className='carousel-item'>
                    <img 
                        src='https://www.midmichigan.org/app/files/public/30112/Peggy-Bongard-Oncology-web-1600x530.jpg'
                        alt="Patient" />
                </div> 

                <div className='carousel-item'>
                    <img 
                        src='http://drcollaborative.com/wp-content/uploads/2016/08/doctors-resource-collaborative-albuquerque-1600x530.jpg'
                        alt='Doctors' />
                </div>
            </div>
        </div>


    )
}