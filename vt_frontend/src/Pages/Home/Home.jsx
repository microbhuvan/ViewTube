import SideNavbar from "../../components/SideNavbar/SideNavbar";
import "./home.css";
import HomePage from "../../components/HomePage/HomePage";

const Home = ({ sideNavbar }) => {
  return (
    <div className="home">
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
    </div>
  );
};

export default Home;
