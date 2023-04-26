import { messageType } from "@/types/message";
import { create } from "zustand";

interface IMessageStore {
  messages: messageType[];
  setMessages: (messages: messageType[]) => void;
}

export const useMessageStore = create<IMessageStore>((set) => ({
  messages: [],
  setMessages: (messages: messageType[]) => set({ messages: messages }),
}));
