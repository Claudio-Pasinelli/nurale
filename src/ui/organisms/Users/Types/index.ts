export interface SettingsUser {
  email: string;
  risorsa: string | number | null | undefined;
  nome: string;
  cognome: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  id?: string;
}
