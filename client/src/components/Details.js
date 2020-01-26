import "../App.css";

import React, { useState } from "react";

import deets from "../details.json";

const Details = () => {
  const { description, features, footage, location } = deets[0];

  const showDetails = deets.map(item => {
    const { description, features, footage, location, picsArr } = item;
    const [pic0, pic1, pic2] = picsArr;
    const path = "/img/";

    return (
      <React.Fragment>
        <div className="details_div" key={item.description}>
          Details:
          <div className="details_text">{description}</div>
          <div className="details_text">{features}</div>
          <div className="details_text">{footage}</div>
          <div className="details_text">{location}</div>
        </div>
        <div className="picture_div">
          <img className="pictures" src={path + pic0} alt="view0" />
          <img className="pictures" src={path + pic1} alt="view1" />
          <img className="pictures" src={path + pic2} alt="view2" />
        </div>
      </React.Fragment>
    );
  });
  return <React.Fragment>{showDetails}</React.Fragment>;
};

export default Details;
