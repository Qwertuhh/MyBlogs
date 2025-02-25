interface Data {
  title: string;
  content: string;
  userId: string;
  featuredImage: string;
  date: string;
  status: boolean;
  $id: string;
}
interface AuthState {
  status: boolean;
  userData: Data;
}
export { type AuthState, type Data };
