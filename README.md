# Review-Share BE 과제

## 과제 프로젝트 실행방법

```
$ npm run start
```

<br>
<br>

## Router Infomation

|      기능      |      Router      | Router URL |     Router File Path      |
| :------------: | :--------------: | :--------: | :-----------------------: |
|      User      |    userRouter    |   /user    |     /routes/users.js      |
|    Project     |  projectRouter   |    /prj    |    /routes/projects.js    |
| ProjectRequest | projectReqRouter |    /req    | /routes/projectRequest.js |

<br>
<br>

## API Information

### 1. ProjectRequests (Review-Share 과제 API)

|         API 명         | HTTP Method |   API URL   | Status |
| :--------------------: | :---------: | :---------: | :----: |
| Create ProjectRequests |    POST     | /req/create |   ✅   |
| Delete ProjectRequests |   DELETE    | /req/delete |   ✅   |
|  Read ProjectRequests  |     GET     |  /req/list  |   ✅   |

<br>

### 2. Users

|                  API 명                   | HTTP Method |     API URL      | Status |
| :---------------------------------------: | :---------: | :--------------: | :----: |
|              Read User By Id              |     GET     |      /user/      |   ✅   |
|              Create New User              |    POST     |   /user/create   |   ✅   |
|           Update User SNS List            |     PUT     | /user/update/sns |   ✅   |
| Update User Info <br> (nickname, snsList) |     PUT     | /user/update/:id |   ✅   |
|                Delete User                |   DELETE    | /user/delete/:id |   ✅   |

<br>

### 3. Projects

|          API 명           | HTTP Method |       API URL       | Status |
| :-----------------------: | :---------: | :-----------------: | :----: |
| Read Project By projectId |     GET     |    /project/:id     |   ✅   |
|    Create New Project     |    POST     |   /project/create   |   ✅   |
|      Update Project       |     PUT     | /project/update/:id |   ✅   |
|      Delete Project       |   DELETE    | /project/delete/:id |   ✅   |

<br><br>

## 사용기술 스택

- Language: Javascript
- Server stack: Node.js / Express
- Database: MongoDB

<br>
<br>

## 코드테스트를 본 소감

직접 부딪혀보면서, 스스로 생각해보고, 찾아보고, 고민하여, 능동적으로 개발지식을 배울 수 있는 사고력을 갖게 되었습니다.
배운 것을 응용하여 직접 작성한 코드에서 발생하는 에러를 원인을 찾고 해결해보면서 몰입할 수 있었습니다.
스스로 시도해보지 못한 개발스택을 직접 부딪히면서 배울 수 있었습니다.
과제를 풀어 봄으로써 새로운 기술스택을 스스로 익힐 수 있게되었고, 개발에 몰입할 수 있는 기회를 준 리뷰쉐어 개발팀에게 진심으로 감사를 표합니다 :)

<br>

(💌 P.S)
과제물을 확인하시면, 담당자님께서 제 코드를 리뷰해주셨으면 좋겠습니다.
코드리뷰를 통해서 제가 생각하지 못한 부분을 발견하여 효율적이고, 가독성이 좋은코드 개선하고 싶습니다.


<br>
<br>

(결과)


```
먼저 저희 리뷰쉐어 과제를 열심히 해주셔서 감사드립니다.

짧은 시간에 열심히 해주신 거 같아 더욱 감사하면서도 죄송한 마음이 듭니다.

내부 개발 팀원들과 제출하신 과제를 모두 검토한 결과, 아쉽게도 이번에는 함께 하기 어려울 것 같습니다.

깃헙에 코드 리뷰를 요청해주셨는데 지금부터 말씀드리는 것은 저희 회사 내부에서 코드 리뷰시 의견을 주는 방식으로 정답일 수는 없습니다. 
지금 저희 회사는 이런식으로 코멘트를 남긴다는 정도로만 봐주시면 될 거 같습니다.

먼저 구현하신 controller를 보시면 요청에 대한 인증, DB접근등 모든 로직이 controller 하나에 작성되어 있습니다. 저희는 이럴 때 요청에 대한 인증은 미들웨어로 따로 빼고 다음 로직들은 service로 정리하고 있습니다.

만약 만드신 함수에서 createPrjRequest가 있다면 저희 회사에서 작성하는 방식이라면 아래처럼 작성합니다.
아래 코드는 거의 의사코드 정도라고 생각해주시면 될 거 같습니다.

이렇게 작성하는 이유는 controller가 하는 역할을 다른 개발자분이나 미래의 작성한 개발자가 봤을 때 자세한 구현이 아니라 흐름을 알기 위함에 있습니다.
service로 분리했을 때 테스트 코드 작성에도 더 용이하다고 생각하고 있습니다.
개발자님께서도 controller에 주석으로 동작 순서를 설명해주셨는데 좋은 주석인 거 같습니다.
다만 createPrjRequest 3번 주석 부분(신청 시 신청메시지는 필수 입니다.)을 위쪽으로 올리는게 DB 접속에 대한 비용을 아낄 수 있을 거 같습니다.

마지막으로 작성하신 route를 보면 http method로 행위를 표현하고 있는데 API URL에도 행위가 쓰여있습니다. 만약 저희가 작성한다면 아래처럼 작성할 것 같습니다.

// 작성하신 방법
HTTP Method: DELETE
API URL: /user/delete/:id

// 리뷰쉐어 방법
HTTP Method: DELETE
API URL: /users/:id

저희가 요청한 구현보다 더 구현해주시고 깃헙에 커밋하신 것만 봐도 열심히 해주신 거 같아서 더욱 아쉽습니다.
다음에 좋은 인연으로 뵈었으면 좋겠습니다.

감사합니다.
```



2022년 9월 6일에 불합격을 받았습니다. 결과를 받을 당시에는 조금 섭섭함도 있었고, 아쉬움도 있었습니다.
불합격을 받으면서 1주일 정도 개발을 잠시 내려놨습니다. 

아무것도 안한채 가만히 방황을 했습니다. 아무것도 안하니까 아무런 결실이 없었습니다.
제 자신이 아무런 성장없이 시간을 보내는게 더더욱 괴로웠습니다. 다시 일어서고싶은 마음도 있지만 몸이 생각보다 잘 따르지 않았습니다.
제가 이렇게 자신감을 잃는다고 계속 이렇게 있다하더라도 결과는 변하지 않으니까...

불합격한 것은 씁쓸했지만, 그래도 피드백을 받은 것을 바탕으로 고쳐보기로 했습니다.

그리고 앞으로 어떻게 해야될지 계획을 세우기로 했습니다.

다시 메일을 읽어보니까, 제가 컨트롤러와 미들웨어가 어떤 로직으로 작성해야되는지를 몰랐음을 의미했고
기업마다 코드가 다르지만, 처음으로 Node.JS와 Express를 활용하여 로컬서버를 구축해본 저에게는 도움이 되었습니다.

컨트롤러의 역할과 서비스로직의 역할, 어떻게 서비스를 불러오는지 등도 그랬고
URL 표기에서도 행위를 드러내면 안되는구나 라는 작은 깨달음을 얻었습니다.

- 고쳐야할 부분 

|          API 명           | HTTP Method |       API URL       | Status |
| :-----------------------: | :---------: | :-----------------: | :----: |
| Read Project By projectId |     GET     |    /project/:id     |   ✅   |
|    Create New Project     |    POST     |   /project/create   |   ✅   |
|      Update Project       |     PUT     | /project/update/:id |   ✅   |
|      Delete Project       |   DELETE    | /project/delete/:id |   ✅   |


<br><br>

- 도전하고 싶은 부분

|          API 명           | HTTP Method |       API URL       | Status |
| :-----------------------: | :---------: | :-----------------: | :----: |
| Read Project By projectId |     GET     |    /project/:id     |   ✅   |
|    Create New Project     |    POST     |   /project/create   |   ✅   |
|      Update Project       |     PUT     | /project/update/:id |   ✅   |
|      Delete Project       |   DELETE    | /project/delete/:id |   ✅   |


