CREATE OR REPLACE FUNCTION get_user_chats(p_user_id uuid)
RETURNS TABLE (
  chat_id uuid,
  chat_type varchar,
  title varchar,
  photo_url varchar,
  created_at timestamptz,
  last_message_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    c.id AS chat_id,
    c.type AS chat_type,
    c.title,
    c.photo_url,
    c.created_at,
    MAX(m.created_at) AS last_message_at
  FROM chats c
  INNER JOIN chat_members cm
    ON cm.chat_id = c.id
  LEFT JOIN messages m
    ON m.chat_id = c.id
  WHERE cm.user_id = p_user_id
  GROUP BY
    c.id,
    c.type,
    c.title,
    c.photo_url,
    c.created_at
  ORDER BY
    COALESCE(MAX(m.created_at), c.created_at) DESC;
$$;