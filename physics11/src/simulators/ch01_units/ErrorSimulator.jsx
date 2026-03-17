import { useState, useMemo } from 'react'
import SimSlider from '../../components/ui/SimSlider'

export default function ErrorSimulator() {
    const [readings, setReadings] = useState([9.8, 9.9, 9.7, 10.1, 9.8])
    const [newVal, setNewVal] = useState(9.9)

    const mean = useMemo(() => readings.reduce((a, b) => a + b, 0) / readings.length, [readings])
    const absErrors = readings.map(r => Math.abs(r - mean))
    const meanErr = absErrors.reduce((a, b) => a + b, 0) / readings.length
    const relErr = (meanErr / mean) * 100

    const addReading = () => { if (readings.length < 8) setReadings(p => [...p, newVal]) }
    const reset = () => setReadings([9.8, 9.9, 9.7, 10.1, 9.8])

    const barW = 260

    return (
        <div>
            <SimSlider label="New reading" unit=" m/s²" value={newVal} min={8} max={12} step={0.1} onChange={setNewVal} />

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <button onClick={addReading} disabled={readings.length >= 8} style={{
                    padding: '6px 16px', borderRadius: 6, fontSize: 12, fontFamily: 'var(--mono)',
                    background: 'var(--teal)', color: '#fff', border: 'none', cursor: 'pointer', opacity: readings.length >= 8 ? 0.4 : 1,
                }}>+ Add</button>
                <button onClick={reset} style={{
                    padding: '6px 16px', borderRadius: 6, fontSize: 12, fontFamily: 'var(--mono)',
                    background: 'var(--bg3)', color: 'var(--text2)', border: '1px solid var(--border)', cursor: 'pointer',
                }}>Reset</button>
            </div>

            {/* Bar chart of readings */}
            <div style={{ marginBottom: 20 }}>
                {readings.map((r, i) => {
                    const fill = (r - 8) / 4
                    return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text3)', minWidth: 16 }}>R{i + 1}</span>
                            <div style={{ width: Math.round(fill * barW), height: 14, background: Math.abs(r - mean) > meanErr ? 'var(--coral)' : 'var(--teal)', borderRadius: 3, transition: 'width 0.3s' }} />
                            <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--text2)' }}>{r}</span>
                            <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--text3)' }}>±{Math.abs(r - mean).toFixed(2)}</span>
                        </div>
                    )
                })}
                {/* Mean line */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
                    <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--amber)', minWidth: 16 }}>μ</span>
                    <div style={{ width: Math.round(((mean - 8) / 4) * barW), height: 14, background: 'var(--amber)', borderRadius: 3, opacity: 0.7 }} />
                    <span style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--amber)' }}>{mean.toFixed(3)}</span>
                </div>
            </div>

            {/* Result cards */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                    { label: 'Mean value', val: `${mean.toFixed(3)} m/s²`, color: 'var(--amber)' },
                    { label: 'Mean abs. error', val: `± ${meanErr.toFixed(3)}`, color: 'var(--teal)' },
                    { label: 'Relative error', val: `${relErr.toFixed(2)}%`, color: 'var(--coral)' },
                ].map(c => (
                    <div key={c.label} style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 16px', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: 4 }}>{c.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--mono)', color: c.color }}>{c.val}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                Result: g = {mean.toFixed(3)} ± {meanErr.toFixed(3)} m/s²
            </div>
        </div>
    )
}