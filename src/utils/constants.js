import Icon, {
  StarTwoTone,
  WhatsAppOutlined,
  PhoneOutlined, QuestionCircleOutlined, BorderOutlined, InstagramOutlined, MinusOutlined, SmileOutlined
} from "@ant-design/icons";
import { Tag } from "antd";
import icons from "Assets/Icons";

export const noimage = "https://storage.googleapis.com/flyzyzero-public/noimage.png"

export const softColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
];

export const status = {
  NEW: "NEW",
  PROPOSAL_SENT: "PROPOSAL_SENT",
  FOLLOW_UP: "FOLLOW_UP",
  CONFIRMED: "CONFIRMED",
  CLOSED_LOST: "CLOSED_LOST",
  ONGOING_TRIP: "ONGOING_TRIP",
  CLOSED_WON: "CLOSED_WON",
}

export const leadStatuses = [{
  label: "New", value: status.NEW
}, {
  label: "Quote Sent", value: status.PROPOSAL_SENT
}, {
  label: "Follow Up", value: status.FOLLOW_UP
}, {
  label: "Confirmed", value: status.CONFIRMED
}, {
  label: "Ongoing Trip", value: status.ONGOING_TRIP
}, {
  label: "Cancelled", value: status.CLOSED_LOST
}, {
  label: "Closed", value: status.CLOSED_WON
}]

export const getLeadStatusOptionByValue = (val) => {
  let option = null
  leadStatuses.every(s => {
    if (s.value == val) { option = s; return false }
    return true
  })
  return option
}

export const getColorByStatus = (val) => {
  switch (val) {
    case status.NEW:
      return { backgroundActive: "#D5DFEB", backgroundDefault: "#F8FAFB", textDefault: "#7A8795", textActive: "#79899C" }
    case status.PROPOSAL_SENT:
      return { backgroundActive: "#9643FE", backgroundDefault: "#EDDFFF", textDefault: "#9643FE", textActive: "white" }
    case status.CONFIRMED:
      return { backgroundActive: "#2D66F5", backgroundDefault: "#EBF0FE", textDefault: "#2D66F5", textActive: "white" }
    case status.CLOSED_LOST:
      return { backgroundActive: "#FF7143", backgroundDefault: "#FFDBCE", textDefault: "#FF7143", textActive: "white" }
    case status.CLOSED_WON:
      return { backgroundActive: "#6ABE5D", backgroundDefault: "#E2FFDC", textDefault: "#6ABE5D", textActive: "white" }
    default: return { backgroundActive: "#D5DFEB", backgroundDefault: "#F8FAFB", textDefault: "#7A8795", textActive: "#79899C" }
  }
}

export const paymentStatuses = [
  { label: "PENDING", value: "PENDING" },
  { label: "SCHEDULED", value: "SCHEDULED" },
  { label: "PAID", value: "PAID" },
];
export const paymentModes = [
  { label: "Credit", value: "Credit" },
  { label: "Cash", value: "Cash" },
  { label: "Upi", value: "Upi" },
  { label: "Bank", value: "Bank" },
  { label: "CC", value: "CC" },
  { label: "Other", value: "Other" },
];

export const activityTypes = [
  "LEISURE",
  "AMUSEMENT",
  "ADVENTURE",
  "DINING",
  "EVENT",
]
export const visaTypes = ["TOURIST", "BUSINESS"]
export const stayTypes = [
  "HOTEL",
  "VILLA",
  "RESORT",
  "CAMPING",
  "HOSTEL",
  "HOMESTAY",
]

export const transportTypes = [
  "AIRPORT_TRANSFER",
  "INTRA_CITY",
  "OUTSTATION"
]

export const leadSources = [
  "WHATSAPP", "INSTAGRAM", "CALL", "WALK IN", "OTHER"
]
export const getLeadSourceIcon = (source) => {
  switch (source) {
    case "WHATSAPP":
      return <>Whatsapp <span><WhatsAppOutlined /></span></>
    case "CALL":
      return <>Call <span><PhoneOutlined /></span></>
    case "WALK IN":
      return <>Walk-In <span><SmileOutlined /></span></>
    case "INSTAGRAM":
      return <>Instagram <span><InstagramOutlined /></span></>
    default:
      return <>Other <span><QuestionCircleOutlined /></span></>
  }
}

export const requirementOptions = [
  "FULL PACKAGE", "FLIGHT", "TRANSPORT", "STAY", "ACTIVITY", "VISA"
]

export const getRequirementColor = (requirement) => {
  switch (requirement) {
    case "FULL PACKAGE":
      return "blue";
    case "FLIGHT":
      return "#0057AD";
    case "STAY":
      return "pink";
    case "ACTIVITY":
      return "coral";
    case "VISA":
      return "gold";
    case "TRANSPORT":
      return "darkgreen";

    default:
      return "gray"
  }
}

export const getRequirementIcon = (requirement) => {
  switch (requirement) {
    case "FULL PACKAGE":
      return <StarTwoTone />
    case "FLIGHT":
      return <></>
    case "STAY":
      return <></>
    case "ACTIVITY":
      return <></>
    case "VISA":
      return <></>
    case "TRANSPORT":
      return <></>

    default:
      return <></>
  }
}

export const getComponentTypeColor = (componentType) => {
  switch (componentType) {
    case "HOTEL":
      return "blue";
    case "VILLA":
      return "#0057AD";
    case "CAMPING":
      return "pink";
    case "HOMESTAY":
      return "coral";
    case "HOSTEL":
      return "gold";
    case "RESORT":
      return "darkgreen";
    case "AMUSEMENT": return "cyan";

    case "ADVENTURE": return "darkgreen";
    default:
      return "gray"
  }
}


export const customIcon = ({ src, height }) => {
  return <img
    src={src}
    style={{
      height: height,
      width: height,
      objectFit: "contain",
    }}
  />
}
export const getComponentTypeIcon = (componentType) => {
  switch (componentType) {
    case "HOTEL":
      return customIcon(icons.hotel, "40px");
    case "VILLA":
      return customIcon({ src: icons.adventure, height: "50px" });
    case "CAMPING":
      return customIcon({ src: icons.adventure, height: "50px" });
    case "HOMESTAY":
      return customIcon({ src: icons.adventure, height: "50px" });
    case "HOSTEL":
      return customIcon({ src: icons.adventure, height: "50px" });
    case "RESORT":
      return customIcon({ src: icons.resort, height: "50px" });
    case "ADVENTURE":
      return customIcon({ src: icons.adventure, height: "50px" });
    case "AMUSEMENT":
      return customIcon({ src: icons.amusement, height: "50px" });
    case "VISA":
      return customIcon({ src: icons.visa, height: "40px" });

    default:
      return <></>
  }
}

export const messageTypes = {
  "DEFAULT": "DEFAULT",
  "QUERY_REQUEST": "QUERY_REQUEST"
}

export const roles = {
  DEFAULT: "MEMBER",
  MEMBER: "MEMBER",
  ADMIN: "ADMIN",
  OWNER: "OWNER",
}