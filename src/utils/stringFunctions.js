import icons from "Assets/Icons";
import dayjs from "dayjs";

export const capitalize = (s) => {
  return s?.charAt(0).toUpperCase() + s.slice(1);
};
// capitalize first letter of every word
export const capitalizeFirstLetter = (s) => {
  return s?.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getInitials = (fullName) => {
  if ((fullName ?? "").length) {
    let tokens = fullName.split(" ");
    let initials = "";
    tokens.forEach(t => initials += t[0]);
    return initials;
  } else return ""
}
export const getRandomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + color;
}
export const Options = [
  {
    index: 0,
    label: "Settings",
    icon: icons.settings,
    onClick: {},
  },
  {
    index: 1,
    label: "Download",
    icon: icons.download,
    onClick: {},
  },

  {
    index: 2,
    label: "Delete",
    icon: icons.delete,
    onClick: {},
  },
];

export const summarizeDestinations = (destinations) => {
  let resp = ""
  destinations.forEach(d => {
    if (resp.length) resp += ", "
    console.log("dd", d);
    let city = (JSON.parse(d.value).formatted_address).toString().split(",")[0].split("-")[0]
    resp += city
  })
  return resp;
}

export const getDateRangeStr = (dates) => {
  console.log(dates.length);
  let str = "";
  let lastdt;
  dates.map(d => { if (d.toString().includes("Invalid")) return; if (dayjs(d).toISOString() === lastdt); else { if (str.length) str += " - "; str += dayjs(d).format("ddd DD MMM") } lastdt = dayjs(d).toISOString(); })
  return str
}

export const toProperCase = (text) => {
  return text?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export const getPriceRange = (items) => {
  let min, max;
  try {
    min = items[0].price;
    max = items[0].price;
    items.forEach(i => { if (i.price < min) min = i.price; if (i.price > max) max = i.price; })
  } catch (error) {
    console.error(error);
    return "--"
  }
  return (min == max) ? `₹${min}` : `₹${min} - ${max}`;
}