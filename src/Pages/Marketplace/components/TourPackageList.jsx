import React, { useEffect } from "react";

const TourPackageList = ({ searchText }) => {
  useEffect(() => {
    console.log("tplist", searchText);
  }, [searchText]);
  return <div>TourPackageList</div>;
};

export default TourPackageList;
