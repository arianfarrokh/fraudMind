import isPropValid from '@emotion/is-prop-valid'

export const isValidProp = (prop: string) => isPropValid(prop)

export const formatString = (template: string, ...args: (string | number)[]): string =>
  template.replace(/{(\d+)}/g, (match, index) => String(args[Number(index)]))
