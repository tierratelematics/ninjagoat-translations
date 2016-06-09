import {Application} from "ninjagoat";
import * as React from "react";
import {IntlProvider} from "react-intl";

class LocalizedApplication extends Application {

    protected rootComponent():React.ReactElement<any> {
        let superComponent = super.rootComponent();
        return <IntlProvider locale="en">{superComponent}</IntlProvider>;
    }
}

export default LocalizedApplication