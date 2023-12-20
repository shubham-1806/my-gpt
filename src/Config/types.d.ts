export type ModelCommunicationMessage = {
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content?: string;
    query?: string;
    chat_history?: string[];
    big_model?: boolean;
    words?: number;
};

export type ModelCommunicationResponse = {
    status: 'success' | 'error';
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content: string;
};

export type LocalStorageItem = {
    name: string;
    summary: string;
    chatLists: ChatBubbleProps[];
    filepath: string;
}

interface ChatBubbleProps {
    agent: 'user' | 'bot';
    message: string;
    isUpload: boolean;
    id: string;
}