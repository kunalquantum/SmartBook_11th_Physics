import TopicCard from '../topic/TopicCard'
import ProgressBar from '../ui/ProgressBar'
import StatCard from '../ui/StatCard'

export default function ChapterView({ chapter, done, onToggle, chapterDone }) {
    const count = chapterDone(chapter.id, chapter.topics.length)
    const pct = Math.round((count / chapter.topics.length) * 100)

    const handleAsk = () => {
        const topics = chapter.topics.map(t => t.name).join(', ')
        const msg = `I'm studying Maharashtra State Board Class 11 Physics — Chapter ${chapter.id}: "${chapter.title}". Topics: ${topics}. Give me a focused overview + exam tips for this chapter.`
        window.open(`https://claude.ai/new?q=${encodeURIComponent(msg)}`, '_blank')
    }

    return (
        <div style={{ padding: '24px 28px' }}>
            {/* Chapter meta */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--teal)', letterSpacing: 2, marginBottom: 4 }}>
                    {chapter.unit}
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text1)', marginBottom: 6 }}>
                    Ch {chapter.id}: {chapter.title}
                </h1>
                <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 560, lineHeight: 1.6, marginBottom: 14 }}>
                    {chapter.desc}
                </p>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
                    <StatCard value={chapter.topics.length} label="Topics" />
                    <StatCard value={count} label="Done" />
                    <StatCard value={`${pct}%`} label="Progress" />
                </div>

                <ProgressBar value={count} max={chapter.topics.length} height={4} />
            </div>

            {/* Topics grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 12,
                marginBottom: 20,
            }}>
                {chapter.topics.map((topic, i) => (
                    <TopicCard
                        key={i}
                        topic={topic}
                        index={i}
                        chId={chapter.id}
                        isDone={done.has(`${chapter.id}-${i}`)}
                        onToggle={onToggle}
                    />
                ))}
            </div>

            {/* Ask Claude button */}
            <button
                onClick={handleAsk}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(239,159,39,0.1)',
                    border: '1px solid rgba(239,159,39,0.3)',
                    color: 'var(--amber)', borderRadius: 8,
                    padding: '8px 18px', fontSize: 13,
                    transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,159,39,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,159,39,0.1)'}
            >
                Ask Claude about this chapter ↗
            </button>
        </div>
    )
}