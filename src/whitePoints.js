
const WP_X = Symbol("x")
const WP_Y = Symbol("y")
const WP_Z = Symbol("z")
const WP_U = Symbol("u")
const WP_V = Symbol("v")

function initWhitePoint(x, y) {
  return {
    X: x / y,
    Y: 1.0,
    Z: (1.0 - x - y) / y,
    u: 4.0 * x / (-2.0 * x + 12.0 * y + 3),
    v: 9.0 * x / (-2.0 * x + 12.0 * y + 3)
  }
}

const A_2DEG  = Symbol("a 2deg")
const A_10DEG = Symbol("a 10deg")
const B_2DEG  = Symbol("b 2deg")
const B_10DEG = Symbol("b 10deg")
const C_2DEG  = Symbol("c 2deg")
const C_10DEG = Symbol("c 10deg")
const D50_2DEG  = Symbol("d50 2deg")
const D50_10DEG = Symbol("d50 10deg")
const D55_2DEG  = Symbol("d55 2deg")
const D55_10DEG = Symbol("d55 10deg")
const D65_2DEG  = Symbol("d65 2deg")
const D65_10DEG = Symbol("d65 10deg")
const D75_2DEG  = Symbol("d75 2deg")
const D75_10DEG = Symbol("d75 10deg")
const E_2DEG  = Symbol("e 2deg")
const E_10DEG = Symbol("e 10deg")
const F1_2DEG  = Symbol("f1 2deg")
const F1_10DEG = Symbol("f1 10deg")
const F2_2DEG  = Symbol("f2 2deg")
const F2_10DEG = Symbol("f2 10deg")
const F3_2DEG  = Symbol("f3 2deg")
const F3_10DEG = Symbol("f3 10deg")
const F4_2DEG  = Symbol("f4 2deg")
const F4_10DEG = Symbol("f4 10deg")
const F5_2DEG  = Symbol("f5 2deg")
const F5_10DEG = Symbol("f5 10deg")
const F6_2DEG  = Symbol("f6 2deg")
const F6_10DEG = Symbol("f6 10deg")
const F7_2DEG  = Symbol("f7 2deg")
const F7_10DEG = Symbol("f7 10deg")
const F8_2DEG  = Symbol("f8 2deg")
const F8_10DEG = Symbol("f8 10deg")
const F9_2DEG  = Symbol("f9 2deg")
const F9_10DEG = Symbol("f9 10deg")
const F10_2DEG  = Symbol("f10 2deg")
const F10_10DEG = Symbol("f10 10deg")
const F11_2DEG  = Symbol("f11 2deg")
const F11_10DEG = Symbol("f11 10deg")
const F12_2DEG  = Symbol("f12 2deg")
const F12_10DEG = Symbol("f12 10deg")

const whitePoints = {
  [A_2DEG]:    initWhitePoint(0.44757, 0.40745),
  [A_10DEG]:   initWhitePoint(0.45117, 0.40594),
  [B_2DEG]:    initWhitePoint(0.34842, 0.35161),
  [B_10DEG]:   initWhitePoint(0.34980, 0.35270),
  [C_2DEG]:    initWhitePoint(0.31006, 0.31616),
  [C_10DEG]:   initWhitePoint(0.31039, 0.31905),
  [D50_2DEG]:  initWhitePoint(0.34567, 0.35850),
  [D50_10DEG]: initWhitePoint(0.34773, 0.35952),
  [D55_2DEG]:  initWhitePoint(0.33242, 0.34743),
  [D55_10DEG]: initWhitePoint(0.33411, 0.34877),
  [D65_2DEG]:  initWhitePoint(0.31271, 0.32902),
  [D65_10DEG]: initWhitePoint(0.31382, 0.33100),
  [D75_2DEG]:  initWhitePoint(0.29902, 0.31485),
  [D75_10DEG]: initWhitePoint(0.29968, 0.31740),
  [E_2DEG]:    initWhitePoint(1.0 / 3.0, 1.0 / 3.0),
  [E_10DEG]:   initWhitePoint(1.0 / 3.0, 1.0 / 3.0),
  [F1_2DEG]:   initWhitePoint(0.31310, 0.33727),
  [F1_10DEG]:  initWhitePoint(0.31811, 0.33559),
  [F2_2DEG]:   initWhitePoint(0.37208, 0.37529),
  [F2_10DEG]:  initWhitePoint(0.37925, 0.36733),
  [F3_2DEG]:   initWhitePoint(0.40910, 0.39430),
  [F3_10DEG]:  initWhitePoint(0.41761, 0.38324),
  [F4_2DEG]:   initWhitePoint(0.44018, 0.40329),
  [F4_10DEG]:  initWhitePoint(0.44920, 0.39074),
  [F5_2DEG]:   initWhitePoint(0.31379, 0.34531),
  [F5_10DEG]:  initWhitePoint(0.31975, 0.34246),
  [F6_2DEG]:   initWhitePoint(0.37790, 0.38835),
  [F6_10DEG]:  initWhitePoint(0.38660, 0.37847),
  [F7_2DEG]:   initWhitePoint(0.31292, 0.32933),
  [F7_10DEG]:  initWhitePoint(0.31569, 0.32960),
  [F8_2DEG]:   initWhitePoint(0.34588, 0.35875),
  [F8_10DEG]:  initWhitePoint(0.34902, 0.35939),
  [F9_2DEG]:   initWhitePoint(0.37417, 0.37281),
  [F9_10DEG]:  initWhitePoint(0.37829, 0.37045),
  [F10_2DEG]:  initWhitePoint(0.34609, 0.35986),
  [F10_10DEG]: initWhitePoint(0.35090, 0.35444),
  [F11_2DEG]:  initWhitePoint(0.38052, 0.37713),
  [F11_10DEG]: initWhitePoint(0.38541, 0.37123),
  [F12_2DEG]:  initWhitePoint(0.43695, 0.40441),
  [F12_10DEG]: initWhitePoint(0.44256, 0.39717)
}

function whitePoint(wp) {
  if(wp === undefined)
    return this.currentWhitePoint
  else 
    this.currentWhitePoint = wp
}

export {
  A_2DEG,
  A_10DEG,
  B_2DEG,
  B_10DEG,
  C_2DEG ,
  C_10DEG,
  D50_2DEG ,
  D50_10DEG,
  D55_2DEG ,
  D55_10DEG,
  D65_2DEG ,
  D65_10DEG,
  D75_2DEG ,
  D75_10DEG,
  E_2DEG,
  E_10DEG,
  F1_2DEG,
  F1_10DEG,
  F2_2DEG,
  F2_10DEG,
  F3_2DEG,
  F3_10DEG,
  F4_2DEG,
  F4_10DEG,
  F5_2DEG,
  F5_10DEG,
  F6_2DEG,
  F6_10DEG,
  F7_2DEG,
  F7_10DEG,
  F8_2DEG,
  F8_10DEG,
  F9_2DEG,
  F9_10DEG,
  F10_2DEG,
  F10_10DEG,
  F11_2DEG,
  F11_10DEG,
  F12_2DEG,
  F12_10DEG,

  whitePoint,
  whitePoints
}