import "reflect-metadata";
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

    beforeEach(() => {
        languageRetriever = new MockLanguageRetriever();
        translationsLoader = TypeMoq.Mock.ofType<ITranslationsLoader>();

        translationsLoader.setup(t => t.load("en")).returns(() => Promise.resolve({ "a": "b" }));

        subject = new TranslationsRunner(languageRetriever, translationsLoader.object, {
            "endpoint": null
        });
    });

    context("when a default language is specified", () => {
        beforeEach(() => { 
            translationsLoader.setup(t => t.load("ja")).returns(() => Promise.resolve({ "b": "a" }));
            subject = new TranslationsRunner(languageRetriever, translationsLoader.object, {
                "endpoint": null,
                "language": "ja"
            });
        }); 

        it("should load it as first", (done) => {            
            subject.run().subscribe(res => {
                expect(res).to.be.eql({ language: "ja", translations: { "b": "a" } });
                done();
            });
        });
    });

    context("when the application language changes", () => {
        context("and that language is managed", () => {
            it("should serve the new one", (done) => {
                subject.run().subscribe(res => {
                    expect(res).to.be.eql({ language: "en", translations: { "a": "b" } });
                    done();
                });
                
                languageRetriever.changeLanguage("en");
            });
        });

        context("and that language is NOT managed", () => {
            beforeEach(() => { 
                translationsLoader.setup(t => t.load("fr")).returns(() => Promise.reject("error"));
            });

            context("if there is a default language", () => {
                beforeEach(() => { 
                    subject = new TranslationsRunner(languageRetriever, translationsLoader.object, {
                        "endpoint": null,
                        "language": "en"
                    });        
                }); 
        
                it("should serve the default one", (done) => {
                    let language = {};
                    subject.run().subscribe(res => language = res, null, () => {
                        expect(language).to.be.eql({ language: "en", translations: { "a": "b" } });
                        done();
                    });
    
                    languageRetriever.changeLanguage("fr");
                    translationsLoader.verify(t => t.load("fr"), Times.once());
                });
            })

            context("if there is NOT a default language", () => {
                it("should throw a Exception", (done) => {
                    subject.run().subscribe(res => null, (errorDescription) => {
                        expect(errorDescription).to.be.ok();
                        done();
                    });
    
                    languageRetriever.changeLanguage("fr");
                    translationsLoader.verify(t => t.load("fr"), Times.once());
                });
            });
        })
    });
});
