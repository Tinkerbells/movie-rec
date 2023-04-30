export type roleType = "user" | "assistant" | "system";
export type messageType = {
  role: roleType;
  content: string;
};
