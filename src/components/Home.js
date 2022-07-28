function Home() {
  return (
    <div className="homepage">
      <h1>
        Welcome to the home of The Hummingways{" "}
        <span className="fcTag">&#60;&#60;Usagi&#62;&#62;</span>!
      </h1>

      <img
        className="homepageImage"
        src={require("../fc_house.png")}
        alt="fc house"
      ></img>
      <h5>Plot 3, 24th Ward, The Lavender Beds, Cactuar</h5>

      <div className="fcAbout">
        Hello and welcome! We are a small Free Company on Cactuar who dabble in
        all kinds of gameplay and silly antics. Please take a look at our
        gallery!
      </div>
    </div>
  );
}

export default Home;
