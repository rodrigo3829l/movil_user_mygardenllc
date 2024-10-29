// types.ts (o directamente en el store)
export interface State {
  token: string | null;
  expireIn: number | null;
  name: string | null;
  email: string | null;
  rol: string | null;
  image: string | null;
}
