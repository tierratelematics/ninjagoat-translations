import {IKernel, IKernelModule} from "inversify";
import {IModule} from "ninjagoat";
import {IViewModelRegistry} from "ninjagoat";
import {IServiceLocator} from "ninjagoat";

class TranslationsModule implements IModule {

    modules:IKernelModule = (kernel:IKernel) => {

    };

    register(registry:IViewModelRegistry, serviceLocator?:IServiceLocator, overrides?:any):void {

    }
}

export default TranslationsModule;
