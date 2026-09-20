export const DEFAULT_LEGEND_IMAGE_VISIBILITY = 50

export function getLegendOverlayStyle(value) {
  const numericValue = Number(value)
  const visibility = Number.isFinite(numericValue)
    ? Math.min(100, Math.max(0, numericValue))
    : DEFAULT_LEGEND_IMAGE_VISIBILITY
  const middleOpacity = 0.94 - visibility * 0.005

  return {
    '--legend-overlay-top': Math.min(0.96, middleOpacity + 0.08).toFixed(3),
    '--legend-overlay-middle': middleOpacity.toFixed(3),
    '--legend-overlay-bottom': Math.min(0.96, middleOpacity + 0.12).toFixed(3),
  }
}
