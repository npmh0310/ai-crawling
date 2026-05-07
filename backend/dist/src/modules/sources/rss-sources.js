"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSS_SOURCES = void 0;
exports.getRssSource = getRssSource;
function rsshub(path) {
    const base = (process.env.RSSHUB_BASE_URL ?? 'https://rsshub.app').replace(/\/$/, '');
    return `${base}${path}`;
}
exports.RSS_SOURCES = [
    {
        id: 'openai',
        company: 'OpenAI',
        name: 'OpenAI News',
        urls: [rsshub('/openai/news')],
    },
    {
        id: 'anthropic',
        company: 'Anthropic',
        name: 'Anthropic News',
        urls: [rsshub('/anthropic/news')],
    },
    {
        id: 'google-deepmind',
        company: 'Google',
        name: 'Google DeepMind',
        urls: [rsshub('/deepmind/blog')],
    },
    {
        id: 'meta-ai',
        company: 'Meta',
        name: 'Meta AI Blog',
        urls: [rsshub('/meta/ai/blog')],
    },
    {
        id: 'nvidia-ai',
        company: 'NVIDIA',
        name: 'NVIDIA Blog',
        urls: ['https://feeds.feedburner.com/nvidiablog'],
    },
];
function getRssSource(sourceId) {
    return exports.RSS_SOURCES.find((source) => source.id === sourceId);
}
//# sourceMappingURL=rss-sources.js.map