import {IKernel, IKernelModule} from "inversify";
import {IModule} from "ninjagoat";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";
import ILanguageRetriever from "./retrievers/ILanguageRetriever";
import BrowserLanguageRetriever from "./retrievers/BrowserLanguageRetriever";
import ITranslationsLoader from "./retrievers/ITranslationsLoader";
import TranslationsLoader from "./retrievers/TranslationsLoader";
import ITranslationsManager from "./ITranslationsManager";
import TranslationsManager from "./TranslationsManager";

class TranslationsModule implements IModule {

    modules:IKernelModule = (kernel:IKernel) => {
        kernel.bind<ILanguageRetriever>("ILanguageRetriever").to(BrowserLanguageRetriever).inSingletonScope();
        kernel.bind<ITranslationsLoader>("ITranslationsLoader").to(TranslationsLoader).inSingletonScope();
        kernel.bind<ITranslationsManager>("ITranslationsManager").to(TranslationsManager).inSingletonScope();
    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default TranslationsModule;
