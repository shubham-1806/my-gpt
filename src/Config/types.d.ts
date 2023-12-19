export type ModelCommunicationMessage = {
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content?: string;
    query?: string;
    chat_history?: string[];
};

export type ModelCommunicationResponse = {
    status: 'success' | 'error';
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content: string;
};
