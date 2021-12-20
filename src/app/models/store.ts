import { CellModel } from "./cell";
import { FoodInStorageModel, FoodModel } from "./food";
import { OrderModel } from "./order";

export interface StoreModel {
    id: number;
    name: string;
    location: string;
    roleId: number;
    cellList: CellModel[];
    price: number;
    userId: number;
    providerId: number;
    storageList: StorageModel[];
    orderList: OrderModel[];
    food: FoodModel;
}

export interface StorageModel {
    id: number;
    name: string;
    description: string;
    temp: string;
    capacity: number;
    foodInStorageModelList: FoodInStorageModel[];
    fullness: number;
    tempId: number;
    storeId: number;
    orderList: OrderModel[];
}



