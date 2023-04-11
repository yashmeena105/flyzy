import axios from "axios";
import { serverEndpoint } from "Config/helpers";

export const AxiosAll = async (method, path, data, uid) => {

  const token = "";

  let finalUrl = `${serverEndpoint}${path}?deviceType=1&deviceToken=${token}`;

  return await axios({
    method: method,
    url: finalUrl,
    data: data,
    headers: { "Content-Type": "application/json", uid: uid },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
