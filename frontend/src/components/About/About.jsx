import "./About.module.css";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          // console.log(entry + "added to show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden, .img-hidden");
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);
  return (
    <>
      <section className="grades-section">
        <div className="school-section">
          <h1 className="hidden about">About the website:</h1>

          <section className="school-part-of-section">
            <div className="description-section hidden">
              <h2 className="hidden spacer">About PathFinder:</h2>
              <h3 className="hidden spacer">The Mission:</h3>
              <p className="hidden spacer">
                At PathFinder, we believe that travel should be an exciting,
                stress-free experience. Our mission is to revolutionize the way
                people plan their journeys by leveraging the power of artificial
                intelligence to create personalized, seamless, and unforgettable
                travel experiences.
              </p>
            </div>
          </section>
        </div>
      </section>
      <section className="me-section">
        <div className="school-section">
          <h1 className="hidden about ">About the developer:</h1>

          <section className="school-part-of-section">
            <div className="description-section hidden">
              <h2 className="hidden spacer">Hi I&#39;m Connor!</h2>
              <p className="hidden spacer">
                I&#39;m a software engineer from Calgary, Alberta.
              </p>
              <p className="hidden spacer">
                I’m a third year student at the University of British Columbia
                studying computer science. Looking for software engineer
                internships!
              </p>
              <p className="hidden spacer">
                I enjoy connectioning with people, exploring new technology, and
                developing cool projects with a particular interest in fullstack
                development. Outside of tech - you can find me competing in
                sports such as volleyball and bouldering, hiking up mountains
                with friends, or just listening to good music 😄
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default About;
