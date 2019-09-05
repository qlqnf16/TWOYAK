import crypto from "crypto-js";
import moment from "moment";

function HMACGenerator() {
  generatHmac: (method, url, secretKey, accessKey) => {
    const parts = url.split(/\?/);
    const [path, query = " "] = parts;
    const datetime = moment.utc().format("YYMMD[T]HHmmss[Z]");
    const message = datetime + method + path + query;
    const signature = HMAC_SHA256(secretKey).update(message).digest;
  };
}
