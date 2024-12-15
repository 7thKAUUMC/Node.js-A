import { StatusCodes } from "http-status-codes";
import { bodyToStore, bodyToReview, bodyToMissionToStore, bodyToMissionToChallenge } from "../dtos/store.dto.js";
import { addStoreService, addReviewService, addMissionToStoreService, addMissionToChallengeService,
  getReviewListService, getMyReviewListService, getMyChallengesService, updateChallengeToCompleteService,
  getStoreMissionListService
 } from "../services/store.service.js";


// 특정 지역에 가게 추가
export const AddStoreController = async (req, res, next) => {
  /*
    #swagger.summary = '특정 지역에 가게 추가하는 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              address: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "특정 지역에 가게 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    region: { type: "object", properties: { id: {type: "number"}, name: {type: "string"} } },
                    name: { type: "string" },
                    address: { type: "string" },
                    score: {type: "number"}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "특정 지역에 가게 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    const region_id = req.params.region_id;
  
    const store = await addStoreService(bodyToStore(region_id, req.body));
    res.status(StatusCodes.OK).success({result: store});
}

// 가게 리뷰 조회
export const getReviewListController = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 조회 API';
    #swagger.responses[200] = {
      description: "가게 리뷰 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        body: { type: "string" },
                        score: { type: "number" },
                        user: { type: "object", properties: { id: {type: "number"}, email: {type: "string"}, name: {type: "string"}, gender: {type: "string"},
                        birthday: {type: "string"}, address: {type: "string"}, detailAddress: {type: "string"}, phoneNumber: {type: "string"}}}
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 리뷰 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
    const reviews = await getReviewListService(
      parseInt(req.params.store_id),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);
    res.status(StatusCodes.OK).success({result: reviews});
}
  
// 가게에 리뷰 추가
export const AddReviewController = async (req, res, next) => {
  /*
    #swagger.summary = '가게에 리뷰 추가하는 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "string" },
              body: { type: "string" },
              score: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게에 리뷰 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    user: { type: "object", properties: { id: {type: "number"}, email: {type: "string"}, name: {type: "string"}, gender: {type: "string"},
                    birthday: {type: "string"}, address: {type: "string"}, detailAddress: {type: "string"}, phoneNumber: {type: "string"} } },
                    store: {type: "object", properties: { id: {type: "number"}, region_id: {type: "number"}, name: {type: "string"}, address: {type: "string"}, score: {type: "number"} }},
                    body: { type: "string" },
                    score: {type: "number"}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게에 리뷰 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

  const store_id = req.params.store_id;

  const review = await addReviewService(bodyToReview(store_id, req.body));
  res.status(StatusCodes.OK).success({result: review});
}

// 가게에 미션 추가
export const AddMissionToStoreController = async (req, res, next) => {
  /*
    #swagger.summary = '가게에 미션 추가하는 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reward: { type: "number" },
              deadline: { type: "string" },
              mission_spec: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게에 미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    store: {type: "object", properties: { id: {type: "number"}, region_id: {type: "number"}, name: {type: "string"}, address: {type: "string"}, score: {type: "number"} }},
                    reward: { type: "number" },
                    deadline: { type: "string" },
                    mission_spec: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게에 미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const store_id = req.params.store_id;

  const mission = await addMissionToStoreService(bodyToMissionToStore(store_id, req.body));
  res.status(StatusCodes.OK).success({result: mission});
  
}

// 가게의 미션을 도전 중인 미션에 추가
export const AddMissionToChallengesController = async (req, res, next) => {
  /*
    #swagger.summary = '가게의 미션을 도전 중인 미션에 추가하는 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reward: { type: "number" },
              deadline: { type: "string" },
              mission_spec: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게의 미션을 도전 중인 미션에 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    user: { type: "object", properties: { id: {type: "number"}, email: {type: "string"}, name: {type: "string"}, gender: {type: "string"},
                    birthday: {type: "string"}, address: {type: "string"}, detailAddress: {type: "string"}, phoneNumber: {type: "string"} } },
                    mission: {type: "object", properties: { id: {type: "number"}, storeId: {type: "number"}, reward: {type: "number"}, deadline: {type: "string"}, missionSpec: {type: "string"} }},
                    status: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게의 미션을 도전 중인 미션에 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const mission_id = req.params.mission_id;

  const challenge = await addMissionToChallengeService(bodyToMissionToChallenge(mission_id, req.body));
  res.status(StatusCodes.OK).success({result: challenge});

}

// 내가 작성한 리뷰 목록 가져오기
export const getMyReviewListController = async (req, res, next) => {
  /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "내가 작성한 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        body: { type: "string" },
                        score: { type: "number" },
                        user: { type: "object", properties: { id: {type: "number"}, email: {type: "string"}, name: {type: "string"}, gender: {type: "string"},
                        birthday: {type: "string"}, address: {type: "string"}, detailAddress: {type: "string"}, phoneNumber: {type: "string"}}}
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "내가 작성한 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const myReviews = await getMyReviewListService(
    parseInt(req.params.store_id),
    parseInt(req.body.user_id),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);

  res.status(StatusCodes.OK).success({result: myReviews});
}

// 특정 가게의 미션 목록 가져오기
export const getStoreMissionListController = async (req, res, next) => {
  /*
    #swagger.summary = '특정 가게의 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "특정 가게의 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: {type: "object", properties: { id: {type: "number"}, region_id: {type: "number"}, name: {type: "string"}, address: {type: "string"}, score: {type: "number"} }},
                        reward: { type: "number" },
                        deadline: { type: "string" },
                        missionSpec: {type: "string"}
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "특정 가게의 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const storeMissionList = await getStoreMissionListService(
    parseInt(req.params.store_id),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  )

  res.status(StatusCodes.OK).success({result: storeMissionList});
}

// 내가 진행 중인 미션 목록 가져오기
export const getMyChallengesContoller = async (req, res, next) => {
  /*
    #swagger.summary = '내가 진행 중인 미션 목록 조회 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              user_id: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "내가 진행 중인 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        mission: {type: "object", properties: { id: {type: "number"}, storeId: {type: "number"}, reward: {type: "number"}, deadline: {type: "string"}, missionSpec: {type: "string"} }}
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "내가 진행 중인 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const myChallenges = await getMyChallengesService(
    parseInt(req.body.user_id),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0);

  res.status(StatusCodes.OK).success({result: myChallenges});
}

// 내가 진행 중인 미션 목록을 진행 완료로 바꾸기
export const updateChallengeToCompleteContoller = async (req, res, next) => {
  /*
    #swagger.summary = '진행 중인 미션 목록을 진행 완료로 바꾸는 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reward: { type: "number" },
              deadline: { type: "string" },
              mission_spec: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록을 진행 완료로 바꾸기 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                    id: {type: "number"},
                    user: { type: "object", properties: { id: {type: "number"}, email: {type: "string"}, name: {type: "string"}, gender: {type: "string"},
                    birthday: {type: "string"}, address: {type: "string"}, detailAddress: {type: "string"}, phoneNumber: {type: "string"} } },
                    mission: {type: "object", properties: { id: {type: "number"}, storeId: {type: "number"}, reward: {type: "number"}, deadline: {type: "string"}, missionSpec: {type: "string"} }},
                    status: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "진행 중인 미션 목록을 진행 완료로 바꾸기 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const userMissionId = parseInt(req.params.user_mission_id);
  const completeChallenge = await updateChallengeToCompleteService(userMissionId);

  res.status(StatusCodes.OK).success({result: completeChallenge});
}