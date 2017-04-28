import { Application } from "ninjagoat";
import * as React from "react";
import LocalizedComponent from "./LocalizedComponent";

class LocalizedApplication extends Application {

    protected rootComponent(): React.ReactElement<any> {
        let superComponent = super.rootComponent();
        return (
            <LocalizedComponent> {superComponent} </LocalizedComponent>
        );
    }
}

export default LocalizedApplication;
