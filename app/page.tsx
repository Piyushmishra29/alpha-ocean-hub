import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Vibe from "@/components/Vibe";
import Lessons from "@/components/Lessons";
import Rentals from "@/components/Rentals";
import WhyUs from "@/components/WhyUs";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vibe />
        <Lessons />
        <Rentals />
        <WhyUs />
        <Gallery />
        <Location />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
