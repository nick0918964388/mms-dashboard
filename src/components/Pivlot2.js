import React, { useEffect } from "react";
import $ from "jquery";
import "react-pivottable/pivottable.css";



const Pivlot2 = () => {
  useEffect(() => {
    $("#output").pivot(
      [
        {
          SRN: 108,
          MainSystemType: "WA15",
          MagnetCoverType: "WA_15T",
          MagnetRMMUType: "Wide Aperture"
        },
        {
          SRN: 121,
          MainSystemType: "T15",
          MagnetCoverType: "F2000",
          MagnetRMMUType: "Achieva"
        },
        {
          SRN: 117,
          MainSystemType: "T30",
          MagnetCoverType: "3T_2",
          MagnetRMMUType: "Achieva AmbiRing"
        }
      ],
      {
        rows: ["SRN", "MainSystemType"],
        cols: ["MagnetCoverType", "MagnetRMMUType"]
      }
    );
  }, []);

  return <div id="output" />;


}


// const comparisonFn = function (prevProps, nextProps) {
//     return prevProps.location.pathname === nextProps.location.pathname;
// };

export default React.memo(Pivlot2);
