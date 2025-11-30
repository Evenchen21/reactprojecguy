export default interface User {
  name?: string;
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  imageLink: string;
  imageDescription: string;
  country: string;
  state: string;
  city: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  // Login related fields //
  isAdmin?: boolean;
  isBusiness?: boolean;
}
