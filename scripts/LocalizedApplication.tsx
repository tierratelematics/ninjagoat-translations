import {Application} from "ninjagoat";
import * as React from "react";
import LocalizedComponent from "./LocalizedComponent";
import ITranslationsManager from "./ITranslationsManager";

class LocalizedApplication extends Application {

    protected rootComponent():React.ReactElement<any> {
        let superComponent = super.rootComponent(),
            translationsManager = this.kernel.get<ITranslationsManager>("ITranslationsManager");
        return (
            <LocalizedComponent translationsManager={translationsManager}> { superComponent } </LocalizedComponent>
        );
    }
}

export default LocalizedApplication