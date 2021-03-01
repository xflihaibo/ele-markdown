// const Store = window.require('electron-store');

class EleStore {
    constructor(bool) {
        this.store = new global.Store();
        this.watch = bool || false;
    }
    getPath() {
        return this.store.path;
    }
    getSize() {
        return this.store.size;
    }
    getClear() {
        return this.store.clear();
    }
    setItem(name, val) {
        this.watch && this.watchfn(name);
        const value = typeof val === 'object' ? JSON.stringify(val) : val;
        this.store.set(name, value);
        return this.store.has(name);
    }
    getItem(name) {
        return this.store.get(name);
    }
    deleteItem(name) {
        this.store.delete(name);
        return !this.store.has(name);
    }
    watchfn(name) {
        this.store.onDidChange(name, e => {
            console.log('⌚️', e);
        });
    }
}

export default EleStore;

// const eleStore = new EleStore(false);
// console.log(eleStore.getItem());
// console.log(eleStore.getPath());
