import { SendMessageInputProps } from "@/types/components/send-message-input";
import { memo, useState, FormEvent } from "react";
import { Icon } from "../Icons/Icon";

const SendMessageInput = memo(function SendMessageInput({
  onSend,
  initialMessage = "",
  disabled = false,
  placeholder = "Type a message",
  className = "",
}: SendMessageInputProps) {
  const [message, setMessage] = useState(initialMessage);

  const canSend = message.trim().length > 0 && !disabled;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!canSend) return;

    onSend(message.trim());
    setMessage(""); // Clear input after send (Messenger behavior)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 px-3 py-2 ${className}`}
    >
      {/* Text input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="
          flex-1
          rounded-full
          bg-gray-100
          px-4
          py-2.5
          text-sm
          text-gray-900
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          disabled:cursor-not-allowed
          disabled:bg-gray-200
        "
        aria-label="Message input"
      />

      {/* Send button */}
      <button
        type="submit"
        disabled={!canSend}
        className="
          flex h-9 w-9 items-center justify-center
          rounded-full
          bg-blue-600
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:bg-gray-300
        "
        aria-label="Send message"
      >
        <Icon name="SendHorizonal" />
      </button>
    </form>
  );
});

export default SendMessageInput;