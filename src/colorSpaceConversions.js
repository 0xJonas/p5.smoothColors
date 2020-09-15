import * as wp from "./whitePoints.js"

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

const matrixsRGB2XYZ = createConversionMatrix(0.64, 0.33, 0.3, 0.6, 0.15, 0.06, 0.3127, 0.329)
const matrixXYZ2sRGB = invertMatrix3x3(matrixsRGB2XYZ)

function sRGB2XYZ(r, g, b) {
  const linR = sRGBDigamma(r)
  const linG = sRGBDigamma(g)
  const linB = sRGBDigamma(b)
  return multMatrixVector3x3(matrixsRGB2XYZ, [linR, linG, linB])
}

function XYZ2sRGB(x, y, z) {
  const [linR, linG, linB] = multMatrixVector3x3(matrixXYZ2sRGB, [x, y, z])
  return [sRGBGamma(linR), sRGBGamma(linG), sRGBGamma(linB)]
}

function XYZ2Lab(x, y, z) {
  const L = 116.0 * LabGamma(y / this._whitePointValues.Y) - 16
  const a = 500.0 * (LabGamma(x / this._whitePointValues.X) - LabGamma(y / this._whitePointValues.Y))
  const b = 200.0 * (LabGamma(y / this._whitePointValues.Y) - LabGamma(z / this._whitePointValues.Z))
  return [L, a, b]
}

function Lab2XYZ(L, a, b) {
  const x = this._whitePointValues.X * LabDigamma((L + 16) / 116.0 + a / 500.0)
  const y = this._whitePointValues.Y * LabDigamma((L + 16) / 116.0)
  const z = this._whitePointValues.Z * LabDigamma((L + 16) / 116.0 - b / 200.0)
  return [x, y, z]
}

function XYZ2Luv(x, y, z) {
  if (x + y + z == 0.0)
    return [0, 0, 0]
  const L = (y <= deltaCubed) ? Math.pow(29.0 / 3.0, 3.0) * y / this._whitePointValues.Y
                              : 116.0 * Math.cbrt(y / this._whitePointValues.Y) - 16.0
  const uPrime = 4.0 * x / (x + 15.0 * y + 3.0 * z)
  const vPrime = 9.0 * y / (x + 15.0 * y + 3.0 * z)
  const u = 13.0 * L * (uPrime - this._whitePointValues.U)
  const v = 13.0 * L * (vPrime - this._whitePointValues.V)
  return [L, u, v]
}

function Luv2XYZ(L, u, v) {
  if (L == 0.0)
    return [0, 0, 0]
  const uPrime = u / 13.0 / L + this._whitePointValues.U
  const vPrime = v / 13.0 / L + this._whitePointValues.V
  const y = (L <= 8.0) ? L * Math.pow(3.0 / 29.0, 3.0) * this._whitePointValues.Y
                       : Math.pow((L + 16.0) / 116.0, 3) * this._whitePointValues.Y
  const x = y * 9.0 * uPrime / 4.0 / vPrime
  const z = y * (12.0 - 3.0 * uPrime - 20.0 * vPrime) / 4.0 / vPrime
  return [x, y, z]
}

function XYZ2LCh(x, y, z) {
  const [L, a, b] = XYZ2Lab(x, y, z)
  return [L, Math.sqrt((a * a) + (b * b)), Math.atan2(b, a)] 
}

function LCh2XYZ(L, C, h) {
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  return Lab2XYZ(L, a, b)
}

function XYZ2LChuv(x, y, z) {
  const [L, u, v] = XYZ2Luv(x, y, z)
  return [L, Math.sqrt((u * u) + (v * v)), Math.atan2(v, u)] 
}

function LChuv2XYZ(L, C, h) {
  const u = C * Math.cos(h)
  const v = C * Math.sin(h)
  return Luv2XYZ(L, u, v)
}


function XYZ2XYZ(x, y, z) {
  return [x, y, z]
}

export {
  sRGB2XYZ, XYZ2sRGB,
  Lab2XYZ, XYZ2Lab,
  Luv2XYZ, XYZ2Luv,
  LCh2XYZ, XYZ2LCh,
  LChuv2XYZ, XYZ2LChuv,
  XYZ2XYZ
}