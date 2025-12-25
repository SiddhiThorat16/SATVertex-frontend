// SATVertex/SATVertex-frontend/src/pages/MessagesPage.jsx

import { useEffect, useState } from 'react'
import { fetchMessages } from '../api/messages'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const data = await fetchMessages()
        if (active) setMessages(data)
      } catch (err) {
        if (active) setError('Failed to load messages')
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Messages</h1>
          <p className="text-sm text-slate-400">
            Incoming messages from the portfolio contact form.
          </p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          Total: {messages.length}
        </span>
      </div>

      {loading && (
        <p className="text-sm text-slate-400">Loading messages…</p>
      )}

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-3 py-2 inline-block">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-[minmax(0,2.2fr),minmax(0,2.5fr)]">
          {/* List */}
          <div className="rounded-2xl border border-slate-800 bg-[#050816]/90 overflow-hidden">
            <div className="border-b border-slate-800 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              Inbox
            </div>
            {messages.length === 0 ? (
              <p className="px-4 py-4 text-sm text-slate-400">
                No messages yet.
              </p>
            ) : (
              <ul className="divide-y divide-slate-800">
                {messages.map((m) => (
                  <li
                    key={m._id}
                    onClick={() => setSelected(m)}
                    className={`cursor-pointer px-4 py-3 text-sm hover:bg-slate-900/70 transition ${
                      selected?._id === m._id ? 'bg-slate-900/80' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-slate-50 font-medium">
                          {m.name}{' '}
                          <span className="text-slate-400 font-normal">
                            &lt;{m.email}&gt;
                          </span>
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {m.subject || '(No subject)'}
                        </p>
                      </div>
                      <p className="shrink-0 text-[11px] text-slate-500">
                        {formatDate(m.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Detail view */}
          <div className="rounded-2xl border border-slate-800 bg-[#050816]/90 p-4 md:p-5">
            {selected ? (
              <>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.16em] mb-1">
                    From
                  </p>
                  <p className="text-sm text-slate-50 font-medium">
                    {selected.name}{' '}
                    <span className="text-slate-400 font-normal">
                      &lt;{selected.email}&gt;
                    </span>
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.16em] mb-1">
                    Subject
                  </p>
                  <p className="text-sm text-slate-50">
                    {selected.subject || '(No subject)'}
                  </p>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.16em] mb-1">
                    Received
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.16em] mb-1">
                    Message
                  </p>
                  <p className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed">
                    {selected.message}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400">
                Select a message from the list to view details.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesPage
