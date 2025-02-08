/**
 * Returns a small fingerprint based on the user's browser, used for trend detection.
 * @param {any[]} [additionalData] Optional array of extra data.
 * @returns {string} 8-character fingerprint hash.
 */
export function getTinyFingerprint(additionalData = []) {
  return hashString([
    navigator.userAgent,
    navigator.language,
    navigator.hardwareConcurrency,
    window.devicePixelRatio,
    new Intl.DateTimeFormat().resolvedOptions().timeZone,
    getCanvasFingerprint(),
    ...additionalData
  ].join(""))
}

function hashString(input) {
  let hash = 0

  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0

  return hash.toString(16).padStart(8, "0").slice(-8)
}

function getCanvasFingerprint() {
  try {
    const c = document.createElement("canvas")
    const ctx = c.getContext("2d")

    ctx.fillText("Test", 10, 10)

    return ctx.getImageData(0, 0, 10, 10).data.toString()
  } catch {
    return ""
  }
}
