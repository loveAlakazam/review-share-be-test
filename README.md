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
