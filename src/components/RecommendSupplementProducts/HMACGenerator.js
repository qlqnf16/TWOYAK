import CryptoJS from "crypto-js";
import moment from "moment";

function HMACGenerator(method, url, secretKey, accessKey) {
  const _secretKey = "13cc1492fb73323399fe6c449e6a79d18f494bb4";
  const parts = url.split(/\?/);
  const [path, query = " "] = parts;
  const datetime = moment.utc().format("YYMMD[T]HHmmss[Z]");
  const message = datetime + method + path + query;
  const signature = CryptoJS.HmacSHA256(_secretKey);
  console.log(signature);
}

export default HMACGenerator;
