import MainLayout from "./layouts/MainLayout";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import FooterCTA from "./sections/FooterCTA";

function App() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <FooterCTA />
      <Contact />
    </MainLayout>
  );
}

export default App;
