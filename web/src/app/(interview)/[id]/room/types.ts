type BaseMessage = {
    text: string;
    sending: boolean;
};

export type UserMessage = BaseMessage & {
    role: "user";
    createdAt: Date;
    updatedAt: Date;
};

export type AssistantMessage = BaseMessage & {
    id: string;
    role: "assistant";
    required: boolean;
    audioUrl: string;
    index: number;
};

export type Message = UserMessage | AssistantMessage;