import { describe, expect, it, vi } from "vitest"
import { getTinyFingerprint } from "."

describe("index.js", () => {
  describe("getTinyFingerprint", () => {
    it("Should return a string", () => {
      expect(typeof getTinyFingerprint()).toBe("string")
    })

    it("Should return the same string when run twice on the same device", () => {
      expect(getTinyFingerprint()).toBe(getTinyFingerprint())
    })

    it("Should return different string when different data is passed", () => {
      expect(getTinyFingerprint({ "a": "b" })).not.toBe(getTinyFingerprint({ "c": "d" }))
    })

    it("Should return different values based on screen data", () => {
      vi.stubGlobal("screen", { pixelDepth: 3 })
      let result1 = getTinyFingerprint()
      vi.stubGlobal("screen", { pixelDepth: 2 })
      let result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)

      vi.stubGlobal("screen", { colorDepth: 3 })
      result1 = getTinyFingerprint()
      vi.stubGlobal("screen", { colorDepth: 2 })
      result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)
    })

    it("Should return different values based on window data", () => {
      vi.stubGlobal("window", { devicePixelRatio: 3 })
      let result1 = getTinyFingerprint()
      vi.stubGlobal("window", { devicePixelRatio: 2 })
      let result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)

      vi.stubGlobal("window", { localStorage: true })
      result1 = getTinyFingerprint()
      vi.stubGlobal("window", { localStorage: false })
      result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)

      vi.stubGlobal("window", { sessionStorage: true })
      result1 = getTinyFingerprint()
      vi.stubGlobal("window", { sessionStorage: false })
      result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)

      vi.stubGlobal("window", { indexedDB: true })
      result1 = getTinyFingerprint()
      vi.stubGlobal("window", { indexedDB: false })
      result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)
    })

    it("Should return different values based on navigator data", () => {
      vi.stubGlobal("navigator", { userAgent: 3 })
      let result1 = getTinyFingerprint()
      vi.stubGlobal("navigator", { userAgent: 2 })
      let result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)

      vi.stubGlobal("navigator", { platform: 3 })
      result1 = getTinyFingerprint()
      vi.stubGlobal("navigator", { platform: 2 })
      result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)

      vi.stubGlobal("navigator", { language: 3 })
      result1 = getTinyFingerprint()
      vi.stubGlobal("navigator", { language: 2 })
      result2 = getTinyFingerprint()

      expect(result1).not.toBe(result2)
    })
  })
})
