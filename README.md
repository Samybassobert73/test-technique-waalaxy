# Hello Waalaxy 👋👽🛸


# <p align="center">Technical test of the intergalactic universe</p>
  
Welcome to the intergalactic universe of our technical test, where stars twinkle and galaxies harbor unfathomable mysteries. Prepare to embark on a journey beyond the known boundaries of space, where the most advanced technologies are put to the test and only the brightest minds can thrive.

## 🧐 Features    
- Frontend 
- Backend

## 🛠️ Tech Stack
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/fr/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongodb](https://www.mongodb.com/fr-fr)
    

## 🔎 Screen Shot

![Screen shot](./waalaxyTestScreen.png)
## 🐳 Deploy Containers    

```bash
docker run -d --name mongodb-container -p 27017:27017 -v mongodb-data:/data/db mongo:latest
``` 

## 🛠️ Install Dependencies    

```bash
npm i
```

```bash
cd apps/frontend
npm i
```

## 📚  Load Fixtures    

```bash
cd  apps/backend
node ./src/fixtures.js
```

## ⚙️  Start backend    

```bash
npx nx serve backend
```
## ✅  Start frontend    

```bash
npx nx serve frontend
```

## ☢️ Start the test
```bash
 nx test backend
```


## 💁Modify parameters for test

### Change max value


- Change MAX_VALUE in Credit Service 

```bash
cd apps/backend/src/services/credit.service.ts
```

```ts
@injectable()
export default class CreditService extends BaseService{
    MAX_VALUE:number
    constructor(@inject(CreditRepository)repository: CreditRepository){
        super(repository)
        this.MAX_VALUE = 10;//change here !!!
    }

```
and change MAX_VALUE in credit fixtures

```bash
cd apps/backend/src/fixtures/credit.js
```

```ts
const MAX_VALUE = 10//change here !!!

```
⚠️WARNING : wait until all actions have been executed or delete them from the database and then reload the fixtures 

```bash
cd  apps/backend
node ./src/fixtures.js 
```

### Add more credit types

modify credits fixtures

```bash
cd apps/backend/src/fixtures/
```
file: credits.js

```ts
module.exports = [
  {
    name: 'A',
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
  {

    name: 'B',
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
  {
    name: "C",
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
  //add new credits here !!!
  {
    name: "D",
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
];

```

⚠️WARNING : wait until all actions have been executed or delete them from the database and then reload the fixtures

```bash
cd  apps/backend
node ./src/fixtures.js
```

### Change timers delay


```bash
cd apps/backend/src/timers/
```

file: index.timer.ts

```ts
export const initTimers = (): void => {
    refreshCreditTimers.init(10 * 60 * 1000); //10m change here !!!
    executeActionTimers.init(15 * 1000); //15s change here !!!
}
```

## ✏️ System design

### Why MongoDB: 

- Performance: MongoDB is designed for high performance, making it suitable for fast operations such as frequent data additions and deletions.

- Flexible data modeling: The flexible structure of NoSQL databases enables data modeling that can easily adapt to changing application needs.

- Scalability: MongoDB is designed to be scalable, which means it can handle a large number of transactions per second and can be scaled horizontally to meet growing demand.

- Ease of development: MongoDB is often praised for its simplicity of use and ease of development.

- Active community and rich documentation: MongoDB benefits from an active community and comprehensive documentation, making it easy to solve problems and learn how to use it. 

### Scaling the infrastructure : 

- Kafka:
Using Kafka as a distributed messaging system in a microservices environment will improve fault tolerance and the ability to handle large data flows. This makes it possible to build robust, scalable architectures capable of responding to increasing user growth.

- Kubernetes:
Using kubernetes allows you to orchestrate the deployment, scaling and updating of containerized applications without the need for manual intervention. Coupled with a load balancer, it guarantees high availability of deployed applications and ensures automated resource management.

- Redis:
Using Redis improves application performance, scalability and reliability. Whether for data caching, user session management, queuing or temporary data storage.

- Serverless for CRON Job - Timers:
Using Serverless allows you to automate recurring functions in clouds at specific intervals and pay only for their use, saving you money.


## 🙇 Author
#### Samy basso-bert
- linkedin: [@Samy Basso-Bert](https://www.linkedin.com/in/samy-basso-bert-772177176/)
- Github: [@Samybassobert73](https://github.com/Samybassobert73)
        


        
        

        
    

        