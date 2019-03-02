import { ComboData } from "./ComboData";

export class ProductDetailsData{
    productDetailsId:number=0;
    costPrice:any=0.0;
    sellingPrice:any=0.0;
    quantity:number=0;
    type:string="";
    productName:string="";
    imagepath:string="";
    subCatId:number=-1;
    subIdnew:number=-1;
    categoryId:number=0;
    categoryName:string="";
    productId:number=0;
    totalQuantity:number=0;
    isActive:number=-1;
    combodata:ComboData[]=[];
    constructor(){
        this.productDetailsId=0;
        this.costPrice=0.0;
        this.sellingPrice=0.0;
        this.quantity=0;
        this.type="";
        this.productName="";
        this.imagepath="";
        this.categoryId=0;
        this.productId=0;
        this.totalQuantity=0;
        this.categoryName="";
        this.isActive=-1;
    }
}