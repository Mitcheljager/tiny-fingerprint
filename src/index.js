/**
 * Returns a fingerprint based on the user's browser, used to identify a user across sessions without revealing potential personal data.
 * Highly imprecise. Expect users to overlap frequently. This is used to detect trends, not precise numbers.
 * @param {object} additionalData Any additional data you might want to include in the fingerprint.
 * @returns {string} Fingerprint as a 8 character string of numbers and letters.
 */
export function getTinyFingerprint(additionalData = {}) {
  const fingerprintData = {
    screenPixelDepth: screen.pixelDepth,
    colorDepth: screen.colorDepth,
    deviceSensors: "ondevicemotion" in window || "ondeviceorientation" in window,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
    devicePixelRatio: window.devicePixelRatio,
    localStorage: !!window.localStorage,
    sessionStorage: !!window.sessionStorage,
    indexedDB: !!window.indexedDB,
    gpuRenderer: getWebGLRenderer(),
    canvasFingerprint: getCanvasFingerprint(),
    audioFingerprint: getAudioFingerprint(),
    fonts: getAvailableFonts(),
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

  return hash.toString(16)
}

function getWebGLRenderer() {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) return "unsupported"

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
    return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "unknown"
  } catch (error) {
    return error.message
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
  } catch (error) {
    return error.message
  }
}

function getAudioFingerprint() {
  try {
    const ctx = new AudioContext()
    const oscillator = ctx.createOscillator()
    const analyser = ctx.createAnalyser()
    const gain = ctx.createGain()

    oscillator.connect(gain)
    gain.connect(analyser)
    analyser.connect(ctx.destination)
    oscillator.start(0)

    return analyser.frequencyBinCount
  } catch (error) {
    return error.message
  }
}

function getAvailableFonts() {
  const testFonts = ["Arial", "Courier", "Times New Roman", "Verdana", "Georgia"]
  const baseFont = "sans-serif"

  try {
    return testFonts.filter(font => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      ctx.font = `20px ${baseFont}`
      const baselineWidth = ctx.measureText("a").width

      ctx.font = `20px ${font}, ${baseFont}`
      return ctx.measureText("a").width !== baselineWidth
    })
  } catch (error) {
    return error.message
  }
}
