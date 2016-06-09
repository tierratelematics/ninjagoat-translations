import ITranslationsManager from "./ITranslationsManager";
import {injectable, inject} from "inversify";
import ILanguageRetriever from "./retrievers/ILanguageRetriever";
import ITranslationsLoader from "./retrievers/ITranslationsLoader";
import {IPromise} from "rx";
import {Dictionary} from "ninjagoat";

@injectable()
class TranslationsManager implements ITranslationsManager {

    private labels:Dictionary<string> = {};

    constructor(@inject("ILanguageRetriever") private languageRetriever:ILanguageRetriever,
                @inject("ITranslationsLoader") private translationsLoader:ITranslationsLoader) {

    }

    load():IPromise<Dictionary<string>> {
        return this.languageRetriever.retrieve().then(language => this.translationsLoader.load(language));
    }

    translate(key:string, fallback:string):string {
        return this.labels[key] || fallback;
    }

}

export default TranslationsManager