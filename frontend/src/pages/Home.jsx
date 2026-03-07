import React from 'react'
import HeroSwiper from '../components/SwiperSlide'
import ProductCard from '../components/ProductCard'
import AllProductCard from '../components/AllProductCard'

const Home = () => {
  return (
    <div className=''>
      <HeroSwiper/>
      <ProductCard />
      <AllProductCard />
    </div>
  )
}

export default Home