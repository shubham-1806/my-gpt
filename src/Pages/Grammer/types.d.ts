declare module 'diff';

interface spanTag {
    text: string;
    color: string;
    id: string;
    resolved: boolean;
}

interface changesTag {
    [key: string]: spanTag[];
}
