

export interface SendMessageInputProps {
    onSend: (message: string) => void;
    initialMessage?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}