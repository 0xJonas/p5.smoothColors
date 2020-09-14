"use strict"

function checkParameterTypes(args, ...types){
  return args.map((element, index) => typeof element == types[index])
    .reduce((a, b) => a && b)
}

/*
=========================================================
                  Standard White points
=========================================================
*/

function initWhitePoint(x, y) {
  return {
    X: x / y,
    Y: 1.0,
    Z: (1.0 - x - y) / y,
    u: 4.0 * x / (-2.0 * x + 12.0 * y + 3),
    v: 9.0 * x / (-2.0 * x + 12.0 * y + 3)
  }
}

p5.prototype.A_2DEG  = Symbol("a 2deg")
p5.prototype.A_10DEG = Symbol("a 10deg")
p5.prototype.B_2DEG  = Symbol("b 2deg")
p5.prototype.B_10DEG = Symbol("b 10deg")
p5.prototype.C_2DEG  = Symbol("c 2deg")
p5.prototype.C_10DEG = Symbol("c 10deg")
p5.prototype.D50_2DEG  = Symbol("d50 2deg")
p5.prototype.D50_10DEG = Symbol("d50 10deg")
p5.prototype.D55_2DEG  = Symbol("d55 2deg")
p5.prototype.D55_10DEG = Symbol("d55 10deg")
p5.prototype.D65_2DEG  = Symbol("d65 2deg")
p5.prototype.D65_10DEG = Symbol("d65 10deg")
p5.prototype.D75_2DEG  = Symbol("d75 2deg")
p5.prototype.D75_10DEG = Symbol("d75 10deg")
p5.prototype.E_2DEG  = Symbol("e 2deg")
p5.prototype.E_10DEG = Symbol("e 10deg")
p5.prototype.F1_2DEG  = Symbol("f1 2deg")
p5.prototype.F1_10DEG = Symbol("f1 10deg")
p5.prototype.F2_2DEG  = Symbol("f2 2deg")
p5.prototype.F2_10DEG = Symbol("f2 10deg")
p5.prototype.F3_2DEG  = Symbol("f3 2deg")
p5.prototype.F3_10DEG = Symbol("f3 10deg")
p5.prototype.F4_2DEG  = Symbol("f4 2deg")
p5.prototype.F4_10DEG = Symbol("f4 10deg")
p5.prototype.F5_2DEG  = Symbol("f5 2deg")
p5.prototype.F5_10DEG = Symbol("f5 10deg")
p5.prototype.F6_2DEG  = Symbol("f6 2deg")
p5.prototype.F6_10DEG = Symbol("f6 10deg")
p5.prototype.F7_2DEG  = Symbol("f7 2deg")
p5.prototype.F7_10DEG = Symbol("f7 10deg")
p5.prototype.F8_2DEG  = Symbol("f8 2deg")
p5.prototype.F8_10DEG = Symbol("f8 10deg")
p5.prototype.F9_2DEG  = Symbol("f9 2deg")
p5.prototype.F9_10DEG = Symbol("f9 10deg")
p5.prototype.F10_2DEG  = Symbol("f10 2deg")
p5.prototype.F10_10DEG = Symbol("f10 10deg")
p5.prototype.F11_2DEG  = Symbol("f11 2deg")
p5.prototype.F11_10DEG = Symbol("f11 10deg")
p5.prototype.F12_2DEG  = Symbol("f12 2deg")
p5.prototype.F12_10DEG = Symbol("f12 10deg")

const whitePoints = {
  [p5.prototype.A_2DEG]:    initWhitePoint(0.44757, 0.40745),
  [p5.prototype.A_10DEG]:   initWhitePoint(0.45117, 0.40594),
  [p5.prototype.B_2DEG]:    initWhitePoint(0.34842, 0.35161),
  [p5.prototype.B_10DEG]:   initWhitePoint(0.34980, 0.35270),
  [p5.prototype.C_2DEG]:    initWhitePoint(0.31006, 0.31616),
  [p5.prototype.C_10DEG]:   initWhitePoint(0.31039, 0.31905),
  [p5.prototype.D50_2DEG]:  initWhitePoint(0.34567, 0.35850),
  [p5.prototype.D50_10DEG]: initWhitePoint(0.34773, 0.35952),
  [p5.prototype.D55_2DEG]:  initWhitePoint(0.33242, 0.34743),
  [p5.prototype.D55_10DEG]: initWhitePoint(0.33411, 0.34877),
  [p5.prototype.D65_2DEG]:  initWhitePoint(0.31271, 0.32902),
  [p5.prototype.D65_10DEG]: initWhitePoint(0.31382, 0.33100),
  [p5.prototype.D75_2DEG]:  initWhitePoint(0.29902, 0.31485),
  [p5.prototype.D75_10DEG]: initWhitePoint(0.29968, 0.31740),
  [p5.prototype.E_2DEG]:    initWhitePoint(1.0 / 3.0, 1.0 / 3.0),
  [p5.prototype.E_10DEG]:   initWhitePoint(1.0 / 3.0, 1.0 / 3.0),
  [p5.prototype.F1_2DEG]:   initWhitePoint(0.31310, 0.33727),
  [p5.prototype.F1_10DEG]:  initWhitePoint(0.31811, 0.33559),
  [p5.prototype.F2_2DEG]:   initWhitePoint(0.37208, 0.37529),
  [p5.prototype.F2_10DEG]:  initWhitePoint(0.37925, 0.36733),
  [p5.prototype.F3_2DEG]:   initWhitePoint(0.40910, 0.39430),
  [p5.prototype.F3_10DEG]:  initWhitePoint(0.41761, 0.38324),
  [p5.prototype.F4_2DEG]:   initWhitePoint(0.44018, 0.40329),
  [p5.prototype.F4_10DEG]:  initWhitePoint(0.44920, 0.39074),
  [p5.prototype.F5_2DEG]:   initWhitePoint(0.31379, 0.34531),
  [p5.prototype.F5_10DEG]:  initWhitePoint(0.31975, 0.34246),
  [p5.prototype.F6_2DEG]:   initWhitePoint(0.37790, 0.38835),
  [p5.prototype.F6_10DEG]:  initWhitePoint(0.38660, 0.37847),
  [p5.prototype.F7_2DEG]:   initWhitePoint(0.31292, 0.32933),
  [p5.prototype.F7_10DEG]:  initWhitePoint(0.31569, 0.32960),
  [p5.prototype.F8_2DEG]:   initWhitePoint(0.34588, 0.35875),
  [p5.prototype.F8_10DEG]:  initWhitePoint(0.34902, 0.35939),
  [p5.prototype.F9_2DEG]:   initWhitePoint(0.37417, 0.37281),
  [p5.prototype.F9_10DEG]:  initWhitePoint(0.37829, 0.37045),
  [p5.prototype.F10_2DEG]:  initWhitePoint(0.34609, 0.35986),
  [p5.prototype.F10_10DEG]: initWhitePoint(0.35090, 0.35444),
  [p5.prototype.F11_2DEG]:  initWhitePoint(0.38052, 0.37713),
  [p5.prototype.F11_10DEG]: initWhitePoint(0.38541, 0.37123),
  [p5.prototype.F12_2DEG]:  initWhitePoint(0.43695, 0.40441),
  [p5.prototype.F12_10DEG]: initWhitePoint(0.44256, 0.39717)
}

p5.prototype.currentWhitePoint = p5.prototype.D65_2DEG
p5.prototype.whitePointX = whitePoints[p5.prototype.D65_2DEG].X
p5.prototype.whitePointY = whitePoints[p5.prototype.D65_2DEG].Y
p5.prototype.whitePointZ = whitePoints[p5.prototype.D65_2DEG].Z
p5.prototype.whitePointU = whitePoints[p5.prototype.D65_2DEG].u
p5.prototype.whitePointV = whitePoints[p5.prototype.D65_2DEG].v

p5.prototype.whitePoint = function(whitePoint) {
  if(whitePoint === undefined)
    return this.currentWhitePoint
  else {
    const whitePoint = whitePoints[whitePoint]
    this.whitePointX = whitePoint.X
    this.whitePointY = whitePoint.Y
    this.whitePointZ = whitePoint.Z
    this.whitePointU = whitePoint.u
    this.whitePointV = whitePoint.v
  }
}

/*
=========================================================
                    Gamma functions
=========================================================
*/

const delta = 6.0 / 29.0
const deltaCubed = delta * delta * delta

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
  const L = 116.0 * LabGamma(y / this.whitePointY) - 16
  const a = 500.0 * (LabGamma(x / this.whitePointX) - LabGamma(y / this.whitePointY))
  const b = 200.0 * (LabGamma(y / this.whitePointY) - LabGamma(z / this.whitePointZ))
  return [L, a, b]
}

p5.prototype.Lab2XYZ = function(L, a, b) {
  const x = this.whitePointX * LabDigamma((L + 16) / 116.0 + a / 500.0)
  const y = this.whitePointY * LabDigamma((L + 16) / 116.0)
  const z = this.whitePointZ * LabDigamma((L + 16) / 116.0 - b / 200.0)
  return [x, y, z]
}

p5.prototype.XYZ2Luv = function(x, y, z) {
  if (x + y + z == 0.0)
    return [0, 0, 0]
  const L = (y <= deltaCubed) ? Math.pow(29.0 / 3.0, 3.0) * y / this.whitePointY
                              : 116.0 * Math.cbrt(y / this.whitePointY) - 16.0
  const uPrime = 4.0 * x / (x + 15.0 * y + 3.0 * z)
  const vPrime = 9.0 * y / (x + 15.0 * y + 3.0 * z)
  const u = 13.0 * L * (uPrime - this.whitePointU)
  const v = 13.0 * L * (vPrime - this.whitePointV)
  return [L, u, v]
}

p5.prototype.Luv2XYZ = function(L, u, v) {
  if (L == 0.0)
    return [0, 0, 0]
  const uPrime = u / 13.0 / L + this.whitePointU
  const vPrime = v / 13.0 / L + this.whitePointV
  const y = (L <= 8.0) ? L * Math.pow(3.0 / 29.0, 3.0) * this.whitePointY
                       : Math.pow((L + 16.0) / 116.0, 3) * this.whitePointY
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

/*
=========================================================
                  Color Interpolation
=========================================================
*/

p5.prototype.CIEXYZ = Symbol("CIEXYZ")
p5.prototype.CIELab = Symbol("CIELab")
p5.prototype.CIELuv = Symbol("CIELuv")
p5.prototype.CIELCh = Symbol("CIELCh")
p5.prototype.CIELChuv = Symbol("CIELChuv")
p5.prototype.sRGB = Symbol("sRGB")

p5.prototype.currentInterpolationSpace = p5.prototype.CIELab

const convertFuncs = {
  [p5.prototype.CIEXYZ]:   [p5.prototype.XYZ2XYZ,   p5.prototype.XYZ2XYZ],
  [p5.prototype.CIELab]:   [p5.prototype.XYZ2Lab,   p5.prototype.Lab2XYZ],
  [p5.prototype.CIELuv]:   [p5.prototype.XYZ2Luv,   p5.prototype.Luv2XYZ],
  [p5.prototype.CIELCh]:   [p5.prototype.XYZ2LCh,   p5.prototype.LCh2XYZ],
  [p5.prototype.CIELChuv]: [p5.prototype.XYZ2LChuv, p5.prototype.LChuv2XYZ],
  [p5.prototype.sRGB]:     [p5.prototype.XYZ2sRGB,  p5.prototype.sRGB2XYZ]
}

p5.prototype.convertFunc = p5.prototype.XYZ2Lab
p5.prototype.convertFuncInverse = p5.prototype.Lab2XYZ

p5.prototype.interpolationSpace = function(space) {
  if (space === undefined)
    return this.currentInterpolationSpace
  else {
    if (space in convertFuncs)
      [this.convertFunc, this.convertFuncInverse] = convertFuncs[space]
    // TODO: Error message
  }
}

const COLORS = Symbol("colors")
const AMOUNTS = Symbol("amounts")

function findIndex(list, value) {
  for(let i = 0; i < list.length; i++){
    if(list[i] > value)
      return i
  }
  return list.length
}

p5.prototype.colorSequence = function(...args){
  if(args.length & 1 !== 0) {
    //TODO
  }

  colors = args[0]
  amounts = args[1]

  for(let i = 0; i < args.length; i += 2) {
    const index = findIndex(amount, args[i + 1])
    colors.splice(index, 0, args[i])
    amounts.splice(index, 0, args[i + 1])
  }

  return {
    [COLORS]: colors,
    [AMOUNTS]: amounts,
    addColorStop: function(color, amount) {
      const index = findIndex(this[AMOUNTS], amount)
      this[COLORS].splice(index, 0, color)
      this[AMOUNTS].splice(index, 0, amount)
    }
  }
}

//TODO keep this function?
function smoothColor(...args) {
  const c = color(...args)
  const newRed = constrain(LabGamma(red(c) / 255.0) * 255.0, 0, 255)
  const newGreen = constrain(LabGamma(green(c) / 255.0) * 255.0, 0, 255)
  const newBlue = constrain(LabGamma(blue(c) / 255.0) * 255.0, 0, 255)
  return color(newRed, newGreen, newBlue)
}

//p5.prototype.smoothLerpColor = function(c1, c2, amount) {
p5.prototype.smoothLerpColor = function(...args) {
  switch(args.length){
    //smoothLerpColor(colorSeq, amt)
    case 2:
      if(checkParameterTypes(args, "object", "number")){
        //return this.smoothLerpSeq(...args)
      }
      break

    //smoothLerpColor(col1, col2, amt)
    case 3:
      if(checkParameterTypes(args, "object", "object", "number")){
        const amount = args[2]
        return this.color(...this._smoothLerpColorBase(
          red(args[0]), green(args[0]), blue(args[0]), 255,
          red(args[1]), green(args[1]), blue(args[1]), 255,
          amount
        ))
      }
      break

    case 7:
      if(checkParameterTypes(args, "number", "number", "number", "number", "number", "number", "number")){
        const amount = args[6]
        return this.color(...this._smoothLerpColorBase(
          args[0], args[1], args[2], 255,
          args[3], args[4], args[5], 255,
          amount
        ))
      }
      break

    case 9:
      if(checkParameterTypes(args, "number", "number", "number", "number", "number", "number", "number", "number", "number")){
        const amount = args[8]
        return this.color(...this._smoothLerpColorBase(
          args[0], args[1], args[2], args[3],
          args[4], args[5], args[6], args[7],
          amount
        ))
      }
      break    
  }
  //TODO Error message
}

//Creating my own lerp function since calling into the p5 api has a 
//massive overhead because of parameter validation
function myLerp(v1, v2, amount) {
  return v1 + (v2 - v1) * amount
}

p5.prototype._smoothLerpColorBase = function(r1, g1, b1, a1, r2, g2, b2, a2, amount) {
  const xyz1 = this.sRGB2XYZ(r1 / 255.0, g1 / 255.0, b1 / 255.0)
  const xyz2 = this.sRGB2XYZ(r2 / 255.0, g2 / 255.0, b2 / 255.0)
  const transformed1 = this.convertFunc(...xyz1)
  const transformed2 = this.convertFunc(...xyz2)

  const newXYZ = this.convertFuncInverse(
    myLerp(transformed1[0], transformed2[0], amount),
    myLerp(transformed1[1], transformed2[1], amount),
    myLerp(transformed1[2], transformed2[2], amount)
  )
  const newsRGB = this.XYZ2sRGB(...newXYZ)
  const newAlpha = myLerp(a1, a2, amount)
  return [newsRGB[0] * 255, newsRGB[1] * 255, newsRGB[2] * 255, newAlpha]
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
