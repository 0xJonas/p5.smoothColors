
import * as conv from "./colorSpaceConversions.js"
import * as cint from "./colorInterpolation.js"
import * as wp from "./whitePoints.js"

// === p5.smoothColor globals ===

p5.prototype._currentInterpolationSpace = cint.CIELab
p5.prototype._conversionFunc = conv.XYZ2Lab
p5.prototype._conversionFuncInv = conv.Lab2XYZ

p5.prototype._currentWhitePoint = wp.D65_2DEG
p5.prototype._whitePointValues = wp.whitePoints[wp.D65_2DEG]

//==========================================

p5.prototype.A_2DEG = wp.A_2DEG
p5.prototype.A_10DEG = wp.A_10DEG
p5.prototype.B_2DEG = wp.B_2DEG
p5.prototype.B_10DEG = wp.B_10DEG
p5.prototype.C_2DEG  = wp.C_2DEG 
p5.prototype.C_10DEG = wp.C_10DEG
p5.prototype.D50_2DEG  = wp.D50_2DEG 
p5.prototype.D50_10DEG = wp.D50_10DEG
p5.prototype.D55_2DEG  = wp.D55_2DEG 
p5.prototype.D55_10DEG = wp.D55_10DEG
p5.prototype.D65_2DEG  = wp.D65_2DEG 
p5.prototype.D65_10DEG = wp.D65_10DEG
p5.prototype.D75_2DEG  = wp.D75_2DEG 
p5.prototype.D75_10DEG = wp.D75_10DEG
p5.prototype.E_2DEG = wp.E_2DEG
p5.prototype.E_10DEG = wp.E_10DEG
p5.prototype.F1_2DEG = wp.F1_2DEG
p5.prototype.F1_10DEG = wp.F1_10DEG
p5.prototype.F2_2DEG = wp.F2_2DEG
p5.prototype.F2_10DEG = wp.F2_10DEG
p5.prototype.F3_2DEG = wp.F3_2DEG
p5.prototype.F3_10DEG = wp.F3_10DEG
p5.prototype.F4_2DEG = wp.F4_2DEG
p5.prototype.F4_10DEG = wp.F4_10DEG
p5.prototype.F5_2DEG = wp.F5_2DEG
p5.prototype.F5_10DEG = wp.F5_10DEG
p5.prototype.F6_2DEG = wp.F6_2DEG
p5.prototype.F6_10DEG = wp.F6_10DEG
p5.prototype.F7_2DEG = wp.F7_2DEG
p5.prototype.F7_10DEG = wp.F7_10DEG
p5.prototype.F8_2DEG = wp.F8_2DEG
p5.prototype.F8_10DEG = wp.F8_10DEG
p5.prototype.F9_2DEG = wp.F9_2DEG
p5.prototype.F9_10DEG = wp.F9_10DEG
p5.prototype.F10_2DEG = wp.F10_2DEG
p5.prototype.F10_10DEG = wp.F10_10DEG
p5.prototype.F11_2DEG = wp.F11_2DEG
p5.prototype.F11_10DEG = wp.F11_10DEG
p5.prototype.F12_2DEG = wp.F12_2DEG
p5.prototype.F12_10DEG = wp.F12_10DEG

p5.prototype.whitePoint = wp.whitePoint

//==========================================

p5.prototype.sRGB2XYZ = conv.sRGB2XYZ
p5.prototype.XYZ2sRGB = conv.XYZ2sRGB
p5.prototype.Lab2XYZ = conv.Lab2XYZ
p5.prototype.XYZ2Lab = conv.XYZ2Lab
p5.prototype.Luv2XYZ = conv.Luv2XYZ
p5.prototype.XYZ2Luv = conv.XYZ2Luv
p5.prototype.LCh2XYZ = conv.LCh2XYZ
p5.prototype.XYZ2LCh = conv.XYZ2LCh
p5.prototype.LChuv2XYZ = conv.LChuv2XYZ
p5.prototype.XYZ2LChuv = conv.XYZ2LChuv
p5.prototype.XYZ2XYZ = conv.XYZ2XYZ

//==========================================

p5.prototype.CIEXYZ = cint.CIEXYZ
p5.prototype.CIELab = cint.CIELab
p5.prototype.CIELuv = cint.CIELuv
p5.prototype.CIELCh = cint.CIELCh
p5.prototype.CIELChuv = cint.CIELChuv
p5.prototype.sRGB = cint.sRGB

p5.prototype.interpolationSpace = cint.interpolationSpace
p5.prototype.colorSequence = cint.colorSequence
p5.prototype.smoothLerpColor = cint.smoothLerpColor