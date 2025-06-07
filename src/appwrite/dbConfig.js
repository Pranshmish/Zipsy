import conf from "../config/conf.js";
import { Account, Client, Databases,ID, Query } from "appwrite";



class Database{
    client = new Client();
    databases;
    account;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.account=new Account(this.client);
        
    }
/*
इरादे कहते हैं, अभी और चलना है,
दिल कहता है, अब बस, थोड़ा रुकना है।
थकन से बोझिल हैं ये आँखों के पर्दे,
मगर मंज़िल की लौ अब भी जलना है।

हवा कहती है, कुछ पल सुस्ता ले,
मगर जुनून कहे, ये वक़्त ना गँवा दे।
नींद बहलाए, मीठे सपनों के बहाने,
मगर हकीकत कहे, ख्वाबों को सच बना ले।
*/
    async placeOrder({userID,outletID,productData,totalAmount, productQuantity,
        deliveryAddress,platformFee}){
        try {
            const response= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteOrderDataCollectionId,
                ID.unique(),
                {
                    userID:userID,      
                    outletID:outletID,             
                    productData:productData,
                    totalAmount:totalAmount,
                    productQuantity:productQuantity,
                    deliveryAddress:deliveryAddress,
                    isFulfilled:null,
                    isConfirmed:null,
                    isOutForDelivery:null,
                    platformFee:platformFee
                }
            )
            return response.$id
        } catch (error) {
            console.log("Appwrite service :: placeOrder :: error", error);
        }
    }

    async orderFulfilled(orderID,status){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteOrderDataCollectionId,
                orderID,
                {                   
                    isFulfilled:status
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: orderFulfilled :: error", error);
        }
    }

    async setUserCredentials({userID,name,mobileNumber,address}){
        try {
            const response=await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserDataCollectionId,     
                userID,
                 {
                    name:name,
                    mobile_number:mobileNumber,
                    default_address:address             

                 }
            )
            return response.$id
        } catch (error) {
            console.log("Appwrite service :: setUserCredentials :: error", error);
        }
    }
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////          QUERY FUNCTION           ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
    
    async getUserData(userId){
        try {
            const response=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOutletDataCollectionId,
                [
                    Query.equal("$id",userId),
                ]           
            )
            if(response.documents.length>0){
                const { $id, name, mobile_number, email, orderHistory, default_address } = response.documents[0];
                const data={
                    id:$id,
                    name:name,
                    mobile_number:mobile_number,
                    email:email,
                    orderHistory:orderHistory,
                    default_address:default_address
                }
                return data;
            }else{
                console.log(`Appwrite Service :: getUserData :: document with ${userId} not found`)
                return ;
            }   
        } catch (error) {
            console.log("Appwrite service :: getUserData by UserId :: error :--", error);   
            return;
        }
    }

    async getVendorData(vendorId){
        try {
            const response=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOutletDataCollectionId,
                [
                    Query.equal("$id",vendorId),
                ]           
            )
            if(response.documents.length>0){
                const { $id, name, email, outletID,outletTiming,isOutletOpen } = response.documents[0];
                const data={
                    id:$id,
                    name:name,
                    outletId:outletID,
                    email:email,
                    outletTiming:outletTiming,
                    isOutletOpen:isOutletOpen
                }
                return data;
            }else{
                console.log(`Appwrite Service :: getUserData :: document with ${vendorId} not found`)
                return ;
            }   
        } catch (error) {
            console.log("Appwrite service :: getVendorData by vendorId :: error :--", error);   
            return;
        }
    }

    async getCurrentOrderDataByOutletId(vendorOutletId){
        try {
            const response = await this.databases.listDocuments(conf.appwriteOrderDataCollectionId, [
                Query.equal("outletId", vendorOutletId),
                Query.equal("isFulfilled", null)
            ]);
    
            return response.documents.map((doc) => ({
                id: doc.$id,     // Extracting only required fields
                userId: doc.userId,
                outletId: doc.outletId,
                totalAmount:doc.totalAmount,
                deliveryAddress:doc.deliveryAddress,
                orderedQuantity:doc.productQuantity,
                orderedData:doc.productData,
                platformFee:doc.platformFee,
                isFulfilled:doc.isFulfilled,
                isConfirmed:doc.isConfirmed,
                isOutForDelivery:doc.isOutForDelivery
              })); // Returns an array of matching documents
        } catch (error) {
            console.error("Error fetching currentOrderData:", error);
            return [];
        }
    }


    async doesUserExist(userId) {        
        try {
          const response = await this.databases.getDocument(
            conf.appwriteDatabaseId, // Replace with your actual database ID
            conf.appwriteUserDataCollectionId,         // Collection ID
            userId              // Document ID (same as userId)
          );
          console.log("User exists:", response);
          return true;  // If the document is found, return true
        } catch (error) {
          if (error.code === 404) {
            console.log("User does not exist");
            return false;  // If not found, return false
          }
          console.error("Error fetching user data:", error);
          return false;
        }
    };

    async doesVendorExist(email){
        try {
            const response = await this.databases.listDocuments(conf.appwriteVendorDataCollectionId, [
                database.query.equal("email", email)
            ]);
    
            return response.documents.length > 0;
        } catch (error) {
            console.error("Error checking vendor email:", error);
            return ;
        }
    }



    





///////////////////////////////////////////////////////////////////////////////////////
///////////////////////          GETTER FUNCTION           ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

    

    async getOrderData(){
        try{
            const response = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteOrderDataCollectionId);
            return response.documents.map((doc) => ({
                id: doc.$id,   
                totalAmount: doc.totalAmount,
                productQuantity: doc.productQuantity,
                productData:doc.productData,
                isFulfilled:doc.isFulfilled,
                platformFee:doc.platformFee,
                userId:doc.userID,
                outletId:doc.outletID,
                deliveryAddress:doc.deliveryAddress,
                isConfirmed:doc.isConfirmed,
                isOutForDelivery:doc.isOutForDelivery
              }));
        }catch(error){
            console.log("Appwrite serive :: getOrders :: error", error);
            return ;
        }
    }

    async getOutletData(){
        try {
            const response=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteOutletDataCollectionId           
            )
            return response.documents.map((doc) => ({
                id: doc.$id,     // Extracting only required fields
                name: doc.outletName,
                image: doc.outletImage
              }));
        } catch (error) {
            console.log("Appwrite serive :: getOutletData :: error", error);
            return ;
        }
    }

    async hasOrderBeenConfirmed(orderId){
        try {
            const response = await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteOrderDataCollectionId, orderId); 
            return response.isConfirmed;
        } catch (error) {
            console.log("Appwrite service :: hasOrderBeenConfirmed :: error", error);
            
        }
    }

    async getCategoryData(){        
            try {
              const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCategoryDataCollectionId
              );
              return response.documents.map((doc) => ({
                id: doc.$id,     // Extracting only required fields
                name: doc.name,
                image: doc.image
              }));
            } catch (error) {
              console.error("Appwrite Service ::getCategoryData :: Error", error);
              return ;
            }                  
    } 

    async getProductInfo(){
        try {
            const response = await this.databases.listDocuments(
              conf.appwriteDatabaseId,
              conf.appwriteProductInfoCollectionId,              
            );
                // Map response to extract required fields
            return response.documents.map((doc) => ({
                id: doc.$id,               // ProductInfo ID
                isAvailable: doc.isAvailable,
                totalSale: doc.totalSale,
                todaySale:doc.todaySale,                
                productName:doc.productName,
                productId:doc.productId
            }));
          } catch (error) {
            console.error("Appwrite Service ::getProductInfo :: Error", error);
            return ;
          }     
     }

    async getProductData(){
        try{
            const response=await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProductDataCollectionId,
            )
            return response.documents.map((doc) => ({
                id: doc.$id,               // ProductInfo ID
                name: doc.name,
                image: doc.image[0],
                price:doc.price,
                unit:doc.unit,
                description:doc.description,
                categoryId:doc.categoryId,
                outletId:doc.outletId,
                productInfoId:doc.productaInfoId
            }));
        }catch(error){
            console.log("Appwrite Service ::getProductData :: Error",error)
            return ;
        }
    }
   

    
}


const database = new Database()


export default database