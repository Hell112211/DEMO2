import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', color: '#0C1116', background: '#E7EDF5', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ marginBottom: '1rem' }}>{this.state.message}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.5rem 1rem', background: '#0C1116', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
