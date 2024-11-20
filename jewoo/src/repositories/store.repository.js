import { prisma } from "../db.config.js";

// 특정 지역에 가게 추가
export const addStoreModel = async(data) => {
  const store = await prisma.store.create({
    data: {
      regionId: parseInt(data.region_id),
      name: data.name,
      address: data.address,
      score: data.score
    }
  });

  return store.id;
}

// 가게 정보 얻기
export const getStoreModel = async (storeId) => {
  const store = await prisma.store.findUnique({
    select: {
      id: true,
      region: true,
      name: true,
      address: true,
      score: true
    },
    where: {id: parseInt(storeId)}
  });

  return store;
};

// 가게 리뷰 리스트 가져오기
export const getReviewListModel = async (storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      user: true
    },
    where: {storeId: storeId, id: {gt: cursor}},
    orderBy: {id: "asc"},
    take: 5
  });

  return reviews;
}

// 리뷰 추가하기
export const addReviewModel = async(data) => {
  const review = await prisma.review.create({
    data: {
      userId: parseInt(data.user_id),
      storeId: parseInt(data.store_id),
      body: data.body,
      score: data.score
    }
  });

  return review.id;
}

// 가게 리뷰 가져오기
export const getReviewModel = async (reviewId) => {
  const review = await prisma.review.findUnique({
    select: {
      id: true,
      user: true,
      store: true,
      body: true,
      score: true
    },
    where: {id: parseInt(reviewId)}
  });

  return review;
}

// 가게에 미션 추가하기
export const addMissionToStoreModel = async (data) => {
  const mission = await prisma.mission.create({
    data: {
      storeId: parseInt(data.store_id),
      reward: data.reward,
      deadline: data.deadline,
      missionSpec: data.mission_spec
    }
  });

  return mission.id;
}

// 가게의 미션 정보 얻기
export const getMissionToStoreModel = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    select: {
      id: true,
      store: true,
      reward: true,
      deadline: true,
      missionSpec: true
    },
    where: {id: parseInt(missionId)}
  });

  return mission;
};

// 도전 중인 미션 추가
export const addMissionToChallengeModel = async (data) => {
  const challenge = await prisma.userMission.findFirst({where: {userId: parseInt(data.user_id), missionId: parseInt(data.mission_id)}});

  if (challenge) {
    return null;
  }

  const created = await prisma.userMission.create({
    data: {
      missionId: parseInt(data.mission_id),
      userId: parseInt(data.user_id),
      status: data.status
    }
  });

  return challenge.id;
}

// 도전 미션 정보 가져오기
export const getMissionToChallengeModel = async (challengeId) => {
  const challenge = await prisma.userMission.findUnique({
    select: {
      id: true,
      user: true,
      mission: true,
      status: true
    },
    where: {id: parseInt(challengeId)}
  });

  return challenge;
}

// 내가 작성한 리뷰 리스트 가져오기
export const getMyReviewListModel = async (storeId, userId, cursor) => {
  const myReviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      user: true
    },
    where: {storeId: storeId, userId: userId, id: {gt: cursor}},
    orderBy: {id: "asc"},
    take: 5
  });

  return myReviews;
}

// 특정 가게의 미션 목록 가져오기
export const getStoreMissionListModel = async (storeId, cursor) => {
  const storeMissionList = await prisma.mission.findMany({
    select: {
      id: true,
      store: true,
      reward: true,
      deadline: true,
      missionSpec: true
    },
    where: {storeId: storeId, id: {gt: cursor}},
    orderBy: {id: "asc"},
    take: 5
  })

  return storeMissionList;
}

// 내가 진행 중인 미션 목록 가져오기
export const getMyChallengesModel = async (userId, cursor) => {
  const myChallenges = await prisma.userMission.findMany({
    select: {
      id: true,
      mission: true
    },
    where: {userId: userId, id: {gt: cursor}},
    orderBy: {id: "asc"},
    take: 5
  })

  return myChallenges;
}

// 내가 진행 중인 미션을 진행 완료로 바꾸기
export const updateChallengeToCompleteModel = async (userMissionId) => {
  const completeChallenge = await prisma.userMission.update({
    select: {id: true, user: true, mission: true, status: true},
    where: { id: userMissionId },
    data: { status: "진행 완료" }
  })

  return completeChallenge;
}