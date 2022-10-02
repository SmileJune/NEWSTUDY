import React, { useState } from "react";
import ReactGlobe from "react-globe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import optional tippy styles for tooltip support
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import GlobeImg from "assets/globe_diffuse.jpg";
import Earth from "assets/earthmap.jpg";
import Kor from "assets/kor.jpg";
import TrendDesign from "assets/trend-circle-design.png";
import { useEffect } from "react";

function markerTooltipRenderer(marker) {
  return `CITY: ${marker.city}`;
}

const options = {
  markerTooltipRenderer,
  enableCameraZoom: false,
  focusDistanceRadiusScale: 3,
};

export default function Globe({ markers, selectedIdx, setSelectedIdx }) {
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  const [focus, setFocus] = useState([37.541, 126.986]);
  const hashtags = ["코로나", "쌔삥", "페이커"];

  useEffect(() => {
    setFocus(markers[selectedIdx].coordinates);
    setDetails(markerTooltipRenderer(markers[selectedIdx]));
    return () => {};
  }, [selectedIdx]);

  const onClickMarker = (marker, markerObject, event) => {
    console.log("event", event);
    console.log("marker", marker.id);
    console.log("markerObject", markerObject);
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(markerTooltipRenderer(marker));
    setSelectedIdx(marker.id);
  };

  const onDefocus = (previousFocus) => {
    setEvent({
      type: "DEFOCUS",
      previousFocus,
    });
    setDetails(null);
  };

  return (
    <div className="globe-box">
      {details && (
        <>
          <div className="nation-info-card">
            <img
              src={markers[selectedIdx].img}
              alt=""
              className="nation-info-flag"
            />
            <h1 className="nation-info-name">
              {markers[selectedIdx].city}, {markers[selectedIdx].kor}{" "}
            </h1>
            <div className="nation-info-taglist">
              {hashtags.map((tag, i) => {
                return (
                  <div className="nation-info-tag" key={i}>
                    <b>#</b>
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <ReactGlobe
        height="100%"
        globeBackgroundTexture={null}
        // globeTexture={GlobeImg}
        globeTexture={Earth}
        markers={markers}
        options={options}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
        focus={focus}
      />
    </div>
  );
}