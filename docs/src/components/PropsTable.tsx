import React from 'react';
import type { PropItem } from 'react-docgen-typescript';

interface PropsTableProps {
  /**
   * The component name to display props for
   */
  component: string;
  /**
   * Optional: Direct props data (if not using auto-generated)
   */
  props?: Record<string, PropItem>;
}

/**
 * PropsTable Component
 * 
 * Displays component props in a formatted table with types, descriptions, and default values.
 * Integrates with docusaurus-plugin-react-docgen-typescript for automatic prop extraction.
 */
export default function PropsTable({ component, props }: PropsTableProps): React.JSX.Element {
  // In production, this would fetch from the generated prop data
  // For now, we'll show a placeholder structure
  
  if (!props || Object.keys(props).length === 0) {
    return (
      <div className="admonition admonition-info alert alert--info">
        <div className="admonition-heading">
          <h5>
            <span className="admonition-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16">
                <path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path>
              </svg>
            </span>
            Props Documentation
          </h5>
        </div>
        <div className="admonition-content">
          <p>
            Props documentation for <code>{component}</code> will be automatically generated from TypeScript definitions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="props-table-container">
      <table className="props-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props).map(([propName, propData]) => (
            <tr key={propName}>
              <td>
                <span className="prop-name">{propName}</span>
                {propData.required && (
                  <span className="prop-required">*</span>
                )}
              </td>
              <td>
                <code className="prop-type">
                  {propData.type?.name || 'unknown'}
                </code>
              </td>
              <td>
                {propData.defaultValue?.value ? (
                  <code>{propData.defaultValue.value}</code>
                ) : (
                  <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>-</span>
                )}
              </td>
              <td>
                {propData.description || (
                  <span style={{ color: 'var(--ifm-color-emphasis-600)', fontStyle: 'italic' }}>
                    No description provided
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-700)' }}>
        <span className="prop-required">*</span> Required prop
      </div>
    </div>
  );
}
