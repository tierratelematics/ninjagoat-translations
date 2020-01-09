import "bluebird";
import "reflect-metadata";
import expect = require("expect.js");
import sinon = require("sinon");
import * as Typemoq from "typemoq";
import MockHttpClient from "./fixtures/MockHttpClient";
import ITranslationsLoader from "../scripts/retrievers/ITranslationsLoader";
import TranslationsLoader from "../scripts/retrievers/TranslationsLoader";
import {IHttpClient} from "ninjagoat";
import {ITranslationsUrlBuilder} from "../scripts";

describe("Given a TranslationsLoader", () => {

    let subject:ITranslationsLoader,
        httpClient:IHttpClient,
        httpSpy:sinon.SinonSpy,
        translationsUrlBuilder: Typemoq.IMock<ITranslationsUrlBuilder>;

    beforeEach(() => {
        httpClient = new MockHttpClient();
        httpSpy = sinon.spy(httpClient, "get");
        translationsUrlBuilder = Typemoq.Mock.ofType<ITranslationsUrlBuilder>();
        translationsUrlBuilder.setup(tub => tub.getUrl(Typemoq.It.isValue("en"))).returns(x => "http://test/en.json");
        subject = new TranslationsLoader(httpClient, translationsUrlBuilder.object);
    });

    afterEach(() => {
        httpSpy.restore();
    });

    context("when the labels for a specific language needs to be retrieved", () => {
        it("should retrieve the labels", () => {
            subject.load("en");
            translationsUrlBuilder.verify(tub => tub.getUrl(Typemoq.It.isValue("en")), Typemoq.Times.once());
            expect(httpSpy.calledWith("http://test/en.json")).to.be(true);
        });
    });
});
