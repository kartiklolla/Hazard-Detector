import { useState } from 'react'
import { Box, Button, Card, CardContent, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

export default function AuditReports() {
	const [mine, setMine] = useState('Alpha Mine')
	const [auditType, setAuditType] = useState('Full Safety Audit')
	const [start, setStart] = useState<Dayjs | null>(dayjs('2022-01-01'))
	const [end, setEnd] = useState<Dayjs | null>(dayjs('2022-12-31'))
	const [open, setOpen] = useState(false)

	return (
		<Stack spacing={2}>
			<Typography variant="h6">Automated Audit Report Generation</Typography>
			<Card>
				<CardContent>
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
						<FormControl fullWidth>
							<InputLabel>Mine</InputLabel>
							<Select label="Mine" value={mine} onChange={(e) => setMine(e.target.value)}>
								<MenuItem value="Alpha Mine">Alpha Mine</MenuItem>
								<MenuItem value="Beta Mine">Beta Mine</MenuItem>
							</Select>
						</FormControl>
						<DatePicker label="Start" value={start} onChange={setStart} />
						<DatePicker label="End" value={end} onChange={setEnd} />
						<FormControl fullWidth>
							<InputLabel>Audit Type</InputLabel>
							<Select label="Audit Type" value={auditType} onChange={(e) => setAuditType(e.target.value)}>
								<MenuItem value="Full Safety Audit">Full Safety Audit</MenuItem>
								<MenuItem value="Machinery-Focus">Machinery-Focus</MenuItem>
							</Select>
						</FormControl>
					</Stack>
					<Box sx={{ mt: 2 }}>
						<Button variant="contained" onClick={() => setOpen(true)}>Generate Audit Report</Button>
					</Box>
				</CardContent>
			</Card>

			<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
				<DialogTitle>Audit Report Preview</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={2}>
						<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Summary & Recommendations</Typography>
						<Typography variant="body2">Overall compliance satisfactory. Recommend targeted inspection on machinery maintenance cycles in {mine}.</Typography>
						<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Categorized Incident List</Typography>
						<Box component="ul" sx={{ m: 0, pl: 3 }}>
							<li>Methane – 4 incidents</li>
							<li>Machinery – 9 incidents</li>
							<li>Ground Movement – 6 incidents</li>
						</Box>
						<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Flagged Regulatory Breaches</Typography>
						<Box component="ul" sx={{ m: 0, pl: 3 }}>
							<li>DGMS Circular 05/2017 – Ventilation monitoring</li>
							<li>Regulation 123 – Machinery maintenance logs</li>
						</Box>
						<Stack direction="row" spacing={1}>
							<Button variant="outlined" onClick={() => window.print()}>Print</Button>
							<Button variant="contained">Download PDF</Button>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</Stack>
	)
}

