
export class OrderDetailsById{
    cartDetailsId:number;
    isActive:number;
    amount:any;
    quantity:number;
    productName:string;
    imagepath:string;
    type:string;
    quantityType:string;
    constructor(){
        this.cartDetailsId=0;
        this.isActive=-1;
        this.amount=0.0;
        this.quantity=0;
        this.productName=null;
        this.imagepath=null;
        this.type=null;
        this.quantityType=null;
    }
}