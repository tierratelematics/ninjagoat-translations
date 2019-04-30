import {from, Observable, throwError} from "rxjs";
import {catchError, distinctUntilChanged, filter, flatMap, shareReplay, startWith} from "rxjs/operators";
import { Dictionary } from "ninjagoat";
import { inject, injectable } from "inversify";
import ITranslationsRunner from "./ITranslationsRunner";
import ILanguageRetriever from "./retrievers/ILanguageRetriever";
import ITranslationsLoader from "./retrievers/ITranslationsLoader";
import ITranslationsConfig from "./ITranslationsConfig";


export type TranslationsModel = { language: string; translations: Dictionary<string> }

@injectable()
class TranslationsRunner implements ITranslationsRunner {
    private notifications: Observable<TranslationsModel>;

    constructor(@inject("ILanguageRetriever") private languageRetriever: ILanguageRetriever,
                @inject("ITranslationsLoader") private translationsLoader: ITranslationsLoader,
                @inject("ITranslationsConfig") config: ITranslationsConfig) {

        this.notifications = this.languageRetriever
            .retrieve()
            .pipe(
                startWith(config.language),
                filter(language => !!language),
                distinctUntilChanged(),
                flatMap(language => this.load(language)),
                catchError(error => config.language ? this.load(config.language) : throwError(error)),
                shareReplay(1)
            );
    }

    run(): Observable<TranslationsModel> {
        return this.notifications;
    }

    private load(language: string): Observable<TranslationsModel>{
        return from(this.translationsLoader.load(language)
            .then(translations => ({ language: language, translations: translations })));
    }
}

export default TranslationsRunner;
