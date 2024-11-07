import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import CmsPagesModule from "~/store/cmsPagesModule";
import DictionaryModule from "~/store/dictionaryModule";

// eslint-disable-next-line import/no-mutable-exports
let dictionaryStore: DictionaryModule;
// eslint-disable-next-line import/no-mutable-exports
let cmsPagesStore: CmsPagesModule;

function initialiseStores(store: Store<any>): void {
	dictionaryStore = getModule(DictionaryModule, store);
	cmsPagesStore = getModule(CmsPagesModule, store);
}

export { initialiseStores, dictionaryStore, cmsPagesStore };
