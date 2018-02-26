import * as React from "react";
import ITranslationsRunner from "./ITranslationsRunner";
import { Dictionary } from "ninjagoat";
import { IntlProvider } from "react-intl";
import { lazyInject } from "ninjagoat";
import { Disposable } from "rx";

class LocalizedComponent extends React.Component<{}, { language: string; translations: Dictionary<string> }> {

    @lazyInject("ITranslationsRunner")
    private translationsRunner: ITranslationsRunner;
    private subscription: Disposable;

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
            this.subscription.dispose();
            this.subscription = null;
        }
    }
}

export default LocalizedComponent;
