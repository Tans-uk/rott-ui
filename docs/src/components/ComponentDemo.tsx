import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

interface ComponentDemoProps {
  /**
   * Title of the demo
   */
  title?: string;
  /**
   * Description of what the demo shows
   */
  description?: string;
  /**
   * TypeScript code example
   */
  tsCode: string;
  /**
   * JavaScript code example (optional, will be auto-converted if not provided)
   */
  jsCode?: string;
  /**
   * Preview component (React element to render)
   */
  preview?: React.ReactNode;
  /**
   * Show code by default (default: false)
   */
  showCode?: boolean;
}

/**
 * ComponentDemo Component
 * 
 * Displays a component demo with code examples in TypeScript and JavaScript,
 * along with an optional live preview.
 * 
 * @example
 * ```tsx
 * <ComponentDemo
 *   title="Basic Button"
 *   description="A simple button with primary variant"
 *   tsCode={`
 *     import { Button } from '@tansuk/rott-ui';
 *     
 *     export default function Example() {
 *       return <Button variant="primary">Click Me</Button>;
 *     }
 *   `}
 * />
 * ```
 */
export default function ComponentDemo({
  title,
  description,
  tsCode,
  jsCode,
  preview,
  showCode = false,
}: ComponentDemoProps): React.JSX.Element {
  const [isCodeVisible, setIsCodeVisible] = useState(showCode);

  // Simple TS to JS conversion (remove types)
  const convertToJS = (code: string): string => {
    return code
      .replace(/: \w+(\[\])?/g, '') // Remove type annotations
      .replace(/interface \w+ \{[^}]+\}/g, '') // Remove interfaces
      .replace(/type \w+ = [^;]+;/g, '') // Remove type aliases
      .replace(/<\w+>/g, '') // Remove generic types
      .replace(/as \w+/g, ''); // Remove type assertions
  };

  const javascriptCode = jsCode || convertToJS(tsCode);

  return (
    <div className="component-demo" style={{ marginBottom: '2rem' }}>
      {title && (
        <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--ifm-color-primary)' }}>
          {title}
        </h4>
      )}
      {description && (
        <p style={{ marginBottom: '1rem', color: 'var(--ifm-color-emphasis-700)' }}>
          {description}
        </p>
      )}

      {preview && (
        <div className="component-demo-preview">
          {preview}
        </div>
      )}

      <div style={{ marginTop: preview ? '1rem' : 0 }}>
        <button
          onClick={() => setIsCodeVisible(!isCodeVisible)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: isCodeVisible ? '1rem' : 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isCodeVisible ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          {isCodeVisible ? 'Hide Code' : 'Show Code'}
        </button>

        {isCodeVisible && (
          <Tabs>
            <TabItem value="tsx" label="TypeScript" default>
              <CodeBlock language="tsx">{tsCode.trim()}</CodeBlock>
            </TabItem>
            <TabItem value="jsx" label="JavaScript">
              <CodeBlock language="jsx">{javascriptCode.trim()}</CodeBlock>
            </TabItem>
          </Tabs>
        )}
      </div>
    </div>
  );
}
