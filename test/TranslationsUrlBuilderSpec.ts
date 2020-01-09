import expect = require("expect.js");
import {ITranslationsConfig, TranslationsUrlBuilder} from "../scripts";


describe("TranslationsUrlBuilder", () => {

    let subject: TranslationsUrlBuilder,
        config: ITranslationsConfig;

    before(() => {
        config = {endpoint: "http://test-endpoint"};
        subject = new TranslationsUrlBuilder(config);
    });

    describe("given a language", () => {

        it("should build the url to retrieve the language", () => {
            expect(subject.getUrl("test-language")).to.be("http://test-endpoint/test-language.json");
        });
    });
});
