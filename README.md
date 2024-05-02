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
node ./src/index.ts 
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


- Change Max value in Credit Service
```ts
@injectable()
export default class CreditService extends BaseService{
    MAX_VALUE:number
    constructor(@inject(CreditRepository)repository: CreditRepository){
        super(repository)
        this.MAX_VALUE = 10;
    }

```

- Add more action Types

modify /test-boilerplate/apps/backend/src/fixtures/types.ts
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
  {
    name: "D",
    createdAt: new Date() ,
    updatedAt: new Date(),
    __v: 0
  },
];

```

run again the fixtures
```bash
cd  /test-boilerplate/apps/backend
node ./src/index.ts 
```


- Change timers delay
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
        


        
        
        








## 🙇 Author
#### Samy basso-bert
- linkedin: [@Samy Basso-Bert](https://www.linkedin.com/in/samy-basso-bert-772177176/)
- Github: [@Samybassobert73](https://github.com/Samybassobert73)
        


        
        

        
    

        