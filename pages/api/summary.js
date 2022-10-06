import { readUsersDB, writeUsersDB } from "../../backendLibs/dbLib";
import { checkToken } from "../../backendLibs/checkToken";

export default function summaryRoute(req, res) {
  if (req.method === "GET") {
    //check authentication
    const user = checkToken(req);
    if (!user || user.isAdmin !== true) {
      return res.status(403).json({ ok: false, message: "Permission denied" });
    }
    //compute DB summary
    let userCount = 0;
    let adminCount = 0;
    let totalMoney = 0;
    const users = readUsersDB().map((x) => {
      if (x.isAdmin === true) {
        adminCount = adminCount + 1;
      } else {
        userCount = userCount + 1;
        totalMoney = totalMoney + x.money;
      }
    });

    //return response
    return res
      .status(200)
      .json({ ok: true, userCount, adminCount, totalMoney });
  } else {
    return res.status(400).json({ ok: false, message: "Invalid HTTP Method" });
  }
}
