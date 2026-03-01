import FeaturedProducts from '@/components/home/FeaturedProducts'
import Footer from '@/components/home/Footer'
import Hero from '@/components/home/Hero'
import { Navbar } from '@/components/Navbar'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeaturedProducts/>
      <Footer/>
    </div>
  )
}

export default Home