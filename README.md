# Review-Share BE 과제

## 과제 프로젝트 실행방법

```
$ npm run start
```

<br>
<hr>
<br>

## Router Infomation

|      기능      |      Router      | Router URL |     Router File Path      |
| :------------: | :--------------: | :--------: | :-----------------------: |
|      User      |    userRouter    |   /user    |     /routes/users.js      |
|    Project     |  projectRouter   |    /prj    |    /routes/projects.js    |
| ProjectRequest | projectReqRouter |    /req    | /routes/projectRequest.js |

<br>
<hr>
<br>

## API Information

|         API 명         | HTTP Method |    API URL    |
| :--------------------: | :---------: | :-----------: |
| Create ProjectRequests |     PUT     |  /req/create  |
| Delete ProjectRequests |   DELETE    |  /req/delete  |
|  Read ProjectRequests  |     GET     | /req/list/:id |

<br>

#### 🔎 CreateProjectRequests 의 HTTP Method를 POST 가 아닌 **PUT** 으로 한 이유

- RESTful API 의 규칙이기 때문입니다.

- **204 No Content**: 성공 상태 응답코드는 요청이 성공했으나, 클라이언트가 현재 페이지에서 벗어나지 않아도 된다는 것을 나타냅니다.
- **204** 를 반환하는 경우 **PUT** 요청에 대한 응답으로, 사용자에게 보여지는 페이지를 바꾸지 않고 리소스를 업데이트 할때 사용합니다.
- 리소스를 생성할 경우에는 **201** Created 를 대신 반환합니다.
- 새롭게 업데이트한 페이지를 보여줘야할 경우 **200**을 사용해야됩니다.

<br>
<hr>
<br>

## 사용기술 스택

- Language: Javascript
- Server: Node.js / express
- Database: MongoDB & Mongoose
- Jest : Unit Test for TDD (Test Driven Developer)
- Deployment: Heroku

<br>
<hr>
<br>

## 코드테스트를 본 소감

Node.js 와 express 로 서버를 구축한 경험이 없었습니다.
처음에는 어떻게 해야될지 막막했고, 구글링으로도 시도해봤지만...
