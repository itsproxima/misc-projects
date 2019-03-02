
export class UserModel{
    userId:number;
    name:string;
    emailId:string;
    mobileNumber:string;
    createdDate:string;
    storeKey:string;
    address:string;
    isPaymentDone:number;
    isShopOpen:number;
    timing:string;
    constructor(){
        this.userId=0;
        this.name=null;
        this.emailId=null;
        this.mobileNumber=null;
        this.createdDate=null;
        this.storeKey=null;
        this.address=null;
        this.isPaymentDone=-1;
        this.isShopOpen=-1;
        this.timing=null;
    }
}