import ILanguageRetriever from "../../scripts/retrievers/ILanguageRetriever";
import * as Promise from "bluebird";

class MockLanguageRetriever implements ILanguageRetriever {
    
    retrieve():Rx.IPromise<string> {
        return Promise.resolve("en");
    }

}

export default MockLanguageRetriever