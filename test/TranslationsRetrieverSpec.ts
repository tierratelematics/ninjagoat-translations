import "bluebird";
import "reflect-metadata";
import expect = require("expect.js");
import sinon = require("sinon");
import MockHttpClient from "./fixtures/MockHttpClient";
import ITranslationsLoader from "../scripts/retrievers/ITranslationsLoader";
import TranslationsLoader from "../scripts/retrievers/TranslationsLoader";
import {IHttpClient} from "ninjagoat";

describe("Given a TranslationsLoader", () => {

    let subject:ITranslationsLoader,
        httpClient:IHttpClient,
        httpSpy:sinon.SinonSpy;

    beforeEach(() => {
        httpClient = new MockHttpClient();
        httpSpy = sinon.spy(httpClient, "get");
        subject = new TranslationsLoader(httpClient, {endpoint: 'http://test'});
    });

    afterEach(() => {
        httpSpy.restore();
    });

    context("when the labels for a specific language needs to be retrieved", () => {
        it("should retrieve the labels", () => {
            subject.load("en");
            expect(httpSpy.calledWith("http://test/en")).to.be(true);
        });
    });
});