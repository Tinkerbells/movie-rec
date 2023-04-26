export type messageType = {
  role: string;
  content: string;
};

export interface MenuProps {
  messages: messageType[];
  changeMessages: (message: messageType) => void;
}
