 const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUserDataCollectionId: String(import.meta.env.VITE_APPWRITE_USER_DATA_COLLECTION_ID),
    appwriteOrderDataCollectionId: String(import.meta.env.VITE_APPWRITE_ORDER_DATA_COLLECTION_ID),
    appwriteVendorDataCollectionId: String(import.meta.env.VITE_APPWRITE_VENDOR_DATA_COLLECTION_ID),
    appwriteOutletDataCollectionId: String(import.meta.env.VITE_APPWRITE_OUTLET_DATA_COLLECTION_ID),
    appwriteProductDataCollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCT_DATA_COLLECTION_ID),
    appwriteCategoryDataCollectionId: String(import.meta.env.VITE_APPWRITE_CATEGORY_DATA_COLLECTION_ID),
    appwriteProductInfoCollectionId: String(import.meta.env.VITE_APPWRITE_PRODUCT_INFO_DATA_COLLECTION_ID),
}

export default conf