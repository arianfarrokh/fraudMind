/**
 * BiMap<K, V>
 * 
 * یک Map دوطرفه برای نگاشت ایمن و سریع بین کلید ↔ مقدار.
 * - از Map استاندارد جاوااسکریپت استفاده می‌کند.
 * - همیشه داده‌ها را در هر دو جهت همگام نگه می‌دارد.
 */
export class BiMap<K, V> {
  private keyToValue = new Map<K, V>();
  private valueToKey = new Map<V, K>();

  constructor(entries?: readonly (readonly [K, V])[] | null) { 
    if (entries) {
      for (const [k, v] of entries) {
        this.set(k, v);
      }
    }
  }

  /** افزودن یا به‌روزرسانی مقدار */
  set(key: K, value: V): this {
    // اگر کلید یا مقدار قبلاً وجود داشته باشند، رابطه‌ی قدیمی حذف می‌شود
    if (this.keyToValue.has(key)) {
      this.valueToKey.delete(this.keyToValue.get(key)!);
    }
    if (this.valueToKey.has(value)) {
      this.keyToValue.delete(this.valueToKey.get(value)!);
    }

    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
    return this;
  }

  /** گرفتن مقدار بر اساس کلید */
  getByKey(key: K): V | undefined {
    return this.keyToValue.get(key);
  }

  /** گرفتن کلید بر اساس مقدار */
  getByValue(value: V): K | undefined {
    return this.valueToKey.get(value);
  }

  /** حذف بر اساس کلید */
  deleteByKey(key: K): boolean {
    const value = this.keyToValue.get(key);
    if (value !== undefined) {
      this.valueToKey.delete(value);
      return this.keyToValue.delete(key);
    }
    return false;
  }

  /** حذف بر اساس مقدار */
  deleteByValue(value: V): boolean {
    const key = this.valueToKey.get(value);
    if (key !== undefined) {
      this.keyToValue.delete(key);
      return this.valueToKey.delete(value);
    }
    return false;
  }

  /** تکرارگر کلیدها */
  keys(): IterableIterator<K> {
    return this.keyToValue.keys();
  }

  /** تکرارگر مقادیر */
  values(): IterableIterator<V> {
    return this.keyToValue.values();
  }

  /** گرفتن کلیدها به‌صورت آرایه */
  keysArray(): K[] {
    return [...this.keyToValue.keys()];
  }

  /** گرفتن مقادیر به‌صورت آرایه */
  valuesArray(): V[] {
    return [...this.keyToValue.values()];
  }

  /** تکرارگر کامل کلید ↔ مقدار */
  entries(): IterableIterator<[K, V]> {
    return this.keyToValue.entries();
  }

  /** تعداد آیتم‌ها */
  size(): number {
    return this.keyToValue.size;
  }

  /** پاک‌کردن کل Map */
  clear(): void {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
}
