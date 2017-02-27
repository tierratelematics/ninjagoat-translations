import ITranslationsManager from "./ITranslationsManager";
import {injectable, inject} from "inversify";
import ILanguageRetriever from "./retrievers/ILanguageRetriever";
import ITranslationsLoader from "./retrievers/ITranslationsLoader";
import {Dictionary} from "ninjagoat";

@injectable()
class TranslationsManager implements ITranslationsManager {

    private translations:Dictionary<string> = {};
    private language:string = null;

    constructor(@inject("ILanguageRetriever") private languageRetriever:ILanguageRetriever,
                @inject("ITranslationsLoader") private translationsLoader:ITranslationsLoader) {

    }

    load():Promise<{ language:string; translations:Dictionary<string> }> {
        return this.languageRetriever.retrieve()
            .then(language => {
                this.language = language;
                return this.translationsLoader.load(language);
            })
            .then(labels => this.translations = labels)
            .then(() => {
                return {language: this.language, translations: this.translations}
            });
    }

    translate(key:string, fallback?:string):string {
        return this.translations[key] || fallback;
    }

}

export default TranslationsManager