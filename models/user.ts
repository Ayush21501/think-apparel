export interface UserModel {
    id?: string; // Firebase will auto-generate this when adding a document
    name: string;
    email: string;
    message: string;
    imageUrl: string;
    cartItems: object;
  }