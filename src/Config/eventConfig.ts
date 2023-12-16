type EventConfigType = {
    SummariseEvent: string;
    GrammarCheckEvent: string;
};

export const pageToWindowEvents: EventConfigType = {
    SummariseEvent: "summarise-send",
    GrammarCheckEvent: "grammar-check-request-send",
};

//events from window to pages

export const windowToPageEvents: EventConfigType = {
    SummariseEvent: "summarise-response",
    GrammarCheckEvent: "grammar-check-response",
};
