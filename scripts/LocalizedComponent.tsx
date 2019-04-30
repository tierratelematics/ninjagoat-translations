import * as React from "react";
import ITranslationsRunner from "./ITranslationsRunner";
import { Dictionary } from "ninjagoat";
import { IntlProvider } from "react-intl";
import { lazyInject } from "ninjagoat";
import {Subscription} from "rxjs";

class LocalizedComponent extends React.Component<{}, { language: string; translations: Dictionary<string> }> {

    @lazyInject("ITranslationsRunner")
    private translationsRunner: ITranslationsRunner;
    private subscription: Subscription;

    constructor(props: {}) {
        super(props);
        this.state = {
            translations: null,
            language: "en"
        };
    }

    componentWillMount() {
        this.subscription = this.translationsRunner.run().subscribe(translations => this.setState(translations));
    }

    render() {
        if (this.state.translations) {
            let children = React.Children.toArray(this.props.children);
            let child = children[1] || children[0];
            return (
                <IntlProvider locale="en" messages={this.state.translations} key={this.state.language}>
                    {child}
                </IntlProvider>
            );
        }
        return <div></div>;
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}

export default LocalizedComponent;
