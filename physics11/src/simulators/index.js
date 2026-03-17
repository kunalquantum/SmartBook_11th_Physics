import UnitConverter from './ch01_units/UnitConverter'
import ErrorSimulator from './ch01_units/ErrorSimulator'
import DimensionChecker from './ch01_units/DimensionChecker'
import VernierCaliper from './ch01_units/VernierCaliper'

import VectorExplorer from './ch02_math/VectorExplorer'
import VectorAddition from './ch02_math/VectorAddition'
import DotCrossProduct from './ch02_math/DotCrossProduct'
import CalculusMotion from './ch02_math/CalculusMotion'

import ProjectileSim from './ch03_motion/ProjectileSim'
import CircularMotion from './ch03_motion/CircularMotion'
import RelativeVelocity from './ch03_motion/RelativeVelocity'

export const SIMULATORS = {
    ch01_t0: UnitConverter,
    ch01_t1: ErrorSimulator,
    ch01_t2: DimensionChecker,
    ch01_t3: VernierCaliper,

    ch02_t0: VectorExplorer,
    ch02_t1: VectorAddition,
    ch02_t2: DotCrossProduct,
    ch02_t3: CalculusMotion,

    ch03_t0: ProjectileSim,
    ch03_t1: CircularMotion,
    ch03_t2: RelativeVelocity,
}
