import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SidebarLayout from './components/layout/SidebarLayout'
import ErrorBoundary from './components/ErrorBoundary'
import Dashboard from './pages/Dashboard'
import Alerts from './pages/Alerts'
import DigitalOfficer from './pages/DigitalOfficer'
import AuditReports from './pages/AuditReports'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#7cf1b4' },
		background: { default: '#0b0f12', paper: '#12171b' },
		text: { primary: '#e6f1ee', secondary: '#b6c4bf' },
	},
	shape: { borderRadius: 12 },
	components: {
		MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
		MuiCard: { styleOverrides: { root: { boxShadow: '0 4px 24px rgba(0,0,0,0.35)' } } },
	},
})

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<CssBaseline />
				<BrowserRouter>
					<ErrorBoundary>
						<SidebarLayout>
							<Routes>
								<Route path="/" element={<Navigate to="/dashboard" replace />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/alerts" element={<Alerts />} />
								<Route path="/digital-officer" element={<DigitalOfficer />} />
								<Route path="/audit-reports" element={<AuditReports />} />
							</Routes>
						</SidebarLayout>
					</ErrorBoundary>
				</BrowserRouter>
			</LocalizationProvider>
		</ThemeProvider>
	)
}
