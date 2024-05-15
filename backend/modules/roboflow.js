import axios from "axios";

export async function queryRoboflow(base64Image, ROBOFLOW_API_KEY) {
  const response = await axios({
    method: "POST",
    url: "https://detect.roboflow.com/flens/2",
    params: {
      api_key: ROBOFLOW_API_KEY,
    },
    data: base64Image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.data.predictions || response.data.predictions.length === 0) {
    return "No predictions found";
  }
  const arr = response.data.predictions;
  let identifiedDish = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    identifiedDish.push(element.class);
  }
  console.log(identifiedDish);
  return identifiedDish;
}
