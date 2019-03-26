export interface FileData {
    content: string;
    contentType: string;
    encoding?: string;
    name?: string;
    title?: string;
    postLinkId?: string;
    tags?: Array<string>;
};
