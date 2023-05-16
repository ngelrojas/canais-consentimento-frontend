export class LocalStorageService {
    
    public setItem(key: string, value: string): void{
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string | null{
        return localStorage.getItem(key);
    }

    public removeItem(key: string): void{
        localStorage.removeItem(key);
    }

    public clear(): void{
        localStorage.clear();
    }

}

// const localStorageService = new LocalStorageService();
// localStorageService.setItem("myKey", "myValue");
// const value = localStorageService.getItem("myKey");
// console.log(value); // "myValue"
// localStorageService.removeItem("myKey");
// localStorageService.clear();