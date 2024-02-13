import NavbarComponent from "../../components/navbar/Navbar";
import HeaderComponent from "../../components/header/Header";
import FeaturedComponent from "../../components/featured/Featured";
import PropertyListComponent from "../../components/propertyList/PropertyList";
import FeaturedPropertiesComponent from "../../components/featuredProperties/FeaturedProperties";
import MailListComponent from "../../components/mailList/MailList";
import FooterComponent from "../../components/footer/Footer";
import "./home.css";

const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <HeaderComponent />
      <div className="home-container">
        <FeaturedComponent />
        <h1 className="home-title">Explore by Tourism Type</h1>
        <PropertyListComponent />
        <h1 className="home-title">Top-rated Accommodations</h1>
        <FeaturedPropertiesComponent />
        <MailListComponent />
        <FooterComponent />
      </div>
    </div>
  );
};

export default Home;

