import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop, NotFound } from "./router-bits";
import MainLayout from "./layouts/MainLayout";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import ServicesTeaser from "./sections/ServicesTeaser";
import Testimonials from "./sections/Testimonials";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import FooterCTA from "./sections/FooterCTA";

const Shop = lazy(() => import("./shop/Shop"));
const ProductPage = lazy(() => import("./shop/ProductPage"));

const Home = () => (
  <MainLayout>
    <Hero />
    <About />
    <Experience />
    <Skills />
    <Projects />
    <ServicesTeaser />
    <Testimonials />
    <Education />
    <FooterCTA />
    <Contact />
  </MainLayout>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
