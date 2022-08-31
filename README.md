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

|         API 명         | HTTP Method |    API URL    | Status |
| :--------------------: | :---------: | :-----------: | :----: |
| Create ProjectRequests |    POST     |  /req/create  |   ✅   |
| Delete ProjectRequests |   DELETE    |  /req/delete  |        |
|  Read ProjectRequests  |     GET     | /req/list/:id |        |

<br>

### 2. Users

|                  API 명                   | HTTP Method |     API URL      | Status |
| :---------------------------------------: | :---------: | :--------------: | :----: |
|              Read User By Id              |     GET     |      /user/      |   ✅   |
|              Create New User              |    POST     |   /user/create   |   ✅   |
|           Update User SNS List            |     PUT     | /user/update/sns |   ✅   |
| Update User Info <br> (nickname, snsList) |     PUT     | /user/update/:id |   ✅   |
|                Delete User                |   DELETE    | /user/delete/:id |        |

<br>

### 3. Projects

|          API 명           | HTTP Method |       API URL       | Status |
| :-----------------------: | :---------: | :-----------------: | :----: |
| Read Project By projectId |     GET     |    /project/:id     |   ✅   |
|    Create New Project     |    POST     |   /project/create   |   ✅   |
|      Update Project       |     PUT     | /project/update/:id |   ✅   |
|      Delete Project       |   DELETE    | /project/delete/:id |   ✅   |

<br>
<br>

## 사용기술 스택

- Language: Javascript
- Server stack: Node.js / Express
- Database: MongoDB
- Unit Test for TDD (Test Driven Developer): Jest

<br>
<br>

## 코드테스트를 본 소감

그동안의 저는 Node.js 와 express 로 서버를 구축한 경험이 없습니다.
과제를 받을 당시 처음에는 어떻게 해야될지 막막했고, 구글링과 Youtube 를 참고하면서 다른사람의 코드를 이해하고 배운것을 적용하는 단계를 차근차근 진행 했습니다.
Node.js와 express, MongoDB 사용법을 스스로 익히면서
직접 부딪혀보면서, 스스로 생각해보고, 찾아보고, 고민하여, 능동적으로 개발지식을 배울 수 있는 사고력을 갖게 되었습니다.

MongoDB 또한 2021년 이후에는 사용해보지 않아서 까먹은 상태였고, Mongoose는 처음 접해봤습니다.
Mongoose, MongoDB 공식 다큐먼트(영어)를 읽고 이해하여 배운지식을 과제에 응용할 수 있었습니다.

배운 것을 응용하여 직접 작성한 코드에서 발생하는 에러를 원인을 찾고 해결해보면서 몰입할 수 있었습니다.
지금 되돌아보면, '리뷰쉐어 테스트를 보기 이전의 저는 Node.js를 어렵다고, 시도해보지도 못한채 어렵다는 이유로 단정짓고 피한거였구나.' 라는 생각이 들었습니다.

또한 이전 직장에서 로컬통신테스트와 TDD 를 경험한 것을 활용하여
직접 통신테스트를 하면서 단순히 실행결과에서 만족하지 않고 insomnia HTTP 통신 테스트를 시도해보면서
예외케이스를 찾아보며, 꼼꼼히 테스트를 하여 에러 리스폰스를 전달하는 에러핸들링을 했습니다.

request.params 과 request.query 의 차이를 알았습니다.
request.params 의 경우에는 URL에 표기된 파라미터의 값을 파싱하여 해당 값을 요청하는 것이고
request.query의 경우에는 GET방식에서 파라미터를 전달하여 요청하는 방식임을 알게되었습니다.

또한 과제에서 요구하지 않더라도 스스로 API를 직접 만들거나
Javascript에서의 TDD 모듈인 Jest의 공식다큐먼트를 읽고 과제물에 적용해보는 새로운 시도를 했습니다.

스스로 시도해보지 못한 개발스택을 직접 부딪히면서 배울 수 있었습니다.
과제를 풀어 봄으로써 개발에 몰입할 수 있는 기회를 준 리뷰쉐어 개발팀에게 진심으로 감사를 표합니다 :)

<br>

(💌 P.S)
과제물을 확인하시면, 담당자님께서 제 코드를 리뷰해주셨으면 좋겠습니다.
코드리뷰를 통해서 제가 생각하지 못한 부분을 발견하여 가독성이 좋은코드로 개선하고 싶습니다.
