export interface Address {
  street: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface NewUser {
  name: string;
  email: string;
  username?: string;
  phone?: string;
  website?: string;
  company?: Partial<Company>;
  address?: Partial<Address>;
}
