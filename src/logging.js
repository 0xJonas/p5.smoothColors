
const ILLEGAL_ARGUMENT_ERROR = Symbol("IllegalArgumentError")

const errorNames = {
  [ILLEGAL_ARGUMENT_ERROR]: "IllegalArgumentError"
}

const NEW_YEAR = Symbol("new year")
const EASTER = Symbol("easter")
const HALLOWEEN = Symbol("halloween")
const CHRISTMAS = Symbol("christmas")
const DEFAULT = Symbol("default flair")

const flairs = {
    [DEFAULT]: ["🌈", "🍭", "🎨", "🦋", "🦜"], // Default
    [NEW_YEAR]: ["🥂", "🕛", "🎆", "🎇", "🌃"], // New year
    [EASTER]: ["🐇", "🥚", "🍬", "🌕", "🎀"], // Easter
    [HALLOWEEN]: ["🦇", "🎃", "👻", "🕷", "💀"], // Halloween
    [CHRISTMAS]: ["🎅", "🎄", "❄", "⛄", "🎁"] // Christmas
}

/*
 * Special modulo operation that always yields a positive result.
 */
function modulo(val, modulus) {
  const result = val % modulus
  if(result < 0)
    return result + modulus
  else
    return result
}

/*
 * Find the date of easter for a given year.
 * Reference: https://www.algorithm-archive.org/contents/computus/computus.html
 */
function computus(year) {
  const lunationLength = 30
  const metonicIndex = modulo(year, 19)  //Current position in the metonic cycle
  const century = Math.floor(year / 100.0)

  // years which are multiple of 100 are not leap years, unless they are also a multiple of 400.
  // That means that three leap days are 'skipped' every 400 years.
  const skippedLeapDays = century - Math.floor(year / 400)

  // The metonic cycle does not perfectly align with the years, as there is a drift of 8 days every 2500 years.
  // The 13 is an offset to further align the metonic cycles with empirical observation.
  const metonicDrift = Math.floor((13.0 + 8.0 * century) / 25.0)

  // The '15 - 11 * metonicIndex' calculates the offset from March 21st to the beginning of the next
  // lunation, i.e the full moon. This result is then corrected by applying the metonic drift and adding the
  // skipped leap days.
  const daysFromVernalEquinox = modulo(15 - 11 * metonicIndex - metonicDrift + skippedLeapDays, lunationLength)

  // This expression in mod 7 will yield -1 for common years and -2 for leap years to account for the fact
  // that one year is 1 (or 2) days longer than 52 weeks.
  const correction = 2 * (year % 4) + 4 * (year % 7)

  // First, get the offset from the vernal equinox to the next sunday via 4 - daysFromVernalEquinox
  // This part of the formula is actually (7 - (daysFromVernalEquinox % 7)) % 7 which simplifies to just -daysFromVernalEquinox
  // Then apply the corrections.
  let offsetToNextSunday = modulo(4 - daysFromVernalEquinox + skippedLeapDays + correction, 7)

  //Strange correction
  if((metonicIndex > 10 && daysFromVernalEquinox == 28 && offsetToNextSunday == 6) ||
    (daysFromVernalEquinox == 29 && offsetToNextSunday == 6))
  {
    offsetToNextSunday = -1
  }

  if(22 + daysFromVernalEquinox + offsetToNextSunday > 31)
    return [daysFromVernalEquinox + offsetToNextSunday - 9, 3]
  else
    return [daysFromVernalEquinox + offsetToNextSunday + 22, 2]
}

/*
Selects a flair set based on the current date.
*/
function selectFlairSet(){
  const currentDate = new Date()
  const today = currentDate.getDate()
  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const [easterDate, easterMonth] = computus(year)

  if((today == 31 && month == 11) || (today == 1 && month == 0))
    return flairs[NEW_YEAR]
  
  if(today == easterDate && month == easterMonth)
    return flairs[EASTER]

  if(today == 31 && month == 9)
    return flairs[HALLOWEEN]

  if((today == 24 || today == 25 || today == 26) && month == 11)
    return flairs[CHRISTMAS]

  return flairs[DEFAULT]
}

const flairSet = selectFlairSet()

function error(errorType, message, funcName) {
  const flair = flairSet[Math.floor(Math.random() * flairSet.length)]
  throw new Error(errorNames[errorType], `${flair} p5.smoothColors: ${message}\n In function ${funcName}`)
}

function checkParameterTypes(funcName, args, ...types){
  const actualTypes = args.map(a => typeof a)
  const valid = actualTypes
    .map((element, index) => element == types[index])
    .reduce((a, b) => a && b)
  if(!valid)
    error(ILLEGAL_ARGUMENT_ERROR, `${funcName} can not be called with these parameter types: ${actualTypes}`, funcName)
}

export {
  ILLEGAL_ARGUMENT_ERROR,
  error,
  checkParameterTypes
}