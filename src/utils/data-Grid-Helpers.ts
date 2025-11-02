import { OnPageChangedProps } from "@/components/data-grid"
import { initPageinationVariable, PageInfo, PaginationVariable, RefetchQueryModel } from "@/graphql/query-types"
import { GridSortModel, GridFilterModel } from "@mui/x-data-grid"

//
// -----------------------------
// Types
// -----------------------------
export type SortConfig<T> = {
  [K in keyof T]?: string[]
}

export type FilterConfig<T> = {
  [K in keyof T]?: {
    path: string[]
    transform?: (value: unknown) => unknown
  }
}

export type GridConfig<T> = {
  sort?: SortConfig<T>
  filter?: FilterConfig<T>
}


export function getRefetchModel<T extends PaginationVariable>(
  refetchModel: RefetchQueryModel<T>,
  paginationModel: OnPageChangedProps,
  pageInfo: PageInfo
): RefetchQueryModel<T>| null {
  const { page, pageSize } = paginationModel;
  const { page: currentPage, pageSize: currentSize } = refetchModel.paginationModel;

  // شروع با copy از refetchModel و initPageinationVariable
  const result: RefetchQueryModel<T> = {
    variable: { ...refetchModel.variable, ...initPageinationVariable },
    paginationModel: { ...paginationModel },
  };

  // اگر pageSize تغییر کرده → reset
  if (pageSize !== currentSize) {
    result.variable.first = pageSize;
    result.paginationModel.page = 0;
    result.paginationModel.pageSize = pageSize;
    return result;
  }
  
  // تعیین جهت پیمایش
  if (page > currentPage) {
    // پیمایش به جلو
    result.variable.after = pageInfo.endCursor;
    result.variable.first = pageSize;
    return result;
  } else if (page < currentPage) {
    // پیمایش به عقب
    result.variable.before = pageInfo.startCursor;
    result.variable.last = pageSize;
    return result;
  }

  return null;
}


//
// -----------------------------
// Helper for nested object creation
// -----------------------------
function buildNestedObject(keys: string[], value: unknown): Record<string, unknown> {
  return keys.reduceRight<Record<string, unknown>>(
    (acc, key) => ({ [key]: acc }),
    value as Record<string, unknown>
  )
}

//
// -----------------------------
// Sort Builder
// -----------------------------
export function buildSortOrder<T>(
  sortModel: GridSortModel,
  fieldPaths: SortConfig<T> = {}
): Partial<T>[] {
  return sortModel.map((model) => {
    const sort = model.sort?.toUpperCase() ?? ""
    const path = fieldPaths[model.field as keyof T]

    if (!path) {
      return { [model.field]: sort } as Partial<T>
    }

    const nested = buildNestedObject(path, sort)
    return nested as Partial<T>
  })
}

//
// -----------------------------
// Filter Builder
// -----------------------------
export function buildFilterWhere<T>(
  filterModel: GridFilterModel,
  fieldPaths: FilterConfig<T> = {},
  logic: "and" | "or" = "and"
): { and?: Partial<T>[]; or?: Partial<T>[] } {
  const filters: Partial<T>[] = []

  for (const item of filterModel.items) {
    if (!item.value) continue

    let value: unknown = item.value
    const config = fieldPaths[item.field as keyof T]

    if (config?.transform) {
      value = config.transform(value)
    } else {
      // 🔹 تبدیل‌های عمومی
      if (item.field === "row") {
        value = parseFloat(String(value))
      } else if (value === "true" || value === "false") {
        value = /true/i.test(String(value))
      }
    }

    const operatorValue = { [item.operator]: value }

    const filter = config
      ? buildNestedObject(config.path, operatorValue)
      : { [item.field]: operatorValue }

    filters.push(filter as Partial<T>)
  }

  return logic === "and" ? { and: filters } : { or: filters }
}

//
// -----------------------------
// Factory Helpers (unified)
// -----------------------------
export function createGridConfig<T>(config: GridConfig<T>) {
  return config
}

//
// -----------------------------
// Common Transforms
// -----------------------------

/**
 * 🔹 ساخت یک transform عمومی برای فیلدهای enum مانند status
 * @param map  آرایه‌ای از تاپل‌های [EnumValue, Label]
 */
export function makeStatusTransform<TEnum extends string | number>(
  map: readonly (readonly [TEnum, string])[]
) {
  return (value: unknown): TEnum | null => {
    if (typeof value !== "string") return null
    const found = map.find(([, label]) => label === value)
    return found ? found[0] : null
  }
}

/**
 * 🔹 ساخت transform عمومی برای تبدیل تاریخ
 */
export function makeDateTransform() {
  return (value: unknown) => {
    const d = new Date(String(value))
    return isNaN(d.getTime()) ? null : d.toDateString()
  }
}
