type VuexStoreOptions = { [key: string]: any };

type VuexStoreModule = { [key: string]: any };

type VuexStoreModuleTree = { [key: string]: VuexStoreModule };

type StoreCreator = (options: VuexStoreOptions) => any;

type StoreModule = { name: string; store: VuexStoreModule };

interface StoreDescriptor {
  modules: StoreModule[];
}

export type { VuexStoreModule, VuexStoreModuleTree, StoreCreator, StoreModule, StoreDescriptor };
