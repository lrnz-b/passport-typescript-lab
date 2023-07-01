import express from "express";
import { ensureAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req: any, res) => {
  req.session.messages = [];
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, (req: any, res) => {
    if (req.user.type === 'admin') {
      req.sessionStore.all((err: any, sessions: any) => {
        if(err) {
          console.log(err)
        }
        else {
          const sessObj:any = [];
          const keys = Object.keys(sessions);
          keys.forEach((key:any) => {
            sessObj.push({sessionId: key, userId: sessions[key].passport.user});
          });
          res.render("admin", { sessions: sessObj, name: req.user.name });
        }
      });
    }
    else {
      res.redirect("/dashboard");
    }
  }
);

router.post("/admin/revoke", (req: any, res) => {
  const targetSessionId = req.body.targetSessionId;
  req.sessionStore.destroy(targetSessionId, (err: any) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("User session destroyed")
    }
  })
  res.redirect("/admin");
})

export default router;
