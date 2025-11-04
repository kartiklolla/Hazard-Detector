import { Box, Card, CardContent, Chip, Grid as Grid, Stack, Typography } from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts'
import { ComposableMap, Geographies, Geography } from '@vnedyalk0v/react19-simple-maps'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers'

// load topojson from local public folder to avoid CDN/CORS issues
const INDIA_TOPO = '/countries-110m.json'

const kpi = [
	{ label: 'Total Incidents (2016-2022)', value: 1243, delta: -6 },
	{ label: 'Total Fatalities', value: 87, delta: -2 },
	{ label: 'Serious Accidents', value: 312, delta: 4 },
	{ label: 'Days Since Last Incident', value: 18, delta: 3 },
]

const trendData = Array.from({ length: 24 }).map((_, i) => ({
	period: dayjs('2021-01-01').add(i, 'month').format('MMM YY'),
	incidents: Math.round(40 + 20 * Math.sin(i / 2) + (i % 5)),
}))

const pieData = [
	{ name: 'Machinery', value: 40 },
	{ name: 'Ground Movement', value: 35 },
	{ name: 'Methane', value: 15 },
	{ name: 'Electrical', value: 10 },
]

const PIE_COLORS = ['#7cf1b4', '#6ad3ff', '#ffb86b', '#ff6b6b']

export default function Dashboard() {
	const [start, setStart] = useState<Dayjs | null>(dayjs('2016-01-01'))
	const [end, setEnd] = useState<Dayjs | null>(dayjs('2022-12-31'))
	const [mine, setMine] = useState<string | null>(null)
	const [region, setRegion] = useState<string | null>(null)
	const [incidentType, setIncidentType] = useState<string | null>(null)

	const filteredTrend = useMemo(() => trendData, [])

	const [geoData, setGeoData] = useState<any | null>(null)
	const [geoError, setGeoError] = useState<string | null>(null)
	const [geoLoading, setGeoLoading] = useState(false)

	useEffect(() => {
		let cancelled = false
		setGeoLoading(true)
		fetch(INDIA_TOPO)
			.then((res) => {
				if (!res.ok) throw new Error(`Failed to fetch topojson: ${res.status} ${res.statusText}`)
				return res.json()
			})
			.then((data) => {
				if (!cancelled) setGeoData(data)
			})
			.catch((err) => {
				console.error('Error loading topojson', err)
				if (!cancelled) setGeoError(String(err?.message ?? err))
			})
			.finally(() => {
				if (!cancelled) setGeoLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [])

	// Sample heat points (latitude, longitude) focused in Jharkhand with intensity [0..1]
	const heatPoints = [
		{ name: 'Ranchi', coordinates: [85.3096, 23.3441], intensity: 0.9 },
		{ name: 'Dhanbad', coordinates: [86.4304, 23.7957], intensity: 0.85 },
		{ name: 'Jamshedpur', coordinates: [86.2029, 22.8046], intensity: 0.7 },
		{ name: 'Bokaro', coordinates: [86.1510, 23.6693], intensity: 0.6 },
		{ name: 'Hazaribagh', coordinates: [85.3610, 23.9904], intensity: 0.55 },
	]

	const intensityToColor = (v: number) => {
		// map 0..1 to color from yellow -> orange -> red
		if (v >= 0.85) return '#ff3b30'
		if (v >= 0.7) return '#ff7a00'
		if (v >= 0.5) return '#ffb400'
		return '#ffd86b'
	}

	return (
		<Stack spacing={3}>
			{/* Filters */}
			<Card>
				<CardContent>
					<Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
						<Stack direction="row" spacing={2}>
							<DatePicker label="Start" value={start} onChange={setStart} />
							<DatePicker label="End" value={end} onChange={setEnd} />
						</Stack>
						<Chip label={mine ? `Mine: ${mine}` : 'Mine: Any'} onClick={() => setMine(mine ? null : 'Alpha Mine')} variant="outlined" />
						<Chip label={region ? `Region: ${region}` : 'Region: Any'} onClick={() => setRegion(region ? null : 'Jharkhand')} variant="outlined" />
						<Chip label={incidentType ? `Type: ${incidentType}` : 'Type: Any'} onClick={() => setIncidentType(incidentType ? null : 'Machinery')} variant="outlined" />
					</Stack>
				</CardContent>
			</Card>

			{/* KPIs */}
			<Grid container spacing={2}>
				{kpi.map((k) => (
					<Grid key={k.label} size={{ xs: 12, sm: 6, md: 3 }}>
						<Card sx={{ height: '100%' }}>
							<CardContent>
								<Typography variant="body2" color="text.secondary">{k.label}</Typography>
								<Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 1 }}>
									<Typography variant="h4" sx={{ fontWeight: 700 }}>{k.value}</Typography>
									<Chip size="small" color={k.delta >= 0 ? 'success' : 'error'} label={`${k.delta >= 0 ? '▲' : '▼'} ${Math.abs(k.delta)}%`} />
								</Stack>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Charts */}
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Card sx={{ height: 360 }}>
						<CardContent sx={{ height: '100%' }}>
							<Typography variant="h6" sx={{ mb: 2 }}>Accident Trends</Typography>
							<ResponsiveContainer width="100%" height="85%">
								<LineChart data={filteredTrend}>
									<CartesianGrid strokeDasharray="3 3" stroke="#223" />
									<XAxis dataKey="period" hide={false} tick={{ fill: '#9db0aa', fontSize: 12 }} interval={2} />
									<YAxis tick={{ fill: '#9db0aa', fontSize: 12 }} />
									<Tooltip contentStyle={{ background: '#12171b', border: '1px solid #1f2a2e' }} />
									<Line type="monotone" dataKey="incidents" stroke="#7cf1b4" strokeWidth={2} dot={false} />
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<Card sx={{ height: 360 }}>
						<CardContent sx={{ height: '100%' }}>
							<Typography variant="h6" sx={{ mb: 2 }}>Root Cause Analysis</Typography>
							<ResponsiveContainer width="100%" height="85%">
								<PieChart>
									<Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
										{pieData.map((_, index) => (
											<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
										))}
									</Pie>
									<Tooltip contentStyle={{ background: '#12171b', border: '1px solid #1f2a2e' }} />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* Map */}
			<Card>
				<CardContent>
					<Typography variant="h6" sx={{ mb: 2 }}>Location Heatmap</Typography>
					<Box sx={{ width: '100%', height: 420 }}>
						{geoLoading ? (
							<Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<CircularProgress />
							</Box>
						) : geoError ? (
							<Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<Typography color="error">Failed to load map: {geoError}</Typography>
							</Box>
						) : geoData ? (
							<ComposableMap
								projection="geoMercator"
								projectionConfig={{ center: [78.9629, 22.5937] as any, scale: 1000 }}
								style={{ width: '100%', height: '100%' }}
							>
								<Geographies geography={geoData}>
									{({ geographies, projection }: any) => {
										// find the India country geometry (property names vary between topojson sources)
										const indiaGeos = geographies.filter((g: any) => {
											const props = g.properties || {}
											const name = (props.name || props.NAME || props.admin || props.ADMIN || '').toString()
											return name.toLowerCase() === 'india' || name.toLowerCase() === 'bharat'
										})
										return (
											<>
												{indiaGeos.map((geo: any) => (
													<Geography
														key={geo.rsmKey}
														geography={geo}
														stroke="#0b1113"
														strokeWidth={0.5}
														style={{
															default: { fill: '#0f3a3e', outline: 'none' },
															hover: { fill: '#165a66', outline: 'none' },
															pressed: { fill: '#165a66', outline: 'none' }
														}}
													/>
												))}
												{/* Heat points overlay (Jharkhand sample) */}
												{heatPoints.map((p) => {
													const [lon, lat] = p.coordinates
													const [x, y] = projection([lon, lat])
													// render as SVG circles (bigger + more opaque for higher intensity)
													return (
														<g key={p.name} transform={`translate(${x}, ${y})`}>
															<circle r={10 * p.intensity + 6} fill={intensityToColor(p.intensity)} opacity={0.85} />
															<circle r={18 * p.intensity + 12} fill={intensityToColor(p.intensity)} opacity={0.35} />
															<circle r={28 * p.intensity + 20} fill={intensityToColor(p.intensity)} opacity={0.14} />
														</g>
													)
												})}
											</>
										)
									}}
								</Geographies>
							</ComposableMap>
						) : (
							<Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<Typography color="text.secondary">Map not available</Typography>
							</Box>
						)}
					</Box>
				</CardContent>
			</Card>
		</Stack>
	)
}

