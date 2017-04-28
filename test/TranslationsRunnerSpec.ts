import "reflect-metadata";
import * as Rx from "rx";
import * as TypeMoq from "typemoq";
import expect = require("expect.js");

import TranslationsRunner from "../scripts/TranslationsRunner";
import ITranslationsLoader from "../scripts/retrievers/ITranslationsLoader";
import MockLanguageRetriever from "./fixtures/MockLanguageRetriever";

describe("Given a TranslationsRunner", () => {
    let subject: TranslationsRunner;
    let languageRetriever: MockLanguageRetriever;
    let translationsLoader: TypeMoq.IMock<ITranslationsLoader>;

    let subscription: Rx.IDisposable;

    beforeEach(() => {
        languageRetriever = new MockLanguageRetriever();
        translationsLoader = TypeMoq.Mock.ofType<ITranslationsLoader>();

        translationsLoader.setup(t => t.load(TypeMoq.It.isAnyString())).returns(() => Promise.resolve({ "a": "b" }));

        subject = new TranslationsRunner(languageRetriever, translationsLoader.object);
    });

    context("when the application boot", () => {
        beforeEach(() => {
            subject.run();
        });

        it("should listen the application language changes", () => {
            expect(languageRetriever.listeners).to.be(1);
        });
    });

    context("when the application boots more then once", () => {
        it("should return the translations once", () => {
            subject.run().subscribe();
            subject.run().subscribe();
            languageRetriever.changeLanguage("en");

            translationsLoader.verify(t => t.load("en"), TypeMoq.Times.once());
        });
    });

    context("when the application language changes", () => {
        beforeEach(() => {
            subscription = subject.run().subscribe();
        });
        afterEach(() => {
            subscription.dispose();
        });

        it("should delegate to retrieve the language translations file", () => {
            languageRetriever.changeLanguage("en");
            translationsLoader.verify(t => t.load("en"), TypeMoq.Times.once());
        });

        it("should delegate to retrieve a new translations file if the language changes", () => {
            languageRetriever.changeLanguage("en");
            translationsLoader.verify(t => t.load("en"), TypeMoq.Times.once());
            languageRetriever.changeLanguage("it");

            translationsLoader.verify(t => t.load("it"), TypeMoq.Times.once());
            translationsLoader.verify(t => t.load(TypeMoq.It.isAnyString()), TypeMoq.Times.exactly(2));
        });

        it("should notify with the language and the translations file", done => {
            subject.run().subscribe(res => {
                expect(res).to.be.eql({ language: "en", translations: { "a": "b" } });
                done();
            });
            languageRetriever.changeLanguage("en");
        });
    });
});