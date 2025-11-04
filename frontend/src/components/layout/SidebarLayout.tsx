import type { PropsWithChildren, ReactNode } from 'react'
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import WarningIcon from '@mui/icons-material/Warning'
import ChatIcon from '@mui/icons-material/Chat'
import AssignmentIcon from '@mui/icons-material/Assignment'
import MenuIcon from '@mui/icons-material/Menu'
import SecurityIcon from '@mui/icons-material/Security'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const drawerWidth = 264
const collapsedWidth = 72

export default function SidebarLayout({ children }: PropsWithChildren) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	const items = [
		{ label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
		{ label: 'Real-Time Alerts', icon: <WarningIcon />, path: '/alerts' },
		{ label: 'Digital Officer', icon: <ChatIcon />, path: '/digital-officer' },
		{ label: 'Audit Reports', icon: <AssignmentIcon />, path: '/audit-reports' },
	]

	return (
		<Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
			<AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				<Toolbar sx={{ position: 'relative' }}>
					{/* Mobile menu button stays on the left */}
					<IconButton color="inherit" edge="start" sx={{ display: { sm: 'none' }, position: 'absolute', left: 8 }} onClick={() => setMobileOpen(true)}>
						<MenuIcon />
					</IconButton>
					{/* Center the heading visually */}
					<Typography variant="h6" sx={{ fontWeight: 600, position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
						Agentic Mining Safety Platform
					</Typography>
				</Toolbar>
			</AppBar>

			<Box component="nav" sx={{ position: 'fixed', zIndex: 1200 }}>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
					ModalProps={{ keepMounted: true }}
					sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
				>
					<SidebarContent items={items} currentPath={location.pathname} onNavigate={(p) => { navigate(p); setMobileOpen(false) }} />
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							width: isExpanded ? drawerWidth : collapsedWidth,
							transition: 'width 0.2s ease-in-out',
							overflowX: 'hidden',
							position: 'fixed',
							'&:hover': {
								width: drawerWidth
							}
						}
					}}
					open
					onMouseEnter={() => setIsExpanded(true)}
					onMouseLeave={() => setIsExpanded(false)}
				>
					<SidebarContent items={items} currentPath={location.pathname} onNavigate={(p) => navigate(p)} isCollapsed={!isExpanded} />
				</Drawer>
			</Box>

			<Box component="main" sx={{ 
				flexGrow: 1, 
				p: 3, 
				ml: { sm: `${collapsedWidth}px` },
				width: '100%',
				transition: 'margin-left 0.2s ease-in-out',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<Box sx={{ width: '100%', maxWidth: '1200px' }}>
					<Toolbar />
					{children}
				</Box>
			</Box>
		</Box>
	)
}

function SidebarContent({ 
	items, 
	currentPath, 
	onNavigate, 
	isCollapsed = false 
}: { 
	items: { label: string, icon: ReactNode, path: string }[], 
	currentPath: string, 
	onNavigate: (path: string) => void,
	isCollapsed?: boolean 
}) {
	return (
		<Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
			<Box sx={{ 
				p: 2, 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: isCollapsed ? 'center' : 'flex-start',
				minHeight: '64px',
				gap: 1
			}}>
				{/* Logo / placeholder always visible. When collapsed only this is shown. */}
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
					<SecurityIcon fontSize="small" />
				</Box>
				<Typography 
					variant="h6" 
					sx={{ 
						fontWeight: 700,
						opacity: isCollapsed ? 0 : 1,
						transition: 'opacity 0.2s',
						whiteSpace: 'nowrap',
						ml: isCollapsed ? 0 : 1
					}}
				>
					Title
				</Typography>
			</Box>
			<Divider />
			<List>
				{items.map((item) => (
					<ListItemButton 
						key={item.path} 
						selected={currentPath === item.path} 
						onClick={() => onNavigate(item.path)}
						sx={{
							justifyContent: isCollapsed ? 'center' : 'flex-start',
							px: isCollapsed ? 1 : 2
						}}
					>
						<ListItemIcon sx={{ 
							minWidth: isCollapsed ? 0 : 40,
							mr: isCollapsed ? 0 : 2
						}}>
							{item.icon}
						</ListItemIcon>
						<ListItemText 
							primary={item.label} 
							sx={{ 
								opacity: isCollapsed ? 0 : 1,
								transition: 'opacity 0.2s',
								whiteSpace: 'nowrap'
							}} 
						/>
					</ListItemButton>
				))}
			</List>
		</Box>
	)
}

