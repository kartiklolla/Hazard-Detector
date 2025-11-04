import { Card, CardContent, Chip, Stack, Typography, Grid, Box } from '@mui/material'

const alerts = [
	{ severity: 'High', title: 'Transportation machinery accident risk spike', location: 'Odisha - Alpha Mine', period: 'Q3 2022', action: 'Recommend targeted inspection or preventive measures' },
	{ severity: 'Medium', title: 'Methane levels trending up in panel 4', location: 'Jharkhand - Beta Mine', period: 'Aug 2022', action: 'Increase gas monitoring frequency' },
	{ severity: 'Low', title: 'PPE non-compliance noted in shift B', location: 'Chhattisgarh - Delta Mine', period: 'Last 7 days', action: 'Conduct toolbox talk' },
]

function severityColor(sev: string) {
	switch (sev) {
		case 'High': return 'error'
		case 'Medium': return 'warning'
		default: return 'info'
	}
}

export default function Alerts() {
	return (
		<Stack spacing={2}>
			<Typography variant="h6">Autonomous Alerts Feed</Typography>
			<Grid container spacing={2}>
				{alerts.map((a, i) => (
					<Grid key={i} size={{ xs: 12 }}>
						<Card>
							<CardContent>
								<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ md: 'center' }}>
									<Box>
										<Stack direction="row" spacing={1} alignItems="center">
											<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{a.title}</Typography>
											<Chip size="small" label={a.severity} color={severityColor(a.severity) as any} />
										</Stack>
										<Typography variant="body2" color="text.secondary">{a.location} • {a.period}</Typography>
									</Box>
									<Chip variant="outlined" color="primary" label={a.action} />
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Stack>
	)
}

