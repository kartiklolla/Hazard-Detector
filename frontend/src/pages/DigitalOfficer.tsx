import { Box, Card, CardContent, Chip, IconButton, Stack, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Message = { role: 'user' | 'assistant', content: string, table?: { columns: string[], rows: any[][] } }

const suggestions = [
	'Check compliance for Mine X',
	'Summarize Q1 2022 fatalities',
	'Show methane-related accidents in 2021',
	'Generate preventive actions for machinery incidents',
]

export default function DigitalOfficer() {
	const [messages, setMessages] = useState<Message[]>([
		{ role: 'assistant', content: 'Hello! I am your Digital Mine Safety Officer. Ask me about incidents, compliance, or to generate audit-ready summaries.' },
	])
	const [input, setInput] = useState('')

	const send = () => {
		if (!input.trim()) return
		const userMsg: Message = { role: 'user', content: input.trim() }
		const demoTable = input.toLowerCase().includes('methane') ? {
			columns: ['Date', 'Mine', 'State', 'Type', 'Severity'],
			rows: [
				['2021-03-12', 'Alpha', 'Jharkhand', 'Methane', 'High'],
				['2021-07-22', 'Beta', 'Odisha', 'Methane', 'Medium'],
			],
		} : undefined
		const botMsg: Message = { role: 'assistant', content: demoTable ? '**Results:** Found methane-related incidents in 2021.\n\nClick actions below to proceed.' : 'Here are recommended actions based on your query. \n\n- Increase monitoring \n- Schedule inspections', table: demoTable }
		setMessages((m) => [...m, userMsg, botMsg])
		setInput('')
	}

	return (
		<Stack spacing={2} sx={{ height: 'calc(100vh - 112px)' }}>
			<Box sx={{ flex: 1, overflow: 'auto' }}>
				<Stack spacing={2}>
					{messages.map((m, i) => (
						<Box key={i} sx={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
							<Card sx={{ maxWidth: '80%', bgcolor: m.role === 'user' ? 'primary.main' : 'background.paper', color: m.role === 'user' ? 'background.default' : 'text.primary' }}>
								<CardContent>
									<ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
									{m.table && (
										<Box sx={{ mt: 1, overflowX: 'auto' }}>
											<table>
												<thead>
													<tr>{m.table.columns.map((c) => (<th key={c} style={{ padding: 8, textAlign: 'left' }}>{c}</th>))}</tr>
												</thead>
												<tbody>
													{m.table.rows.map((r, ri) => (
														<tr key={ri}>{r.map((v, ci) => (<td key={ci} style={{ padding: 8 }}>{v}</td>))}</tr>
													))}
												</tbody>
											</table>
										</Box>
									)}
									<Stack direction="row" spacing={1} sx={{ mt: 1 }}>
										<Chip size="small" label="Schedule slope stability inspection" clickable />
										<Chip size="small" label="Create mitigation plan" clickable />
									</Stack>
								</CardContent>
							</Card>
						</Box>
					))}
				</Stack>
			</Box>

			<Stack spacing={1}>
				<Stack direction="row" spacing={1} flexWrap="wrap">
					{suggestions.map((s) => (
						<Chip key={s} variant="outlined" label={s} onClick={() => setInput(s)} sx={{ mr: 1, mb: 1 }} />
					))}
				</Stack>
				<Stack direction="row" spacing={1}>
					<TextField fullWidth placeholder="Ask the Digital Officer..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send() }} />
					<IconButton color="primary" onClick={send}><SendIcon /></IconButton>
				</Stack>
			</Stack>
		</Stack>
	)
}

