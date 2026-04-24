"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSS_SOURCES = void 0;
exports.getRssSource = getRssSource;
exports.RSS_SOURCES = [
    {
        id: 'openai',
        company: 'OpenAI',
        name: 'OpenAI News',
        urls: [
            'https://openai.com/news/rss.xml',
        ],
    },
    {
        id: 'anthropic',
        company: 'Anthropic',
        name: 'Anthropic News',
        urls: [
            'https://www.anthropic.com/news/rss.xml'
        ],
    },
    {
        id: 'google-deepmind',
        company: 'Google',
        name: 'Google DeepMind',
        urls: [
            'https://deepmind.google/blog/rss.xml',
            'https://blog.google/technology/ai/rss/'
        ],
    },
    {
        id: 'meta-ai',
        company: 'Meta',
        name: 'Meta AI Blog',
        urls: [
            'https://ai.meta.com/blog/rss/',
        ],
    },
    {
        id: 'xai',
        company: 'xAI',
        name: 'xAI Blog',
        urls: [
            'https://x.ai/blog/rss.xml',
        ],
    },
    {
        id: 'nvidia-ai',
        company: 'NVIDIA',
        name: 'Nvidia AI Blog',
        urls: ['https://blogs.nvidia.com/blog/category/ai/feed/'],
    }
];
function getRssSource(sourceId) {
    return exports.RSS_SOURCES.find((source) => source.id === sourceId);
}
//# sourceMappingURL=rss-sources.js.map