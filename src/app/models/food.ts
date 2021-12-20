export interface FoodModel {
    id: number;
    name: string; 
    description: string;
    temp: string;
    occupiedSpace: number;
    isPacked: boolean;
}

export interface FoodInStorageModel {
    id: number;
    price: number;
    quantity: number;
    shelfLife: string; 
    food: FoodModel;
    foodId: number;
    status: string;
}