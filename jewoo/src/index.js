import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { AddStoreController, AddReviewController, AddMissionToStoreController, AddMissionToChallengesController,
  getReviewListController, getMyReviewListController, getMyChallengesContoller, updateChallengeToCompleteContoller,
  getStoreMissionListController
 } from "./controllers/store.controller.js";
 import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, kakaoStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(kakaoStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});


// 공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// session 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google Passport 관련 URL
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// Kakao Passport 관련 URL
app.get("/oauth2/login/kakao", passport.authenticate("kakao"));
app.get(
  "/oauth2/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/oauth2/login/kakao",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("Hello World!");
});

// 회원 가입
app.post("/users/signup", handleUserSignUp);

// 특정 지역에 가게 추가하는 API
app.post("/regions/:region_id/stores", AddStoreController);

// 가게 리뷰 목록 조회하는 API
app.get("/stores/:store_id/reviews", getReviewListController);

// 가게에 리뷰 추가하는 API
app.post("/stores/:store_id/reviews", AddReviewController);

// 가게에 미션 추가하는 API
app.post("/stores/:store_id/missions", AddMissionToStoreController);

// 가게의 미션을 도전 중인 미션에 추가하는 (미션 도전하기) API
app.post("/missions/:mission_id/challenges", AddMissionToChallengesController)

// 내가 작성한 리뷰 목록
app.get("/stores/:store_id/reviews/my", getMyReviewListController)

// 특정 가게의 미션 목록
app.get("/stores/:store_id/missions", getStoreMissionListController)

// 내가 진행 중인 미션 목록
app.get("/missions/challenges", getMyChallengesContoller)

// 내가 진행 중인 미션을 진행 완료로 바꾸기
app.post("/missions/challenges/:user_mission_id/complete", updateChallengeToCompleteContoller);


// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
 if (res.headersSent) {
   return next(err);
 }

 res.status(err.statusCode || 500).json({
   errorCode: err.errorCode || "unknown",
   reason: err.reason || err.message || null,
   data: err.data || null,
 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});