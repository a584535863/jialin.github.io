export class Storage {
  public static set(key: string, val: string | object) {
    localStorage.setItem(
      key,
      typeof val === "string" ? val : JSON.stringify(val)
    );
  }

  public static get<T>(
    key: string,
    isObject: boolean = false
  ): null | string | T {
    const data = localStorage.getItem(key);
    return isObject ? (JSON.parse(data) as T) : data;
  }

  public static delete(key: string) {
    localStorage.removeItem(key);
  }

  public static deleteAll() {
    localStorage.clear();
  }
}
