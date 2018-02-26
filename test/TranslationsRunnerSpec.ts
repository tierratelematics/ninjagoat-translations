import "reflect-metadata";
import * as Rx from "rx";
import { Times } from "typemoq";
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

        subject = new TranslationsRunner(languageRetriever, translationsLoader.object, {
            "endpoint": null
        });
    });

    context("when a default language is specified", () => {
        it("should load that language", () => {
            subject = new TranslationsRunner(languageRetriever, translationsLoader.object, {
                "endpoint": null,
                "language": "ja"
            });
            subject.run().subscribe();

            translationsLoader.verify(t => t.load("ja"), Times.once());
        });
    });

    context("when the application boots more then once", () => {
        it("should return the translations once", () => {
            subject.run().subscribe();
            subject.run().subscribe();
            languageRetriever.changeLanguage("en");

            translationsLoader.verify(t => t.load("en"), Times.once());
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
            translationsLoader.verify(t => t.load("en"), Times.once());
        });

        it("should delegate to retrieve a new translations file if the language changes", () => {
            languageRetriever.changeLanguage("en");
            translationsLoader.verify(t => t.load("en"), Times.once());
            languageRetriever.changeLanguage("it");

            translationsLoader.verify(t => t.load("it"), Times.once());
            translationsLoader.verify(t => t.load(TypeMoq.It.isAnyString()), Times.exactly(2));
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