import { useState } from 'react'

const FORMULAS = [
    { name: 'v = u + at', lhs: 'LT⁻¹', rhs: 'LT⁻¹', terms: ['LT⁻¹', 'LT⁻¹'], ok: true },
    { name: 'F = ma', lhs: 'MLT⁻²', rhs: 'MLT⁻²', terms: ['M', 'LT⁻²'], ok: true },
    { name: 'E = mc²', lhs: 'ML²T⁻²', rhs: 'ML²T⁻²', terms: ['M', 'L²T⁻²'], ok: true },
    { name: 'P = mv', lhs: 'MLT⁻¹', rhs: 'MLT⁻¹', terms: ['M', 'LT⁻¹'], ok: true },
    { name: 'KE = ½mv²', lhs: 'ML²T⁻²', rhs: 'ML²T⁻²', terms: ['M', 'L²T⁻²'], ok: true },
    { name: 'v = u + t (wrong)', lhs: 'LT⁻¹', rhs: 'LT⁻¹+T', terms: ['LT⁻¹', 'T'], ok: false },
]

export default function DimensionChecker() {
    const [sel, setSel] = useState(0)
    const [shown, setShown] = useState(false)
    const f = FORMULAS[sel]

    return (
        <div>
            <div style={{ fontSize: 12, color: 'var(--text2)', fontFamily: 'var(--mono)', marginBottom: 12 }}>
                Select a formula — predict if it's dimensionally correct:
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {FORMULAS.map((f, i) => (
                    <button key={i} onClick={() => { setSel(i); setShown(false) }}
                        style={{
                            padding: '5px 12px', borderRadius: 6, fontSize: 12,
                            fontFamily: 'var(--mono)', cursor: 'pointer',
                            background: sel === i ? 'var(--bg3)' : 'transparent',
                            color: sel === i ? 'var(--amber)' : 'var(--text3)',
                            border: `1px solid ${sel === i ? 'var(--amber)' : 'var(--border)'}`,
                        }}>
                        {f.name}
                    </button>
                ))}
            </div>

            {/* LHS box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
                <div style={{
                    background: 'var(--bg3)', border: '1px solid var(--border2)',
                    borderRadius: 10, padding: '14px 20px', textAlign: 'center', minWidth: 120,
                }}>
                    <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: 6 }}>LHS</div>
                    <div style={{ fontSize: 20, fontFamily: 'var(--mono)', color: 'var(--amber)' }}>{f.lhs}</div>
                </div>

                <div style={{ fontSize: 22, color: 'var(--text3)' }}>≟</div>

                <div style={{
                    background: 'var(--bg3)', border: '1px solid var(--border2)',
                    borderRadius: 10, padding: '14px 20px', textAlign: 'center', minWidth: 120,
                }}>
                    <div style={{ fontSize: 10, color: 'var(--text3)', fontFamily: 'var(--mono)', marginBottom: 6 }}>RHS</div>
                    <div style={{ fontSize: 20, fontFamily: 'var(--mono)', color: 'var(--amber)' }}>{f.rhs}</div>
                </div>

                <button onClick={() => setShown(true)} style={{
                    padding: '8px 20px', borderRadius: 8, fontSize: 13,
                    fontFamily: 'var(--mono)', cursor: 'pointer',
                    background: 'rgba(239,159,39,0.15)', color: 'var(--amber)',
                    border: '1px solid rgba(239,159,39,0.3)',
                }}>
                    Check →
                </button>
            </div>

            {shown && (
                <div style={{
                    padding: '14px 18px', borderRadius: 10,
                    background: f.ok ? 'rgba(29,158,117,0.1)' : 'rgba(216,90,48,0.1)',
                    border: `1px solid ${f.ok ? 'rgba(29,158,117,0.3)' : 'rgba(216,90,48,0.3)'}`,
                    fontFamily: 'var(--mono)', fontSize: 14,
                    color: f.ok ? 'var(--teal)' : 'var(--coral)',
                }}>
                    {f.ok ? '✓ Dimensionally correct — equation is valid' : '✗ Dimensionally incorrect — this equation cannot be right'}
                </div>
            )}
        </div>
    )
}