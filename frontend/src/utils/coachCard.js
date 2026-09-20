export const DEFAULT_PHOTO_VISIBILITY = 50

export function getCoachAccoladeGroups(coach) {
  if (Array.isArray(coach.accoladeGroups)) return coach.accoladeGroups
  if (Array.isArray(coach.accolades) && coach.accolades.length > 0) {
    return [{ label: 'Accolades', items: coach.accolades }]
  }
  return []
}

export function getCoachOverlayStyle(value) {
  const numericValue = Number(value)
  const visibility = Number.isFinite(numericValue)
    ? Math.min(100, Math.max(0, numericValue))
    : DEFAULT_PHOTO_VISIBILITY
  const middleOpacity = 0.85 - visibility * 0.005

  return {
    '--staff-overlay-top': Math.min(0.96, middleOpacity + 0.26).toFixed(3),
    '--staff-overlay-middle': middleOpacity.toFixed(3),
    '--staff-overlay-bottom': Math.min(0.94, middleOpacity + 0.22).toFixed(3),
  }
}
