export interface OrderModel {
    id: number;
    dateOfOrder: string; 
    status: string;
    temp: string;
    providerId: number;
    purchaserId: number;
    foodId: number;
    foodName: number;
    storageId: number;
    quantity: number;
    price: number;
    providerName: string;
    purchaserName: string;
    shelfLife: string;
}