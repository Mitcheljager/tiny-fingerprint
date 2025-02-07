/**
 * Returns a small fingerprint based on the user's browser, used for trend detection.
 * @param {object} additionalData Optional extra data.
 * @returns {string} 8-character fingerprint hash.
 */
export function getTinyFingerprint(additionalData = {}) {
  const fingerprintData = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
    devicePixelRatio: window.devicePixelRatio,
    gpuRenderer: getWebGLRenderer(),
    canvasFingerprint: getCanvasFingerprint(),
    ...additionalData
  }

  return hashObject(fingerprintData)
}

function hashObject(object) {
  const string = JSON.stringify(object)

  let hash = 0

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i)
    hash = (hash * 31 + char) >>> 0
  }

  return hash.toString(16).padStart(8, "0").slice(-8) // Ensure fixed length
}

function getWebGLRenderer() {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) return "unsupported"

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "unknown"
  } catch {
    return "error"
  }
}

function getCanvasFingerprint() {
  try {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("Test", 10, 10)

    return canvas.toDataURL()
  } catch {
    return "error"
  }
}
