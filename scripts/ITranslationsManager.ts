interface ITranslationsManager {
    translate(key: string, fallback?: string): string;
}

export default ITranslationsManager;
