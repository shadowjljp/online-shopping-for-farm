import React from 'react';
import { Link } from 'react-router-dom';


const HomeView = (props) => {
  return (
    <div className="container-fluid" >
    <div className="row" style={{
            color: 'white',
            backgroundImage: 'url(/home.jpg)',
            backgroundSize: 'cover', 
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            height: '100%'
          }}>
      <div className="col-lg" id="welcome1">
        <h2>{props.logInMsg}</h2>
        <h2>{props.adminView}</h2>
      </div>
      <div className="col-lg">
        <div id="welcome">
          <p>
            Welcome to VegeFruit Farms! We are farmers who are passionate about providing the highest quality fruits and vegetables possible.
            We supply organically grown fruits and vegetables ranging from apples to broccoli all for an affordable price. You can choose from
            a wide variety and it will be directly shipped to you. This is where your food adventure starts. Click the button below to get started!
          </p>
          <Link  className="btn" to={props.toPage}>Get Started</Link>
        </div> 
      </div>
    </div>
    <div className="row">
      <div className="container" id="about">
        <h2>About Us</h2>
        <p>
          We have been a farming family for over 100 years. It all started with our passion for providing the highest quality fruits and
          vegetables for our small town in Richardson, TX. Then we expanded to supplying our fruits and vegetables to people and organizations
          all over the United States. Everyday, our farmers work hard to grow a wide variety of organic fruits and vegetables for you, your family,
          and friends. We hope you enjoy our freshly grown produce!
        </p>
      </div>
    </div>
  </div>
  );
}

export default HomeView;