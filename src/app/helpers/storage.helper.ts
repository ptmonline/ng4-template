export class StorageApp {

    static getStorage(isPersistent: boolean) {
        if (isPersistent == true) return localStorage
        else return sessionStorage
    }

    public static set(key: string, data: any, isPersistent?: boolean) {
        let _storage = StorageApp.getStorage(isPersistent);
        if (_storage != null) {
            try {
                if (data == null) _storage.removeItem(key);
                else {
                    if (typeof data == 'object') _storage.setItem(key, JSON.stringify(data));
                    else _storage.setItem(key, data);
                }
            } catch (e) {
                console.log("error al guradar en el storage: " + key, data);
            }
        } else {
            // todo
        }
    }

    public static get(key: string, isPersistent?: boolean) {
        let _storage = StorageApp.getStorage(isPersistent);
        if (_storage != null) {
            let valor = _storage.getItem(key);
            try {
                return JSON.parse(valor);
            } catch (e) {
                return valor;
            }
        } else {
            //todo
        }
    }

    public static remove(key: string, isPersistent?: boolean) {
        let _storage = StorageApp.getStorage(isPersistent);
        if (_storage != null) {
            _storage.removeItem(key);
        } else {
            // todo
        }
    }

    public static clear(key: string, isPersistent?: boolean) {
        let _storage = StorageApp.getStorage(isPersistent);
        if (_storage != null) {
            _storage.clear();
        } else {
            //todo
        }
    }
}
