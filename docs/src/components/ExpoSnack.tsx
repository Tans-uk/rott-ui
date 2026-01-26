import React from 'react';

interface ExpoSnackProps {
  /**
   * Snack ID or full Snack URL
   */
  snackId: string;
  /**
   * Height of the embedded Snack (default: 500px)
   */
  height?: number;
  /**
   * Platform to show by default (ios, android, web)
   */
  platform?: 'ios' | 'android' | 'web';
  /**
   * Theme for the Snack editor (light, dark)
   */
  theme?: 'light' | 'dark';
  /**
   * Show preview by default
   */
  preview?: boolean;
}

/**
 * ExpoSnack Component
 * 
 * Embeds an Expo Snack for interactive React Native code examples.
 * 
 * @example
 * ```tsx
 * <ExpoSnack snackId="button-basic-example" platform="ios" />
 * ```
 */
export default function ExpoSnack({
  snackId,
  height = 500,
  platform = 'ios',
  theme = 'light',
  preview = true,
}: ExpoSnackProps): React.JSX.Element {
  // Construct Snack URL
  const snackUrl = snackId.startsWith('http')
    ? snackId
    : `https://snack.expo.dev/${snackId}`;

  // Build embed URL with parameters
  const embedUrl = new URL(snackUrl);
  embedUrl.searchParams.set('platform', platform);
  embedUrl.searchParams.set('theme', theme);
  if (preview) {
    embedUrl.searchParams.set('preview', 'true');
  }
  embedUrl.searchParams.set('supportedPlatforms', 'ios,android,web');

  return (
    <div className="expo-snack-container" style={{ marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        borderRadius: '0.375rem 0.375rem 0 0',
        borderBottom: '1px solid var(--ifm-color-emphasis-300)',
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 20.085c.001 1.034.838 1.872 1.872 1.872h20.256c1.034 0 1.871-.838 1.872-1.872V3.915A1.872 1.872 0 0022.128 2.043H1.872A1.872 1.872 0 000 3.915v16.17zm10.205-4.547l-5.29-5.29 1.408-1.408 3.882 3.882 8.477-8.477 1.408 1.408-9.885 9.885z"/>
          </svg>
          <span>Interactive Example</span>
        </div>
        <a
          href={snackUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.875rem',
            color: 'var(--ifm-color-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          Open in Snack
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
      <iframe
        src={embedUrl.toString()}
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          borderRadius: '0 0 0.375rem 0.375rem',
          overflow: 'hidden',
        }}
        title={`Expo Snack: ${snackId}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  );
}
