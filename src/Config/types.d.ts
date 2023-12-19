export type ModelCommunicationMessage = {
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content?: string;
    query?: string;
    chat_history?: string[];
    big_model?: boolean;
};

export type ModelCommunicationResponse = {
    status: 'success' | 'error';
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content: string;
};
