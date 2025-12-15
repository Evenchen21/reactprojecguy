export default interface Card {
  // Local json-server uses `id`, hosted API uses `_id`
  id?: string;
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  bizNumber: string;
  likes?: string[];
  isLikedCards?: boolean;
  // Local json-server uses `userId`, hosted API uses `user_id`
  userId?: string;
  user_id?: string;
}
