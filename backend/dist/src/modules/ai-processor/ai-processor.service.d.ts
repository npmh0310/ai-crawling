export type AiAnalysisResult = {
    category: string;
    titleVi: string;
    bodyVi: string;
    takeaways: string[];
    takeawaysVi: string[];
    tags: string[];
};
export declare class AiProcessorService {
    private readonly logger;
    private readonly model;
    analyze(title: string, content: string, company: string): Promise<AiAnalysisResult>;
}
