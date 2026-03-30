import HeroBanner from '../component/home/HeroBanner'
import Section1 from '../component/home/Section1'
import Section2 from '../component/home/Section2'
import Section3 from '../component/home/Section3'
import Section4 from '../component/home/Section4'
import Section5 from '../component/home/Section5'
import Section6 from "../component/home/Section6";
import Testimonial from "../component/home/Testimonial";
import Blog from "../component/home/Blog";
import Questions from "../component/home/Questions";
import Newsletter from "../component/home/Newsletter";

export default function Home() {
  return (
    <>
        <HeroBanner />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Testimonial />
        <Blog />
        <Questions />
        <Newsletter />
    </>
  );
}
