import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-clip bg-ink text-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
