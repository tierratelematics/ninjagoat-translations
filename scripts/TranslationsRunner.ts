import * as Rx from "rx";
import { Dictionary } from "ninjagoat";
import { inject, injectable } from "inversify";
import ITranslationsRunner from "./ITranslationsRunner";
import ILanguageRetriever from "./retrievers/ILanguageRetriever";
import ITranslationsLoader from "./retrievers/ITranslationsLoader";

type TranslationsModel = { language: string; translations: Dictionary<string> }

@injectable()
class TranslationsRunner implements ITranslationsRunner {
    private notifications: Rx.Observable<{ language: string, translations: Dictionary<string> }>;

    constructor( @inject("ILanguageRetriever") private languageRetriever: ILanguageRetriever,
        @inject("ITranslationsLoader") private translationsLoader: ITranslationsLoader) {
        this.notifications = this.languageRetriever.retrieve()
            .flatMap(lang => this.translationsLoader.load(lang)
                .then(translations => Promise.resolve({ language: lang, translations: translations })))
            .asObservable()
            .shareReplay(1);
    }

    run(): Rx.Observable<TranslationsModel> {
        return this.notifications;
    }
}

export default TranslationsRunner;
