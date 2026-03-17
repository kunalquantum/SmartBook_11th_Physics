import { useState } from 'react'
import SimSlider from '../../components/ui/SimSlider'

const UNITS = {
    Length: { base: 'm', factors: { mm: 1e-3, cm: 0.01, m: 1, km: 1000, inch: 0.0254, foot: 0.3048 } },
    Mass: { base: 'kg', factors: { g: 0.001, kg: 1, tonne: 1000, lb: 0.4536, oz: 0.02835 } },
    Time: { base: 's', factors: { ms: 0.001, s: 1, min: 60, hr: 3600, day: 86400 } },
    Pressure: { base: 'Pa', factors: { Pa: 1, kPa: 1000, bar: 1e5, atm: 101325, mmHg: 133.3 } },
}

export default function UnitConverter() {
    const [quantity, setQuantity] = useState('Length')
    const [from, setFrom] = useState('cm')
    const [to, setTo] = useState('m')
    const [val, setVal] = useState(100)

    const q = UNITS[quantity]
    const result = (val * q.factors[from]) / q.factors[to]
    const units = Object.keys(q.factors)

    const sel = (v, fn) => (
        <select value={v} onChange={e => fn(e.target.value)} style={{
            background: 'var(--bg3)', border: '1px solid var(--border2)',
            color: 'var(--text1)', borderRadius: 6, padding: '5px 10px',
            fontFamily: 'var(--mono)', fontSize: 13, cursor: 'pointer',
        }}>
            {units.map(u => <option key={u}>{u}</option>)}
        </select>
    )

    return (
        <div>
            {/* Quantity selector */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                {Object.keys(UNITS).map(k => (
                    <button key={k} onClick={() => { setQuantity(k); const u = Object.keys(UNITS[k].factors); setFrom(u[0]); setTo(u[1]) }}
                        style={{
                            padding: '4px 14px', borderRadius: 20, fontSize: 12,
                            fontFamily: 'var(--mono)', cursor: 'pointer',
                            background: quantity === k ? 'var(--amber)' : 'var(--bg3)',
                            color: quantity === k ? '#000' : 'var(--text2)',
                            border: '1px solid var(--border2)',
                        }}>
                        {k}
                    </button>
                ))}
            </div>

            <SimSlider label="Value" unit={` ${from}`} value={val} min={0.1} max={10000} step={0.1} onChange={setVal} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                {sel(from, setFrom)}
                <span style={{ color: 'var(--text3)', fontFamily: 'var(--mono)' }}>→</span>
                {sel(to, setTo)}
            </div>

            {/* Result */}
            <div style={{
                marginTop: 20, padding: '16px 20px',
                background: 'var(--bg3)', borderRadius: 10,
                border: '1px solid var(--border2)',
                display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap',
            }}>
                <span style={{ fontSize: 13, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{val} {from} =</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--amber)', fontFamily: 'var(--mono)' }}>
                    {result < 0.001 || result > 1e6 ? result.toExponential(4) : parseFloat(result.toFixed(6))}
                </span>
                <span style={{ fontSize: 18, color: 'var(--text2)', fontFamily: 'var(--mono)' }}>{to}</span>
            </div>

            {/* Dimension tag */}
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                Base SI unit: <span style={{ color: 'var(--teal)' }}>{q.base}</span>
            </div>
        </div>
    )
}