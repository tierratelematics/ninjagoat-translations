import { Dictionary } from "ninjagoat";
import { injectable, inject } from "inversify";
import ITranslationsRunner from "./ITranslationsRunner";
import ITranslationsManager from "./ITranslationsManager";

@injectable()
class TranslationsManager implements ITranslationsManager {
    private translations: Dictionary<string> = {};

    constructor( @inject("ITranslationsRunner") translationsRunner: ITranslationsRunner) {
        translationsRunner.run().subscribe(data => {
            this.translations = data.translations;
        });
    }

    translate(key: string, fallback?: string): string {
        return this.translations[key] || fallback;
    }
}

export default TranslationsManager;