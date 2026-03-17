import UnitConverter from './ch01_units/UnitConverter'
import ErrorSimulator from './ch01_units/ErrorSimulator'
import DimensionChecker from './ch01_units/DimensionChecker'
import VernierCaliper from './ch01_units/VernierCaliper'

export const SIMULATORS = {
    ch01_t0: UnitConverter,
    ch01_t1: ErrorSimulator,
    ch01_t2: DimensionChecker,
    ch01_t3: VernierCaliper,
}