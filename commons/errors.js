// 에러 메시지를 출력
const errorMsgs = {
  // USERS
  NOT_ALLOW_SNSLIST: {
    code: 400,
    message: "입력하신 유저의 SNS 리스트는 허용할 수 없습니다.",
  },
  EMPTY_SNSLIST: { code: 400, message: "snsList 를 입력해주세요." },
  EMPTY_NICKNAME: { code: 400, message: "nickname 을 입력해주세요." },
  EMPTY_USER_ID: { code: 400, message: "userId 을 입력해주세요." },
  NOT_FOUND_USER: { code: 404, message: "존재하지 않는 유저입니다." },
  NOT_FOUND_USER_ID: {
    code: 404,
    message: "존재하지 않는 유저입니다.",
  },

  // PROJECTS
  EMPTY_TITLE: { code: 400, message: "title 을 입력해주세요." },
  EMPTY_PRJ_SNS: { code: 400, message: "sns 을 입력해주세요." },
  EMPTY_PROJECT_ID: { code: 400, message: "projectId 를 입력해주세요." },

  NOT_ALLOW_SNS: (sns) => {
    return { code: 400, message: `입력하신 ${sns}는 허용할 수 없습니다.` };
  },
  NOT_FOUND_PROJECT: {
    code: 404,
    message: "조회하려는 프로젝트가 존재하지 않습니다.",
  },

  // PROJECT-REQUEST
};

export default errorMsgs;
