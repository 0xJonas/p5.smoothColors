import * as conv from "./colorSpaceConversions.js"
import * as log from "./logging.js"

const CIEXYZ = Symbol("CIEXYZ")
const CIELab = Symbol("CIELab")
const CIELuv = Symbol("CIELuv")
const CIELCh = Symbol("CIELCh")
const CIELChuv = Symbol("CIELChuv")
const CIECAM02 = Symbol("CIECAM02")
const sRGB = Symbol("sRGB")

const conversionFuncs = {
  [CIEXYZ]:   [conv.XYZ2XYZ,   conv.XYZ2XYZ],
  [CIELab]:   [conv.XYZ2Lab,   conv.Lab2XYZ],
  [CIELuv]:   [conv.XYZ2Luv,   conv.Luv2XYZ],
  [CIELCh]:   [conv.XYZ2LCh,   conv.LCh2XYZ],
  [CIELChuv]: [conv.XYZ2LChuv, conv.LChuv2XYZ],
  [CIECAM02]: [conv.XYZ2CAM02, conv.CAM022XYZ],
  [sRGB]:     [conv.XYZ2sRGB,  conv.sRGB2XYZ]
}

function interpolationSpace(space) {
  if (space === undefined)
    return this._currentInterpolationSpace
  else {
    if (space in conversionFuncs)
      this._currentInterpolationSpace = space
    log.error(log.ILLEGAL_ARGUMENT_ERROR, `${space} is not a valid interpolation space.`, "interpolationSpace")
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

function colorSequence(...args){
  if(args.length & 1 !== 0) {
    log.error(log.ILLEGAL_ARGUMENT_ERROR, "Parameters to colorSequence() must be alternating color and amount values.", "colorSequence")
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

//Creating my own lerp function since calling into the p5 api has a 
//massive overhead because of parameter validation
function myLerp(v1, v2, amount) {
  return v1 + (v2 - v1) * amount
}

function smoothLerpColorBase(r1, g1, b1, a1, r2, g2, b2, a2, amount) {
  const [conversionFunc, conversionFuncInv] = conversionFuncs[this._currentInterpolationSpace]

  const xyz1 = this.sRGB2XYZ(r1 / 255.0, g1 / 255.0, b1 / 255.0)
  const xyz2 = this.sRGB2XYZ(r2 / 255.0, g2 / 255.0, b2 / 255.0)
  const transformed1 = conversionFunc.call(this, ...xyz1)
  const transformed2 = conversionFunc.call(this, ...xyz2)

  const newXYZ = conversionFuncInv.call(
    this,
    myLerp(transformed1[0], transformed2[0], amount),
    myLerp(transformed1[1], transformed2[1], amount),
    myLerp(transformed1[2], transformed2[2], amount)
  )
  const newsRGB = this.XYZ2sRGB(...newXYZ)
  const newAlpha = myLerp(a1, a2, amount)
  return [newsRGB[0] * 255, newsRGB[1] * 255, newsRGB[2] * 255, newAlpha]
}

function smoothLerpColorSeq(seq, amount) {
  
}

function smoothLerpColor(...args) {
  switch(args.length){
    //smoothLerpColor(colorSeq, amount)
    case 2:
      checkParameterTypes(args, "object", "number")
        //return this.smoothLerpSeq(...args)

    //smoothLerpColor(col1, col2, amount)
    case 3:
      checkParameterTypes(args, "object", "object", "number")
      const amount = args[2]
      return color(...smoothLerpColorBase.call(
        this,
        red(args[0]), green(args[0]), blue(args[0]), 255,
        red(args[1]), green(args[1]), blue(args[1]), 255,
        amount
      ))

    //smoothLerpColor(r1, g1, b1, r2, g2, b2, amount)
    case 7:
      checkParameterTypes(args, "number", "number", "number", "number", "number", "number", "number")
      const amount = args[6]
      return color(...smoothLerpColorBase.call(
        this,
        args[0], args[1], args[2], 255,
        args[3], args[4], args[5], 255,
        amount
      ))

    //smoothLerpColor(r1, g1, b1, a1, r2, g2, b2, a2, amount)
    case 9:
      checkParameterTypes("smoothLerpColor", args, "number", "number", "number", "number", "number", "number", "number", "number", "number")
      const amount = args[8]
      return color(...smoothLerpColorBase.call(
        this,
        args[0], args[1], args[2], args[3],
        args[4], args[5], args[6], args[7],
        amount
      ))    
  }
}

export {
  CIEXYZ,
  CIELab,
  CIELuv,
  CIELCh,
  CIELChuv,
  CIECAM02,
  sRGB,
  interpolationSpace,
  colorSequence,
  smoothLerpColor
}