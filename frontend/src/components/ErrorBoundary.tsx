import React from 'react'
import { Box, Button, Typography } from '@mui/material'

type State = { hasError: boolean; error?: Error; info?: string }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Save stack/info for later or send to analytics
    this.setState({ info: info.componentStack ?? undefined })
    // eslint-disable-next-line no-console
    console.error('Unhandled error caught by ErrorBoundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children as React.ReactElement

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Something went wrong</Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 2, color: 'error.main' }}>
          {this.state.error?.message}
        </Typography>
        {this.state.info && (
          <Typography variant="caption" sx={{ display: 'block', mb: 2, whiteSpace: 'pre-wrap' }}>{this.state.info}</Typography>
        )}
        <Button variant="contained" onClick={() => window.location.reload()}>Reload</Button>
      </Box>
    )
  }
}
