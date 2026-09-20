export const DEFAULT_HERO_IMAGE_VISIBILITY = 50

export function getHeroOverlayStyle(value) {
  const numericValue = Number(value)
  const visibility = Number.isFinite(numericValue)
    ? Math.min(100, Math.max(0, numericValue))
    : DEFAULT_HERO_IMAGE_VISIBILITY
  const middleOpacity = 0.5 - visibility * 0.005

  return {
    '--hero-overlay-start': Math.min(0.8, middleOpacity + 0.3).toFixed(3),
    '--hero-overlay-middle': middleOpacity.toFixed(3),
    '--hero-overlay-end': Math.min(0.6, middleOpacity + 0.1).toFixed(3),
  }
}
