import Color from 'color'

// https://www.npmjs.com/package/color

// helpers
export const createColor = (color: string): Color =>
  Color(color.charAt(0) === '#' ? color : `#${color}`, 'hex')

// exports
export const getVisibleTextColor = (baseColor: string): string =>
  createColor(baseColor).isDark() ? '#ffffff' : '#000000'

export const createGradient = (baseColor: string): string[] => {
  const color = createColor(baseColor)
  // return [color.hex(), color.rotate(40).lighten(0.05).hex()]
  return [color.hex(), color.rotate(40).lighten(0.05).hex()]
}
