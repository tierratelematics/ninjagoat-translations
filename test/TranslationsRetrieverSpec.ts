import "bluebird";
import "reflect-metadata";
import expect = require("expect.js");
import sinon = require("sinon");
import MockLanguageRetriever from "./fixtures/MockLanguageRetriever";
import MockHttpClient from "./fixtures/MockHttpClient";
import ITranslationsLoader from "../scripts/retrievers/ITranslationsLoader";
import TranslationsLoader from "../scripts/retrievers/TranslationsLoader";
import {IHttpClient} from "ninjagoat";
import SinonSpy = Sinon.SinonSpy;

describe("Given a TranslationsLoader", () => {

    let subject:ITranslationsLoader,
        httpClient:IHttpClient,
        httpSpy:SinonSpy;

    beforeEach(() => {
        httpClient = new MockHttpClient();
        httpSpy = sinon.spy(httpClient, "get");
        subject = new TranslationsLoader(httpClient, {endpoint: 'http://test'}, new MockLanguageRetriever());
    });

    afterEach(() => {
        httpSpy.restore();
    });

    context("when the labels for a specific language needs to be retrieved", () => {
        it("should retrieve the labels", (done) => {
            subject.load().then(() => {
                expect(httpSpy.calledWith("http://test/en")).to.be(true);
                done();
            });
        });
    });
});