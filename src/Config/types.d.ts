export type ModelCommunicationMessage = {
    type: 'summary' | 'grammar',
    content: string
}

export type ModelCommunicationResponse = {
    status: 'success' | 'error',
    type: 'summary' | 'grammar',
    content: string
}
