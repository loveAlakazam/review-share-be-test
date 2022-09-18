// 에러 메시지를 출력
const errorMsgs = {
  NOT_ALLOW_SNSLIST: {
    code: 400,
    message: "Instagram 또는 NaverBlog를 입력해주세요.",
  },
  EMPTY_SNSLIST: { code: 400, message: "snsList 를 입력해주세요." },
  EMPTY_NICKNAME: { code: 400, message: "nickname 을 입력해주세요." },
  EMPTY_USER_ID: { code: 400, message: "userId 을 입력해주세요." },
  NOT_FOUND_USER: { code: 404, message: "존재하지 않는 유저입니다." },
  NOT_FOUND_USER_ID: {
    code: 404,
    message: "존재하지 않는 유저입니다.",
  },
};

export default errorMsgs;
