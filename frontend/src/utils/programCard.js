export const DEFAULT_PROGRAM_IMAGE_VISIBILITY = 50

export function getProgramOverlayStyle(value) {
  const numericValue = Number(value)
  const visibility = Number.isFinite(numericValue)
    ? Math.min(100, Math.max(0, numericValue))
    : DEFAULT_PROGRAM_IMAGE_VISIBILITY
  const middleOpacity = 0.9 - visibility * 0.0044

  return {
    '--program-overlay-top': Math.min(0.96, middleOpacity + 0.16).toFixed(3),
    '--program-overlay-middle': middleOpacity.toFixed(3),
    '--program-overlay-bottom': Math.min(0.96, middleOpacity + 0.2).toFixed(3),
  }
}
