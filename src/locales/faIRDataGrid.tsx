import { GridLocaleText } from "@mui/x-data-grid";

export const faIRDataGrid: Partial<GridLocaleText> = {
  // Root
  noRowsLabel: "بدون سطر",
  noResultsOverlayLabel: "نتیجه‌ای پیدا نشد.",
  noColumnsOverlayLabel: "ستونی وجود ندارد",
  noColumnsOverlayManageColumns: "مدیریت ستون‌ها",
  emptyPivotOverlayLabel: "برای ساخت جدول محوری، فیلدها را به ردیف‌ها، ستون‌ها و مقادیر اضافه کنید",

  // Density selector toolbar button text
  toolbarDensity: "تراکم",
  toolbarDensityLabel: "تراکم",
  toolbarDensityCompact: "فشرده",
  toolbarDensityStandard: "استاندارد",
  toolbarDensityComfortable: "راحت",

  // Columns selector toolbar button text
  toolbarColumns: "ستون‌ها",
  toolbarColumnsLabel: "انتخاب ستون‌ها",

  // Filters toolbar button text
  toolbarFilters: "فیلترها",
  toolbarFiltersLabel: "نمایش فیلترها",
  toolbarFiltersTooltipHide: "مخفی کردن فیلترها",
  toolbarFiltersTooltipShow: "نمایش فیلترها",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: "جستجو…",
  toolbarQuickFilterLabel: "جستجو",
  toolbarQuickFilterDeleteIconLabel: "پاک کردن",

  // Export selector toolbar button text
  toolbarExport: "خروجی",
  toolbarExportLabel: "خروجی",
  toolbarExportCSV: "دانلود CSV",
  toolbarExportPrint: "چاپ",
  toolbarExportExcel: "دانلود اکسل",

  // Toolbar pivot button
  toolbarPivot: "محوری",

  // Toolbar AI Assistant button
  toolbarAssistant: "دستیار هوش مصنوعی",

  // Columns management text
  columnsManagementSearchTitle: "جستجو",
  columnsManagementNoColumns: "بدون ستون",
  columnsManagementShowHideAllText: "نمایش/مخفی کردن همه",
  columnsManagementReset: "بازنشانی",
  columnsManagementDeleteIconLabel: "پاک کردن",

  // Filter panel text
  filterPanelAddFilter: "افزودن فیلتر",
  filterPanelRemoveAll: "حذف همه",
  filterPanelDeleteIconLabel: "حذف",
  filterPanelLogicOperator: "عملگر منطقی",
  filterPanelOperator: "عملگر",
  filterPanelOperatorAnd: "و",
  filterPanelOperatorOr: "یا",
  filterPanelColumns: "ستون‌ها",
  filterPanelInputLabel: "مقدار",
  filterPanelInputPlaceholder: "مقدار فیلتر",

  // Filter operators text
  filterOperatorContains: "شامل",
  filterOperatorDoesNotContain: "شامل نمی‌شود",
  filterOperatorEquals: "مساوی",
  filterOperatorDoesNotEqual: "نامساوی",
  filterOperatorStartsWith: "شروع با",
  filterOperatorEndsWith: "پایان با",
  filterOperatorIs: "هست",
  filterOperatorNot: "نیست",
  filterOperatorAfter: "بعد از",
  filterOperatorOnOrAfter: "برابر یا بعد از",
  filterOperatorBefore: "قبل از",
  filterOperatorOnOrBefore: "برابر یا قبل از",
  filterOperatorIsEmpty: "خالی است",
  filterOperatorIsNotEmpty: "خالی نیست",
  filterOperatorIsAnyOf: "یکی از",
  "filterOperator=": "=",
  "filterOperator!=": "!=",
  "filterOperator>": ">",
  "filterOperator>=": ">=",
  "filterOperator<": "<",
  "filterOperator<=": "<=",

  // Header filter operators text
  headerFilterOperatorContains: "شامل",
  headerFilterOperatorDoesNotContain: "شامل نمی‌شود",
  headerFilterOperatorEquals: "مساوی",
  headerFilterOperatorDoesNotEqual: "نامساوی",
  headerFilterOperatorStartsWith: "شروع با",
  headerFilterOperatorEndsWith: "پایان با",
  headerFilterOperatorIs: "هست",
  headerFilterOperatorNot: "نیست",
  headerFilterOperatorAfter: "بعد از",
  headerFilterOperatorOnOrAfter: "برابر یا بعد از",
  headerFilterOperatorBefore: "قبل از",
  headerFilterOperatorOnOrBefore: "برابر یا قبل از",
  headerFilterOperatorIsEmpty: "خالی است",
  headerFilterOperatorIsNotEmpty: "خالی نیست",
  headerFilterOperatorIsAnyOf: "یکی از",
  "headerFilterOperator=": "مساوی",
  "headerFilterOperator!=": "نامساوی",
  "headerFilterOperator>": "بزرگتر",
  "headerFilterOperator>=": "بزرگتر یا مساوی",
  "headerFilterOperator<": "کوچکتر",
  "headerFilterOperator<=": "کوچکتر یا مساوی",
  headerFilterClear: "پاک کردن فیلتر",

  // Filter values text
  filterValueAny: "هرکدام",
  filterValueTrue: "درست",
  filterValueFalse: "نادرست",

  // Column menu text
  columnMenuLabel: "منو",
  columnMenuAriaLabel: (columnName: string) => `منوی ستون ${columnName}`,
  columnMenuShowColumns: "نمایش ستون‌ها",
  columnMenuManageColumns: "مدیریت ستون‌ها",
  columnMenuFilter: "فیلتر",
  columnMenuHideColumn: "مخفی کردن ستون",
  columnMenuUnsort: "لغو مرتب‌سازی",
  columnMenuSortAsc: "مرتب‌سازی صعودی",
  columnMenuSortDesc: "مرتب‌سازی نزولی",
  columnMenuManagePivot: "مدیریت محوری",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} فیلتر فعال` : `${count} فیلتر فعال`,
  columnHeaderFiltersLabel: "نمایش فیلترها",
  columnHeaderSortIconLabel: "مرتب‌سازی",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} سطر انتخاب شده`
      : `${count.toLocaleString()} سطر انتخاب شده`,

  // Total row amount footer text
  footerTotalRows: "مجموع سطرها:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} از ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "انتخاب",
  checkboxSelectionSelectAllRows: "انتخاب همه ردیف‌ها",
  checkboxSelectionUnselectAllRows: "لغو انتخاب همه ردیف‌ها",
  checkboxSelectionSelectRow: "انتخاب ردیف",
  checkboxSelectionUnselectRow: "لغو انتخاب ردیف",

  // Boolean cell text
  booleanCellTrueLabel: "بله",
  booleanCellFalseLabel: "خیر",

  // Actions cell more text
  actionsCellMore: "بیشتر",

  // Column pinning text
  pinToLeft: "سنجاق به چپ",
  pinToRight: "سنجاق به راست",
  unpin: "برداشتن سنجاق",

  // Tree Data
  treeDataGroupingHeaderName: "گروه",
  treeDataExpand: "نمایش فرزندان",
  treeDataCollapse: "مخفی کردن فرزندان",

  // Grouping columns
  groupingColumnHeaderName: "گروه",
  groupColumn: (name) => `گروه‌بندی بر اساس ${name}`,
  unGroupColumn: (name) => `لغو گروه‌بندی بر اساس ${name}`,

  // Master/detail
  detailPanelToggle: "نمایش جزئیات",
  expandDetailPanel: "باز کردن",
  collapseDetailPanel: "بستن",

  // Pagination
  paginationRowsPerPage: "سطر در هر صفحه:",
  paginationDisplayedRows: ({ from, to, count, estimated }) => {
    if (!estimated) {
      return `${from}–${to} از ${count !== -1 ? count : `بیش از ${to}`}`;
    }
    const estimatedLabel =
      estimated && estimated > to ? `حدود ${estimated}` : `بیش از ${to}`;
    return `${from}–${to} از ${count !== -1 ? count : estimatedLabel}`;
  },
  paginationItemAriaLabel: (type) => {
    if (type === "first") return "رفتن به اولین صفحه";
    if (type === "last") return "رفتن به آخرین صفحه";
    if (type === "next") return "رفتن به صفحه بعدی";
    return "رفتن به صفحه قبلی";
  },

  // Row reordering text
  rowReorderingHeaderName: "ترتیب مجدد",

  // Aggregation
  aggregationMenuItemHeader: "تجمیع",
  aggregationFunctionLabelSum: "جمع",
  aggregationFunctionLabelAvg: "میانگین",
  aggregationFunctionLabelMin: "حداقل",
  aggregationFunctionLabelMax: "حداکثر",
  aggregationFunctionLabelSize: "تعداد",

  // Pivot panel
  pivotToggleLabel: "محوری",
  pivotRows: "ردیف‌ها",
  pivotColumns: "ستون‌ها",
  pivotValues: "مقادیر",
  pivotCloseButton: "بستن تنظیمات محوری",
  pivotSearchButton: "جستجو در فیلدها",
  pivotSearchControlPlaceholder: "جستجو در فیلدها",
  pivotSearchControlLabel: "جستجو در فیلدها",
  pivotSearchControlClear: "پاک کردن جستجو",
  pivotNoFields: "بدون فیلد",
  pivotMenuMoveUp: "انتقال به بالا",
  pivotMenuMoveDown: "انتقال به پایین",
  pivotMenuMoveToTop: "انتقال به ابتدا",
  pivotMenuMoveToBottom: "انتقال به انتها",
  pivotMenuRows: "ردیف‌ها",
  pivotMenuColumns: "ستون‌ها",
  pivotMenuValues: "مقادیر",
  pivotMenuOptions: "گزینه‌های فیلد",
  pivotMenuAddToRows: "افزودن به ردیف‌ها",
  pivotMenuAddToColumns: "افزودن به ستون‌ها",
  pivotMenuAddToValues: "افزودن به مقادیر",
  pivotMenuRemove: "حذف",
  pivotDragToRows: "اینجا بکشید تا ردیف بسازید",
  pivotDragToColumns: "اینجا بکشید تا ستون بسازید",
  pivotDragToValues: "اینجا بکشید تا مقدار بسازید",
  pivotYearColumnHeaderName: "(سال)",
  pivotQuarterColumnHeaderName: "(سه‌ماهه)",

  // AI Assistant panel
  aiAssistantPanelTitle: "دستیار هوش مصنوعی",
  aiAssistantPanelClose: "بستن دستیار",
  aiAssistantPanelNewConversation: "مکالمه جدید",
  aiAssistantPanelConversationHistory: "تاریخچه مکالمه",
  aiAssistantPanelEmptyConversation: "هیچ سابقه‌ای وجود ندارد",
  aiAssistantSuggestions: "پیشنهادها",

  // Prompt field
  promptFieldLabel: "پرامپت",
  promptFieldPlaceholder: "یک پرامپت بنویسید…",
  promptFieldPlaceholderWithRecording: "بنویسید یا ضبط کنید…",
  promptFieldPlaceholderListening: "در حال گوش دادن…",
  promptFieldSpeechRecognitionNotSupported: "مرورگر شما از تشخیص گفتار پشتیبانی نمی‌کند",
  promptFieldSend: "ارسال",
  promptFieldRecord: "ضبط",
  promptFieldStopRecording: "توقف ضبط",

  // Prompt
  promptRerun: "اجرا دوباره",
  promptProcessing: "در حال پردازش…",
  promptAppliedChanges: "تغییرات اعمال شد",

  // Prompt changes
  promptChangeGroupDescription: (column: string) => `گروه‌بندی بر اساس ${column}`,
  promptChangeAggregationLabel: (column: string, aggregation: string) =>
    `${column} (${aggregation})`,
  promptChangeAggregationDescription: (column: string, aggregation: string) =>
    `تجمیع ${column} (${aggregation})`,
  promptChangeFilterLabel: (column: string, operator: string, value: string) => {
    if (operator === "is any of") {
      return `${column} یکی از: ${value}`;
    }
    return `${column} ${operator} ${value}`;
  },
  promptChangeFilterDescription: (column: string, operator: string, value: string) => {
    if (operator === "is any of") {
      return `فیلتر بر اساس اینکه ${column} یکی از: ${value} باشد`;
    }
    return `فیلتر بر اساس ${column} ${operator} ${value}`;
  },
  promptChangeSortDescription: (column: string, direction: string) =>
    `مرتب‌سازی بر اساس ${column} (${direction})`,
  promptChangePivotEnableLabel: "محوری",
  promptChangePivotEnableDescription: "فعال‌سازی محوری",
  promptChangePivotColumnsLabel: (count: number) => `ستون‌ها (${count})`,
  promptChangePivotColumnsDescription: (column: string, direction: string) =>
    `${column}${direction ? ` (${direction})` : ""}`,
  promptChangePivotRowsLabel: (count: number) => `ردیف‌ها (${count})`,
  promptChangePivotValuesLabel: (count: number) => `مقادیر (${count})`,
  promptChangePivotValuesDescription: (column: string, aggregation: string) =>
    `${column} (${aggregation})`,
};
