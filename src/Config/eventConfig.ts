type EventConfigType = {
    SummariseEvent: string;
    GrammarCheckEvent: string;
    UploadChatDocument: string;
    ChatEvent: string;
};

export const pageToWindowEvents: EventConfigType = {
    SummariseEvent: 'summarise-send',
    GrammarCheckEvent: 'grammar-check-request-send',
    UploadChatDocument: 'upload-chat-send',
    ChatEvent: 'chat-send',
};

export const windowToPageEvents: EventConfigType = {
    SummariseEvent: 'summarise-response',
    GrammarCheckEvent: 'grammar-check-response',
    ChatEvent: 'chat-response',
    UploadChatDocument: 'NA',
};
