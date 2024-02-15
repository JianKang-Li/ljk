TS创建接口和接口类型数组，并统一导入后引用-浮生阁阁主### 在app.ts中引用
```ts
import { users, IRoute, IUser, routes } from "./data";
```
### 在index.ts中统一导入后导出
```ts
export * from "./routes";
export * from "./users";

import routes from "./routes";
import users from "./users";

export { routes, users };
```
### 在users 和routes中创建并导出接口和接口类型的数组
```ts
export interface IUser {
  id: number;
  username: string;
  auth: number[];
}

const users: IUser[] = [
  {
    id: 1,
    username: "zhangsan",
    auth: [2, 3, 6, 7],
  },
  {
    id: 2,
    username: "lisi",
    auth: [2, 3, 5, 6, 7, 8],
  },
  {
    id: 3,
    username: "wangwu",
    auth: [2, 3, 4, 5, 6, 7, 8],
  },
];

export default users;
```

```ts
export interface IRoute {
  id: number;
  pid: number;
  path: string;
  name: string;
  link?: string;
  title: string;
}

const routes: IRoute[] = [
  {
    id: 2,
    pid: 0,
    path: "/course",
    name: "Course",
    title: "课程管理",
  },
  {
    id: 3,
    pid: 2,
    path: "operate",
    name: "CourseOperate",
    link: "/course/operate",
    title: "课程操作",
  },
  {
    id: 4,
    pid: 3,
    path: "info_data",
    name: "CourseInfoData",
    link: "/course/operate/info_data",
    title: "课程数据",
  },
  {
    id: 5,
    pid: 2,
    path: "add",
    name: "CourseAdd",
    link: "/course/add",
    title: "增加课程",
  },
  {
    id: 6,
    pid: 0,
    path: "/student",
    name: "Student",
    title: "学生管理",
  },
  {
    id: 7,
    pid: 6,
    path: "/student/operate",
    name: "StudentOperate",
    link: "/student/operate",
    title: "学生操作",
  },
  {
    id: 8,
    pid: 6,
    path: "add",
    name: "StudentAdd",
    link: "/student/add",
    title: "增加学生",
  },
];

export default routes;
```