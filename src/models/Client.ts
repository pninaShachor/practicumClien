import Child from "./Child";

export default class Client{
    constructor(public id:number,
        public FName:string,
        public LName:string,
        public IdentityN:string,
        public BornDate:Date,
        public MorF:string,
        public HMO:string,
        public Children:Child[]){
    }
}
