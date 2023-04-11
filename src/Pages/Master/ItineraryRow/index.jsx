import DestinationTag from "Components/DestinationTag";
import ImageTile from "Components/ImageTile";
import PaxCount from "Components/PaxCount";
import SimpleColoredTag from "Components/SimpleColoredTag";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
const ItineraryRow = (props) => {
  const navigate = useNavigate();
  const itinerary = props.item;
  console.log(itinerary);
  return (
    <div
      className={`itinerary-row ${props?.minimal ? "nomargin" : ""}`}
      onClick={() => {
        navigate(`/itinerary/${itinerary.id}`);
      }}
    >
      <div className="flex-1">#{itinerary?.id}</div>
      <div className="flex-2  centered col">
        <ImageTile
          category={"STATIC"}
          image={{ url: itinerary?.theme_object?.images[0] ?? "" }}
        />
        <div className="little"> {itinerary?.theme_object?.theme_name}</div>
      </div>
      <div className="flex-2 col">{itinerary?.itinerary_name}</div>
      {props?.minimal ? (
        <></>
      ) : (
        <div className="flex-3 id">
          {itinerary?.description?.substring(0, 30)}
        </div>
      )}
      <div className="flex-2 col">
        {itinerary?.destinations.map((des) => (
          <DestinationTag text={des?.formatted_address} />
        ))}
      </div>
    </div>
  );
};

export default ItineraryRow;
