import { ServiceBase } from "./Service_Base";
import { Category } from "../model/category";
export class MerchantService extends ServiceBase{
    static getMerchant=async()=>{
    try {var merchantResp=await fetch(this.getUrl('/merchants'),{
        method:'GET',
       
    });
     if (!merchantResp.ok) {
         throw new Error(`HTTP error! Status: ${merchantResp.status}`);
       } 
    var data =await merchantResp.json();
    if (data?.data?.[0]?.logo) {
        return(data.data[0].logo);
       
    } else {
       return '';
    }
    
      
    }catch(error){
        console.error("Error fetching merchant details:", error);
        return ("null");  
      }
    }
    
    
    static   getCategory=async(): Promise<Category[]>=>{
        try {
            const catResp = await fetch(this.getUrl('/categories'), {
                method: 'GET'
            });
    
            if (!catResp.ok) {
                throw new Error(`HTTP error! Status: ${catResp.status}`);
            }
    
            const data = await catResp.json();
    
           
            if (data?.data?.length > 0) {
                console.log("catgry",data.data);
                return data.data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
        
       
         
      

    }

}