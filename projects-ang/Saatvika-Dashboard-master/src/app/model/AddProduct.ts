import { ComboData } from "./ComboData";

export class AddProduct{
    productId:number=0;
    productDetailsId:number=0;
    sellingPrice:any;
    categoryId = 0;
    subcategoryId=0;
    productName:string="";
    quantity:string="";
    type:string="";
    combodata:ComboData[]=[];
}