export interface Chat {
  chat_id: string;
  chat_type: string;
  //title: string;
  display_name: string;
  photo_url: string | null;
  created_at: string;
  last_message_body: string;
  last_message_at: string;
}
