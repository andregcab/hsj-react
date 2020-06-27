import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import("./homepage.css");

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header id="navOverlay" className="navHeader">
        </header>

        <div className="description">
          <h3>What is HSJ?</h3>
          <p>
            Take a snapshot of a past journey, and transform practically every
            part into a unique representation of Hops Skips and Jumps. Plan a
            trip and share your ideas with the world. Havent made an account
            yet? No problem, you can still check out other user's{" "}
            <Link className="allj" to="/allJumps">
              Jump's.
            </Link>
          </p>
          <p id="getStarted">
            Your next adventure is only a Hop, Skip and a Jump away!
          </p>
        </div>

        <Carousel
          autoPlay
          infiniteLoop
          // width="1000px"
          showStatus={false}
          className="carousel"
          id="test9"
        >
          <div>
            <img
              src="/images/alex-vasey-3lxrM5yvkcI-unsplash.jpg"
              alt="image1"
            />
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div>
            <img
              src="/images/clay-banks-hwLAI5lRhdM-unsplash.jpg"
              alt="image2"
            />
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div>
            <img
              src="/images/dino-reichmuth-A5rCN8626Ck-unsplash.jpg"
              alt="image3"
            />
            {/* <p className="legend">Legend 3</p> */}
          </div>
          <div>
            <img
              src="/images/alexander-ramsey-dBtWLliLt5k-unsplash.jpg"
              alt="image3"
            />
            {/* <p className="legend">Legend 3</p> */}
          </div>
          <div>
            <img
              src="/images/anastasia-dulgier-QboRVYU6sfQ-unsplash.jpg"
              alt="image3"
            />
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>

        <footer>
          <div id="footer-info">
            <p>
              This app was a team effort between Andre Cabrera and Ashley Arrue.
              Thank you Ironhack staff and my fellow cohorts for the help and
              support! <br />
              <br /> Ironhack &nbsp; 2019{" "}
            </p>
          </div>

          <div id="footer-links">
            <a href="https://github.com/andregcab">Andre's GitHub</a>
            <a href="https://github.com/Ashleydarrue">Ashley's GitHub</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default HomePage;
