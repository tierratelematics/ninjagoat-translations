import ILanguageRetriever from "../../scripts/retrievers/ILanguageRetriever";
import {Observable, Subject} from "rxjs";

class MockLanguageRetriever implements ILanguageRetriever {
    private subject: Subject<string> = new Subject<string>();

    public retrieve(): Observable<string> {
        return this.subject.asObservable();
    }

    public changeLanguage(lang: string): void {
        this.subject.next(lang);
    }
}

export default MockLanguageRetriever;
