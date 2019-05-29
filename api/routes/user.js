import validator from "validator";
import md5 from "md5";
import redis from "redis";
import utils from "../utils";

export default function (router, db, cache) {
  router.post("/user/update", (req, res) => {
    if (!validator.isEmail(req.body.email)) 
      res.json({status: "error", key: "email", msg: "Email is not valid"});
    else if (!(req.body.password === req.body.password2)) 
      res.json({status: "error", key: "password", msg: "Passwords do not match"});
    else if (!validator.matches(String(req.body.password), /(?=.*[0-9])/)) 
      res.json({status: "error", key: "password", msg: "The password must contain at least 1 numeric character"});
    else if (!validator.matches(String(req.body.firstName), /^[a-zA-Z]+$/)) 
      res.json({status: "error", key: "firstName", msg: "A name can contain only Alpha Characters"});
    else if (!validator.matches(String(req.body.lastName), /^[a-zA-Z]+$/)) 
      res.json({status: "error", key: "lastName", msg: "A surname can contain only Alpha Characters"});
    else 
      db.query("INSERT INTO user (name,surname,password,email) VALUES (?,?,?,?)", [
        // UPDATE user SET (name,surname,password,email) VALUES (?,?,?,?) WHERE userId=1
        req.body.firstName,
        req.body.lastName,
        md5(req.body.password),
        req.body.email
      ], function (error, results, fields) {
        if (error && error.code === "ER_DUP_ENTRY") 
          res.json({status: "error", key: "email", msg: "This email has been registered before, please write different."});
        else if (error && error.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") 
          res.json({status: "error", msg: "Invalid value, please control your credientials."});
        else if (results && results.affectedRows) 
          res.json({status: "success", msg: "success"});
        else 
          res.json({status: "error", msg: "Unknown error"});
        }
      );
    }
  );
}