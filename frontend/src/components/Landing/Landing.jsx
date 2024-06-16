import { SectionOne } from "./Sections/SectionOne";
import { useLocation } from "react-router-dom";
import { SectionTwo } from "./Sections/SectionTwo";
import { SectionThree } from "./Sections/SectionThree";

const Landing = () => {
  const location = useLocation();

  const isLanding = location.pathname === "/";

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
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
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </div>
  );
};

export default Landing;
