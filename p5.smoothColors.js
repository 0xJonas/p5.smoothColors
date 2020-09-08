"use strict"

const delta = 6.0 / 29.0
const deltaCubed = delta * delta * delta

const xD65 = 0.950489
const yD65 = 1.0
const zD65 = 1.088840

const uD65 = 4.0 * xD65 / (xD65 + 15.0 * yD65 + 3.0 * zD65)
const vD65 = 9.0 * yD65 / (xD65 + 15.0 * yD65 + 3.0 * zD65)

function LabGamma(v) {
  if (v <= deltaCubed)
    return v / 3.0 / delta / delta + 16.0 / 116.0
  else
    return Math.cbrt(v)
}

function LabDigamma(v) {
  if (v > delta)
    return v * v * v
  else
    return (v - 16.0 / 116.0) * 3.0 * delta * delta
}

function sRGBGamma(v) {
  if (v <= 0.0031308)
    return 12.92 * v
  else
    return 1.055 * Math.pow(v, 1.0 / 2.4) - 0.055
}

function sRGBDigamma(v) {
  if (v <= 0.04045)
    return v / 12.92
  else
    return Math.pow((v + 0.055) / 1.055, 2.4)
}

function determinant3x3(m){
  return   m[0] * m[4] * m[8] +
      m[1] * m[5] * m[6] +
      m[2] * m[3] * m[7] -
      m[6] * m[4] * m[2] -
      m[7] * m[5] * m[0] -
      m[8] * m[3] * m[1]
}

function invertMatrix3x3(m){
  const det = determinant3x3(m)
  return [
    (m[4] * m[8] - m[5] * m[7]) / det,
    -(m[1] * m[8] - m[2] * m[7]) / det,
    (m[1] * m[5] - m[2] * m[4]) / det,
    -(m[3] * m[8] - m[5] * m[6]) / det,
    (m[0] * m[8] - m[2] * m[6]) / det,
    -(m[0] * m[5] - m[2] * m[3]) / det,
    (m[3] * m[7] - m[4] * m[6]) / det,
    -(m[0] * m[7] - m[1] * m[6]) / det,
    (m[0] * m[4] - m[1] * m[3]) / det
  ]
}

function multMatrixVector3x3(matrix, vector) {
  return [
    (matrix[0] * vector[0]) + (matrix[1] * vector[1]) + (matrix[2] * vector[2]),
    (matrix[3] * vector[0]) + (matrix[4] * vector[1]) + (matrix[5] * vector[2]),
    (matrix[6] * vector[0]) + (matrix[7] * vector[1]) + (matrix[8] * vector[2])
  ]
}

function createConversionMatrix(x1, y1, x2, y2, x3, y3, xw, yw){
  //Calculate z values
  const z1 = 1.0 - x1 - y1
  const z2 = 1.0 - x2 - y2
  const z3 = 1.0 - x3 - y3
  const zw = 1.0 - xw - yw
  
  /*
  This matrix ensures that the vectors (1,0,0), (0,1,0) and (0,0,1) are
  mapped to the given xyY primaries
  */
  const base = [
    x1 / y1, x2 / y2, x3 / y3,
        1.0,     1.0,     1.0,
    z1 / y1, z2 / y2, z3 / y3
  ]
  
  //Calculate XYZ values for the reference white point
  const Xw = xw / yw
  const Yw = 1.0
  const Zw = zw / yw
  
  /*
  Modify matrix so that (1,1,1) maps to reference white
  Calculate missing Y values for the three primaries based on the reference white point
  */
  const baseInv = invertMatrix3x3(base)
  const [Yr, Yg, Yb] = multMatrixVector3x3(baseInv, [Xw, Yw, Zw])
  
  return [
    base[0] * Yr, base[1] * Yg, base[2] * Yb,
    base[3] * Yr, base[4] * Yg, base[5] * Yb,
    base[6] * Yr, base[7] * Yg, base[8] * Yb,
  ]
}

/*
=========================================================
               Color space conversions
=========================================================
*/

const matrixsRGB2XYZ = createConversionMatrix(0.64, 0.33, 0.3, 0.6, 0.15, 0.06, 0.3127, 0.329)
const matrixXYZ2sRGB = invertMatrix3x3(matrixsRGB2XYZ)

/*
All XYZ tristimulus values are normalized to Illuminant D65, which simplifies most
formulas slightly. 
*/

p5.prototype.sRGB2XYZ = function(r, g, b) {
  const linR = sRGBDigamma(r)
  const linG = sRGBDigamma(g)
  const linB = sRGBDigamma(b)
  return multMatrixVector3x3(matrixsRGB2XYZ, [linR, linG, linB])
}

p5.prototype.XYZ2sRGB = function(x, y, z) {
  const [linR, linG, linB] = multMatrixVector3x3(matrixXYZ2sRGB, [x, y, z])
  return [sRGBGamma(linR), sRGBGamma(linG), sRGBGamma(linB)]
}

p5.prototype.XYZ2Lab = function(x, y, z) {
  const L = 116.0 * LabGamma(y / yD65) - 16
  const a = 500.0 * (LabGamma(x / xD65) - LabGamma(y / yD65))
  const b = 200.0 * (LabGamma(y / yD65) - LabGamma(z / zD65))
  return [L, a, b]
}

p5.prototype.Lab2XYZ = function(L, a, b) {
  const x = xD65 * LabDigamma((L + 16) / 116.0 + a / 500.0)
  const y = yD65 * LabDigamma((L + 16) / 116.0)
  const z = zD65 * LabDigamma((L + 16) / 116.0 - b / 200.0)
  return [x, y, z]
}

/*
TODO D65 values are wrong
*/
p5.prototype.XYZ2Luv = function(x, y, z) {
  if (x + y + z == 0.0)
    return [0, 0, 0]
  const L = y <= deltaCubed ? Math.pow(29.0 / 3.0, 3.0) * y : 116.0 * Math.cbrt(y) - 16.0
  //const uPrime = 4.0 * x * xD65 / (x * xD65 + 15.0 * y * yD65 + 3.0 * z * zD65)
  const uPrime = 4.0 * x / (x + 15.0 * y + 3.0 * z)
  //const vPrime = 9.0 * y * yD65 / (x * xD65 + 15.0 * y * yD65 + 3.0 * z * zD65)
  const vPrime = 9.0 * y / (x + 15.0 * y + 3.0 * z)
  const u = 13.0 * L * (uPrime - uD65)
  const v = 13.0 * L * (vPrime - vD65)
  return [L, u, v]
}

p5.prototype.Luv2XYZ = function(L, u, v) {
  if (L == 0.0)
    return [0, 0, 0]
  const uPrime = u / 13.0 / L + uD65
  const vPrime = v / 13.0 / L + vD65
  const y = L <= 8.0 ? L * Math.pow(3.0 / 29.0, 3.0) : Math.pow((L + 16.0) / 116.0, 3)
  const x = y * 9.0 * uPrime / 4.0 / vPrime
  const z = y * (12.0 - 3.0 * uPrime - 20.0 * vPrime) / 4.0 / vPrime
  return [x, y, z]
}

p5.prototype.XYZ2LCh = function(x, y, z) {
  const [L, a, b] = XYZ2Lab(x, y, z)
  return [L, Math.sqrt((a * a) + (b * b)), Math.atan2(b, a)] 
}

p5.prototype.LCh2XYZ = function(L, C, h) {
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  return Lab2XYZ(L, a, b)
}

p5.prototype.XYZ2LChuv = function(x, y, z) {
  const [L, u, v] = XYZ2Luv(x, y, z)
  return [L, Math.sqrt((u * u) + (v * v)), Math.atan2(v, u)] 
}

p5.prototype.LChuv2XYZ = function(L, C, h) {
  const u = C * Math.cos(h)
  const v = C * Math.sin(h)
  return Luv2XYZ(L, u, v)
}


p5.prototype.XYZ2XYZ = function(x, y, z) {
  return [x, y, z]
}


p5.prototype.CIELab = "CIELab"
p5.prototype.CIELuv = "CIELuv"
p5.prototype.CIELCh = "CIELCh"
p5.prototype.CIELChuv = "CIELChuv"
p5.prototype.CIEXYZ = "CIEXYZ"
p5.prototype.sRGB = "sRGB"

p5.prototype.currentInterpolationSpace = "CIELab"
const convertFuncs = {
  "ciexyz":   [p5.prototype.XYZ2XYZ,   p5.prototype.XYZ2XYZ],
  "cielab":   [p5.prototype.XYZ2Lab,   p5.prototype.Lab2XYZ],
  "cieluv":   [p5.prototype.XYZ2Luv,   p5.prototype.Luv2XYZ],
  "cielch":   [p5.prototype.XYZ2LCh,   p5.prototype.LCh2XYZ],
  "cielchuv": [p5.prototype.XYZ2LChuv, p5.prototype.LChuv2XYZ],
  "srgb":     [p5.prototype.XYZ2sRGB,  p5.prototype.sRGB2XYZ]
}

p5.prototype.convertFunc = p5.prototype.XYZ2Lab
p5.prototype.convertFuncInverse = p5.prototype.Lab2XYZ

p5.prototype.interpolationSpace = function(space) {
  if (space === undefined)
    return this.currentInterpolationSpace
  else {
    const unifiedName = space.toLowerCase().trim()
    if (unifiedName in convertFuncs)
      [this.convertFunc, this.convertFuncInverse] = convertFuncs[unifiedName]
  }
}

function smoothColor(...args) {
  const c = color(...args)
  const newRed = constrain(LabGamma(red(c) / 255.0) * 255.0, 0, 255)
  const newGreen = constrain(LabGamma(green(c) / 255.0) * 255.0, 0, 255)
  const newBlue = constrain(LabGamma(blue(c) / 255.0) * 255.0, 0, 255)
  return color(newRed, newGreen, newBlue)
}

p5.prototype.smoothLerpColor = function(c1, c2, amount) {
  return color(...smoothLerpColorArray(
    [red(c1), green(c1), blue(c1)],
    [red(c2), green(c2), blue(c2)],
    amount
  ))
}

//Creating my own lerp function since calling into the p5 api has a 
//massive overhead because of parameter validation
function myLerp(v1, v2, amt) {
  return v1 + (v2 - v1) * amt
}

p5.prototype.smoothLerpColorArray = function(c1, c2, amt) {
  const xyz1 = this.sRGB2XYZ(c1[0] / 255.0, c1[1] / 255.0, c1[2] / 255.0)
  const xyz2 = this.sRGB2XYZ(c2[0] / 255.0, c2[1] / 255.0, c2[2] / 255.0)
  const transformed1 = this.convertFunc(...xyz1)
  const transformed2 = this.convertFunc(...xyz2)

  const newXYZ = this.convertFuncInverse(
    myLerp(transformed1[0], transformed2[0], amt),
    myLerp(transformed1[1], transformed2[1], amt),
    myLerp(transformed1[2], transformed2[2], amt)
  )
  const newsRGB = this.XYZ2sRGB(...newXYZ)
  return [newsRGB[0] * 255, newsRGB[1] * 255, newsRGB[2] * 255]
}

//=========================================

let currentGradient = []

function beginGradient() {
  currentGradient = []
}

function toPolar(x, y) {
  return [sqrt(x * x, y * y), atan2(y, x)]
}

function rotationMatrix2D(angle) {
  return [cos(angle), -sin(angle), sin(angle), cos(angle)]
}

function color2Array(c) {
  return [red(c), green(c), blue(c)]
}

function linearGradient(xStart, yStart, colorStart, xEnd, yEnd, colorEnd, ...params) {
  if (params.length & 1 != 0) {
    console.log("Additional colors must be given as pairs of [amount, color].")
    return;
  }

  colorCues = [
    [0.0, color2Array(colorStart)],
    [1.0, color2Array(colorEnd)]
  ]
  for (let i = 0; i < params.length; i += 2) {
    colorCues.push([params[i], color2Array(params[i + 1])])
  }
  colorCues.sort((a, b) => a[0] - b[0])

  const [mag, angle] = toPolar(xEnd - xStart, yEnd - yStart)
  const rotationMatrix = rotationMatrix2D(-angle)

  return {
    xOff: -xStart,
    yOff: -yStart,
    rotationMatrix: rotationMatrix,
    scale: 1.0 / mag,
    amounts: colorCues.map(e => e[0]), 
    colors: colorCues.map(e => e[1])
  }
}

function translatePoint(xOff, yOff, x, y) {
  return [x + xOff, y + yOff]
}

function rotatePoint(rotationMatrix, x, y) {
  return [
    x * rotationMatrix[0] + y * rotationMatrix[1],
    x * rotationMatrix[2] + y * rotationMatrix[3]
  ]
}

function scalePoint(scale, x, y) {
  return [x * scale, y * scale]
}

function bisect(value, list) {
  //Linear search since these lists will not be that long and the branch predictor will thank me
  for(let i = 0; i < list.length; i++){
    if(list[i] >= value)
      return i - 1
  }
  return list.length
}

function renderLinearGradient(x, y, gradient) {
  const [xTransformed, yTransformed] = scalePoint(gradient.scale, ...rotatePoint(gradient.rotationMatrix, ...translatePoint(gradient.xOff, gradient.yOff, x, y)))
  
  if(xTransformed <= 0.0)
    return gradient.colors[0]
  else if(xTransformed >= 1.0)
    return gradient.colors[gradient.colors.length - 1]
  else {
    const index = bisect(xTransformed, gradient.amounts)
    const color1 = gradient.colors[index]
    const color2 = gradient.colors[index + 1]
    const startAmount = gradient.amounts[index]
    const endAmount = gradient.amounts[index + 1]
    return smoothLerpColorArray(color1, color2, (xTransformed - startAmount) / (endAmount - startAmount))
  }
}
