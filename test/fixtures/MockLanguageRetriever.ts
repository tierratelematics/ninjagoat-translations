import * as Rx from "rx";
import ILanguageRetriever from "../../scripts/retrievers/ILanguageRetriever";

class MockLanguageRetriever implements ILanguageRetriever {
    private subject: Rx.Subject<string> = new Rx.Subject<string>();

    public retrieve(): Rx.Observable<string> {
        return this.subject.asObservable();
    }

    public changeLanguage(lang: string): void {
        this.subject.onNext(lang);
    }
}

export default MockLanguageRetriever;
