export type ModelCommunicationMessage = {
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content: string;
};

export type ModelCommunicationResponse = {
    status: 'success' | 'error';
    type: 'summary' | 'grammar' | 'chat' | 'upload';
    content: string;
};
