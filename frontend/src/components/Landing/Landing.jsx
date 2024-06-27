import { SectionOne } from "./Sections/SectionOne";
import { useLocation } from "react-router-dom";
import { SectionTwo } from "./Sections/SectionTwo";
import { SectionThree } from "./Sections/SectionThree";

const Landing = () => {
  const location = useLocation();

  const isLanding = location.pathname === "/";

  if (isLanding) {
    window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".navbar-absolute");
      if (window.scrollY > 400) {
        // Add sticky class after scrolling 50px
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    });
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </div>
  );
};

export default Landing;
