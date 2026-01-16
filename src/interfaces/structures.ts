export interface Table {
  id: number;
  key: string;
  avaiable: boolean;
}

export interface FormField {
  type: string;
  key: string;
  label: string;
  value: string | number | boolean;
  placeholder?: string;
  message?: string;
  options?:{ label: string, value: string | number }[]

  asterisk?: boolean;
  validation?: (value: any) => boolean;
  errorMessage?: string;
}

export interface User{
  id:number
  username:string
  email:string

  expiration:string // data scadenza dell'utente
  city:string
  country:string
  address:string
}