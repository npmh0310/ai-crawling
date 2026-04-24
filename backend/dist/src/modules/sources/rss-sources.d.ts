export type RssSource = {
    id: string;
    company: 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'xAI' | 'NVIDIA';
    name: string;
    urls: string[];
};
export declare const RSS_SOURCES: RssSource[];
export declare function getRssSource(sourceId: string): RssSource | undefined;
