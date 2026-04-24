export type AiAnalysisResult = {
    category: string;
    takeaways: string[];
    tags: string[];
};
export declare class AiProcessorService {
    private readonly logger;
    private readonly model;
    analyze(title: string, content: string, company: string): Promise<AiAnalysisResult>;
}
