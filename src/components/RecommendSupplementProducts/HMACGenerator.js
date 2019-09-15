import CryptoJS from "crypto-js";
import moment from "moment";

function HMACGenerator(method, url, secretKey, accessKey) {
  const parts = url.split(/\?/);
  const [path, query = ""] = parts;
  const datetime = moment.utc().format("YYMMDD[T]HHmmss[Z]");
  const message = datetime + method + path + query;
  const signature = CryptoJS.HmacSHA256(message, secretKey).toString(
    CryptoJS.enc.Hex
  );
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
}

export default HMACGenerator;
