import { useState } from 'react'
import SimSlider from '../../components/ui/SimSlider'

export default function VernierCaliper() {
    const [mm, setMm] = useState(23.4)

    const mainScale = Math.floor(mm)           // mm
    const vernier = Math.round((mm % 1) * 10) // 0–9 VSD
    const lc = 0.1                       // Least Count
    const reading = mainScale + vernier * lc

    const W = 420, H = 90
    const mainDiv = 20   // pixels per mm shown
    const jawPos = mm * mainDiv

    return (
        <div>
            <SimSlider label="Move jaw" unit=" mm" value={mm} min={0} max={20} step={0.1} onChange={setMm} />

            {/* SVG caliper */}
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', marginBottom: 16 }}>
                {/* Main scale rail */}
                <rect x={10} y={38} width={W - 20} height={12} rx={3} fill="#1A3350" stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />

                {/* Main scale ticks */}
                {Array.from({ length: 21 }, (_, i) => (
                    <g key={i}>
                        <line x1={10 + i * mainDiv} y1={38} x2={10 + i * mainDiv} y2={i % 5 === 0 ? 28 : 32}
                            stroke="rgba(255,255,255,0.35)" strokeWidth={i % 5 === 0 ? 1.5 : 0.8} />
                        {i % 5 === 0 && <text x={10 + i * mainDiv} y={24} textAnchor="middle"
                            style={{ fontSize: 9, fill: 'rgba(160,176,200,0.8)', fontFamily: 'var(--mono)' }}>{i}</text>}
                    </g>
                ))}

                {/* Fixed jaw */}
                <rect x={8} y={20} width={16} height={60} rx={3} fill="#112236" stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />

                {/* Moving jaw */}
                <rect x={10 + jawPos} y={20} width={14} height={60} rx={3} fill="#1D9E75" stroke="rgba(29,158,117,0.6)" strokeWidth={1} />

                {/* Vernier scale on moving jaw */}
                {Array.from({ length: 11 }, (_, i) => {
                    const spacing = mainDiv * 0.9
                    const x = 10 + jawPos + i * spacing
                    return (
                        <g key={i}>
                            <line x1={x} y1={50} x2={x} y2={i === vernier ? 60 : 56}
                                stroke={i === vernier ? 'var(--amber)' : 'rgba(255,255,255,0.25)'}
                                strokeWidth={i === vernier ? 2 : 0.8} />
                            {i % 5 === 0 && <text x={x} y={70} textAnchor="middle"
                                style={{ fontSize: 8, fill: 'rgba(160,176,200,0.6)', fontFamily: 'var(--mono)' }}>{i}</text>}
                        </g>
                    )
                })}

                {/* Coinciding line highlight */}
                <line x1={10 + jawPos + vernier * mainDiv * 0.9} y1={48}
                    x2={10 + jawPos + vernier * mainDiv * 0.9} y2={62}
                    stroke="var(--amber)" strokeWidth={2} />
            </svg>

            {/* Reading breakdown */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                    { label: 'Main scale', val: `${mainScale} mm` },
                    { label: `Vernier (×${lc})`, val: `${vernier} div` },
                    { label: 'Total reading', val: `${reading.toFixed(1)} mm`, highlight: true },
                ].map(c => (
                    <div key={c.label} style={{
                        background: 'var(--bg3)', borderRadius: 8, padding: '10px 16px',
                        border: `1px solid ${c.highlight ? 'rgba(239,159,39,0.4)' : 'var(--border)'}`,
                    }}>
                        <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: 4 }}>{c.label}</div>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--mono)', color: c.highlight ? 'var(--amber)' : 'var(--text2)' }}>{c.val}</div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text3)', fontFamily: 'var(--mono)' }}>
                Formula: Reading = Main Scale ({mainScale}) + Vernier ({vernier}) × LC ({lc}) = <span style={{ color: 'var(--amber)' }}>{reading.toFixed(1)} mm</span>
            </div>
        </div>
    )
}