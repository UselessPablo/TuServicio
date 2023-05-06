import React, { Component} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Carrousel extends Component {
 
    render() {
        const { data } = this.props; // obtiene la data desde la prop
     
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        return (
            <div className="carousel-container">
                <Slider {...settings}>
                    {data && data.map((item) => (
                        <div key={item.id}>
                            <img src={item.imagen} alt={item.nombre} />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}

export default Carrousel;
