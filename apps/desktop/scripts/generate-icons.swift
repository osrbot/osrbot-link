import AppKit
import Foundation
import ImageIO
import UniformTypeIdentifiers

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let sourceURL = root.appendingPathComponent("assets/osrbot-link-icon-source.png")
let iconURL = root.appendingPathComponent("icon.png")
let icoURL = root.appendingPathComponent("icon.ico")
let icnsURL = root.appendingPathComponent("icon.icns")
let buildIconsURL = root.appendingPathComponent("build/icons")
let iconsetURL = root.appendingPathComponent("tmp-icon.iconset")

func fail(_ message: String) -> Never {
    fputs("\(message)\n", stderr)
    exit(1)
}

func loadImage(_ url: URL) -> CGImage {
    guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
          let image = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
        fail("Cannot load image: \(url.path)")
    }
    return image
}

func renderSource(_ source: CGImage, size: Int) -> [UInt8] {
    var pixels = [UInt8](repeating: 0, count: size * size * 4)
    guard let ctx = CGContext(
        data: &pixels,
        width: size,
        height: size,
        bitsPerComponent: 8,
        bytesPerRow: size * 4,
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else {
        fail("Cannot create bitmap context")
    }

    ctx.interpolationQuality = .high
    ctx.clear(CGRect(x: 0, y: 0, width: size, height: size))
    ctx.draw(source, in: CGRect(x: 0, y: 0, width: size, height: size))
    return pixels
}

func isBackgroundLike(_ pixels: [UInt8], _ index: Int) -> Bool {
    let r = Int(pixels[index])
    let g = Int(pixels[index + 1])
    let b = Int(pixels[index + 2])
    let maxC = max(r, max(g, b))
    let minC = min(r, min(g, b))
    let luma = (2126 * r + 7152 * g + 722 * b) / 10000
    return luma > 218 && maxC - minC < 32
}

func removeConnectedLightBackground(_ pixels: inout [UInt8], size: Int) {
    var visited = [Bool](repeating: false, count: size * size)
    var queue: [Int] = []
    queue.reserveCapacity(size * 4)

    func enqueue(_ x: Int, _ y: Int) {
        guard x >= 0, x < size, y >= 0, y < size else { return }
        let p = y * size + x
        guard !visited[p] else { return }
        let i = p * 4
        guard isBackgroundLike(pixels, i) else { return }
        visited[p] = true
        queue.append(p)
    }

    for i in 0..<size {
        enqueue(i, 0)
        enqueue(i, size - 1)
        enqueue(0, i)
        enqueue(size - 1, i)
    }

    var head = 0
    while head < queue.count {
        let p = queue[head]
        head += 1
        let x = p % size
        let y = p / size
        enqueue(x + 1, y)
        enqueue(x - 1, y)
        enqueue(x, y + 1)
        enqueue(x, y - 1)
    }

    for p in 0..<(size * size) where visited[p] {
        let i = p * 4
        pixels[i + 3] = 0
    }

    // Soft matte for antialiased edges next to the removed background.
    var alpha = [UInt8](repeating: 255, count: size * size)
    for p in 0..<(size * size) {
        if visited[p] {
            alpha[p] = 0
        }
    }

    for y in 1..<(size - 1) {
        for x in 1..<(size - 1) {
            let p = y * size + x
            if visited[p] { continue }
            var bgNeighbors = 0
            for dy in -1...1 {
                for dx in -1...1 where dx != 0 || dy != 0 {
                    if visited[(y + dy) * size + (x + dx)] {
                        bgNeighbors += 1
                    }
                }
            }
            if bgNeighbors > 0 && isBackgroundLike(pixels, p * 4) {
                alpha[p] = UInt8(max(70, 255 - bgNeighbors * 34))
            }
        }
    }

    for p in 0..<(size * size) {
        pixels[p * 4 + 3] = alpha[p]
    }
}

func makeImage(_ pixels: inout [UInt8], size: Int) -> CGImage {
    guard let ctx = CGContext(
        data: &pixels,
        width: size,
        height: size,
        bitsPerComponent: 8,
        bytesPerRow: size * 4,
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ), let image = ctx.makeImage() else {
        fail("Cannot create image")
    }
    return image
}

func pngData(_ image: CGImage) -> Data {
    let data = NSMutableData()
    guard let dest = CGImageDestinationCreateWithData(data, UTType.png.identifier as CFString, 1, nil) else {
        fail("Cannot create PNG destination")
    }
    CGImageDestinationAddImage(dest, image, nil)
    guard CGImageDestinationFinalize(dest) else {
        fail("Cannot write PNG data")
    }
    return data as Data
}

func processedImage(_ source: CGImage, size: Int) -> CGImage {
    var pixels = renderSource(source, size: size)
    removeConnectedLightBackground(&pixels, size: size)
    return makeImage(&pixels, size: size)
}

func writePNG(_ image: CGImage, to url: URL) {
    do {
        try pngData(image).write(to: url)
    } catch {
        fail("Cannot write \(url.path): \(error)")
    }
}

func appendLE16(_ value: Int, to data: inout Data) {
    data.append(UInt8(value & 0xff))
    data.append(UInt8((value >> 8) & 0xff))
}

func appendLE32(_ value: Int, to data: inout Data) {
    data.append(UInt8(value & 0xff))
    data.append(UInt8((value >> 8) & 0xff))
    data.append(UInt8((value >> 16) & 0xff))
    data.append(UInt8((value >> 24) & 0xff))
}

func appendBE32(_ value: Int, to data: inout Data) {
    data.append(UInt8((value >> 24) & 0xff))
    data.append(UInt8((value >> 16) & 0xff))
    data.append(UInt8((value >> 8) & 0xff))
    data.append(UInt8(value & 0xff))
}

func appendOSType(_ type: String, to data: inout Data) {
    for byte in type.utf8 {
        data.append(byte)
    }
}

let fm = FileManager.default
let source = loadImage(sourceURL)
try? fm.removeItem(at: buildIconsURL)
try? fm.removeItem(at: iconsetURL)
try fm.createDirectory(at: buildIconsURL, withIntermediateDirectories: true)
try fm.createDirectory(at: iconsetURL, withIntermediateDirectories: true)

let pngSizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024]
for size in pngSizes {
    writePNG(processedImage(source, size: size), to: buildIconsURL.appendingPathComponent("\(size)x\(size).png"))
}
writePNG(processedImage(source, size: 1024), to: iconURL)

let iconsetSpecs: [(String, Int)] = [
    ("icon_16x16.png", 16), ("icon_16x16@2x.png", 32),
    ("icon_32x32.png", 32), ("icon_32x32@2x.png", 64),
    ("icon_128x128.png", 128), ("icon_128x128@2x.png", 256),
    ("icon_256x256.png", 256), ("icon_256x256@2x.png", 512),
    ("icon_512x512.png", 512), ("icon_512x512@2x.png", 1024)
]
for (name, size) in iconsetSpecs {
    writePNG(processedImage(source, size: size), to: iconsetURL.appendingPathComponent(name))
}

let icoSizes = [16, 24, 32, 48, 64, 128, 256]
let icoImages: [(Int, Data)] = icoSizes.map { ($0, pngData(processedImage(source, size: $0))) }
var ico = Data()
appendLE16(0, to: &ico)
appendLE16(1, to: &ico)
appendLE16(icoImages.count, to: &ico)
var offset = 6 + icoImages.count * 16
for (size, data) in icoImages {
    ico.append(UInt8(size == 256 ? 0 : size))
    ico.append(UInt8(size == 256 ? 0 : size))
    ico.append(0)
    ico.append(0)
    appendLE16(1, to: &ico)
    appendLE16(32, to: &ico)
    appendLE32(data.count, to: &ico)
    appendLE32(offset, to: &ico)
    offset += data.count
}
for (_, data) in icoImages {
    ico.append(data)
}
try ico.write(to: icoURL)

let icnsSpecs: [(String, Int)] = [
    ("icp4", 16), ("icp5", 32), ("icp6", 64),
    ("ic07", 128), ("ic08", 256), ("ic09", 512), ("ic10", 1024)
]
var icnsItems = Data()
for (type, size) in icnsSpecs {
    let data = pngData(processedImage(source, size: size))
    appendOSType(type, to: &icnsItems)
    appendBE32(data.count + 8, to: &icnsItems)
    icnsItems.append(data)
}
var icns = Data()
appendOSType("icns", to: &icns)
appendBE32(icnsItems.count + 8, to: &icns)
icns.append(icnsItems)
try icns.write(to: icnsURL)

print("Generated icon.png, icon.ico, icon.icns, and build/icons/*.png from assets/osrbot-link-icon-source.png")
