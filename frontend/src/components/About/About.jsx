import "./About.module.css";

const About = () => {
  return (
    <section className="light-green grades-section">
      <div className="school-section">
        <h1 className="hidden about">About the developer:</h1>

        <section className="school-part-of-section">
          <div className="description-section hidden">
            <h2>Hi I&#39;m Connor!</h2>
            <p>I&#39;m a software engineer from Calgary, Alberta.</p>
            <p>
              I’m a third year student at the University of British Columbia
              studying computer science. Looking for software engineer
              internships!
            </p>
            <p>
              I enjoy connectioning with people, exploring new technology, and
              developing cool projects with a particular interest in fullstack
              development. Outside of tech - you can find me competing in sports
              such as volleyball and bouldering, hiking up mountains with
              friends, or just listening to good music 😄
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
