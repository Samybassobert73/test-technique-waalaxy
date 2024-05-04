export default abstract class BaseTimer{

    constructor(){}

    init = (ms:number): void => {
		setInterval(this.execute, ms);
	}
    
    abstract execute():void 

}