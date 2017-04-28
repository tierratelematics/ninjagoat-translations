import { Application } from "ninjagoat";
import * as React from "react";
import LocalizedComponent from "./LocalizedComponent";
import ITranslationsRunner from "./ITranslationsRunner";

class LocalizedApplication extends Application {

    protected rootComponent(): React.ReactElement<any> {
        let superComponent = super.rootComponent(),
            translationRunner = this.container.get<ITranslationsRunner>("ITranslationsRunner");
        return (
            <LocalizedComponent translationsRunner={translationRunner}> {superComponent} </LocalizedComponent>
        );
    }
}

export default LocalizedApplication;
