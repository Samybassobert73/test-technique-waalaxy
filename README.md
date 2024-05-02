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

## 📚  Setup Fixtures    

```bash
cd  /test-boilerplate/apps/backend
node ./src/fixtures.ts 
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
cd test-boilerplate/apps/backend/src/services/credit.service.ts
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
cd test-boilerplate/apps/backend/src/fixtures/credit.ts
```

```ts
const MAX_VALUE = 10

```
then reload fixtures

```bash
cd  /test-boilerplate/apps/backend
node ./src/fixtures.ts 
```

### Add more credit types

modify credits fixtures

```bash
cd test-boilerplate/apps/backend/src/fixtures/credit.ts
```

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

then reload fixtures

```bash
cd  /test-boilerplate/apps/backend
node ./src/fixtures.ts 
```

### Change timers delay


```bash
cd test-boilerplate/apps/backend/src/timers/
```

file: execute-action.timer.ts

```ts
export default class ExecuteActionTimer {

	DECREMENT_CREDIT_MESSAGE:string = 'decrement-credit';
	REMOVE_ACTION_MESSAGE:string = 'remove-action';

	constructor(
		@inject(CreditService)private creditService:CreditService,
        @inject(ActionService)private actionService:ActionService,	
	){}

	init = () => {
		setInterval(() => { this.execute()}, 15 * 1000);//15s change here !!!
	}
```

file: refresh-credit.timer.ts

```ts
export default class RefreshCreditTimers {

	REFRESH_CREDIT_MESSAGE:string = 'refresh-credit';

	constructor(
		@inject(CreditService)private creditService:CreditService,
	){}

	init = () => {
		setInterval(() => { this.execute()},10 * 60 * 1000); //10min change here !!!
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


## 🙇 Author
#### Samy basso-bert
- linkedin: [@Samy Basso-Bert](https://www.linkedin.com/in/samy-basso-bert-772177176/)
- Github: [@Samybassobert73](https://github.com/Samybassobert73)
        


        
        

        
    

        