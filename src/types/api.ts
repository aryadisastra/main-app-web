export type Envelope<T = unknown> = {
  result: boolean;
  data: T;
  message: string;
};

export type LoginResponse = { token: string };

export type Profile = {
  id: string;
  username: string;
  email: string;
  role_id: string;
  role_code: "admin" | "user" | "staff" | "courier";
  role_name: string;
};

export type Shipment = {
  id: string;
  tracking_number: string;
  user_id: string;
  sender_name: string; sender_address: string;
  receiver_name: string; receiver_address: string;
  item_description: string;
  status: "Created" | "Shipped" | "InTransit" | "Delivered" | "Cancelled";
};