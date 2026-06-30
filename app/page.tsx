import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TideBar from "@/components/TideBar";
import Marquee from "@/components/Marquee";
import Intro from "@/components/Intro";
import Lessons from "@/components/Lessons";
import PhotoBreak from "@/components/PhotoBreak";
import Rentals from "@/components/Rentals";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";
import { asset } from "@/lib/asset";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <Lessons />
        <PhotoBreak
          src={asset("/photos/hero-desktop.webp")}
          quote="Not just surfing. It's a lifestyle."
          attribution="Weligama, Sri Lanka"
        />
        <Rentals />
        <WhyUs />
        <Gallery />
        <Reviews />
        <FAQ />
        <PhotoBreak src={asset("/photos/img-2924.jpg")} />
        <Location />
        <BookingCTA />
      </main>
      <Footer />
      <TideBar />
    </>
  );
}
