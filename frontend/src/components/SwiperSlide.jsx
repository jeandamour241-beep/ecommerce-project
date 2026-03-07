import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";

const HeroSwiper = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://ecommerce-project-1z7p.onrender.com/product/swiper");
        console.log(res.data.product);

        if (res.data.success) {
          setProducts(res.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full h-125 relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={products.length > 1}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {products.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-125">
              {/* Background Image */}
              <img
                src={slide.image_url}
                alt={slide.name}
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-6xl mx-auto px-6 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeInUp">
                    {slide.name}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
                    {slide.description}
                  </p>

                  <div className="flex gap-4">
                    <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-lg font-semibold hover:cursor-pointer">
                      Shop now
                    </button>
                    <button className="border border-white hover:bg-white hover:text-black transition px-6 py-3 rounded-lg font-semibold hover:cursor-pointer" onClick={() => navigate(`/product/${slide.id}`)}>
                      More details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSwiper;
