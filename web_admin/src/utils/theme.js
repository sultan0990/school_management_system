/**
 * Color Theme Configuration for School Management System
 * 
 * This file defines the main color palette used throughout the web admin application.
 * All components should use these theme colors instead of hardcoded color values
 * to maintain consistency and enable easy theme customization.
 */

export const theme = {
  // Primary Colors - Main brand colors
  primary: {
    50: '#eff6ff',   // Lightest blue
    100: '#dbeafe',  // Very light blue
    200: '#bfdbfe',  // Light blue
    300: '#93c5fd',  // Medium light blue
    400: '#60a5fa',  // Medium blue
    500: '#3b82f6',  // Primary blue (main)
    600: '#2563eb',  // Dark blue
    700: '#1d4ed8',  // Darker blue
    800: '#1e40af',  // Very dark blue
    900: '#1e3a8a'   // Darkest blue
  },

  // Secondary Colors - Success, positive actions
  secondary: {
    50: '#ecfdf5',   // Lightest green
    100: '#d1fae5',  // Very light green
    200: '#a7f3d0',  // Light green
    300: '#6ee7b7',  // Medium light green
    400: '#34d399',  // Medium green
    500: '#10b981',  // Primary green (main)
    600: '#059669',  // Dark green
    700: '#047857',  // Darker green
    800: '#065f46',  // Very dark green
    900: '#064e3b'   // Darkest green
  },

  // Accent Colors - Highlights, special actions
  accent: {
    50: '#faf5ff',   // Lightest purple
    100: '#f3e8ff',  // Very light purple
    200: '#e9d5ff',  // Light purple
    300: '#d8b4fe',  // Medium light purple
    400: '#c084fc',  // Medium purple
    500: '#8b5cf6',  // Primary purple (main)
    600: '#7c3aed',  // Dark purple
    700: '#6d28d9',  // Darker purple
    800: '#5b21b6',  // Very dark purple
    900: '#4c1d95'   // Darkest purple
  },

  // Warning Colors - Alerts, caution
  warning: {
    50: '#fffbeb',   // Lightest amber
    100: '#fef3c7',  // Very light amber
    200: '#fde68a',  // Light amber
    300: '#fcd34d',  // Medium light amber
    400: '#fbbf24',  // Medium amber
    500: '#f59e0b',  // Primary amber (main)
    600: '#d97706',  // Dark amber
    700: '#b45309',  // Darker amber
    800: '#92400e',  // Very dark amber
    900: '#78350f'   // Darkest amber
  },

  // Danger Colors - Errors, destructive actions
  danger: {
    50: '#fef2f2',   // Lightest red
    100: '#fee2e2',  // Very light red
    200: '#fecaca',  // Light red
    300: '#fca5a5',  // Medium light red
    400: '#f87171',  // Medium red
    500: '#ef4444',  // Primary red (main)
    600: '#dc2626',  // Dark red
    700: '#b91c1c',  // Darker red
    800: '#991b1b',  // Very dark red
    900: '#7f1d1d'   // Darkest red
  },

  // Neutral Colors - Grays, backgrounds, text
  neutral: {
    50: '#f9fafb',   // Lightest gray (backgrounds)
    100: '#f3f4f6',  // Very light gray (card backgrounds)
    200: '#e5e7eb',  // Light gray (borders)
    300: '#d1d5db',  // Medium light gray (input borders)
    400: '#9ca3af',  // Medium gray (placeholder text)
    500: '#6b7280',  // Medium gray (secondary text)
    600: '#4b5563',  // Dark gray (primary text)
    700: '#374151',  // Darker gray (headers)
    800: '#1f2937',  // Very dark gray (main headers)
    900: '#111827'   // Darkest gray (darkest text)
  },

  // Background Colors
  background: {
    primary: '#ffffff',      // White background
    secondary: '#f8fafc',    // Light gray background
    tertiary: '#f1f5f9',     // Very light gray background
    dark: '#0f172a',         // Dark background
    overlay: 'rgba(0, 0, 0, 0.5)' // Modal overlay
  },

  // Text Colors
  text: {
    primary: '#1f2937',     // Dark gray (main text)
    secondary: '#6b7280',   // Medium gray (secondary text)
    tertiary: '#9ca3af',    // Light gray (tertiary text)
    inverse: '#ffffff',     // White text (on dark backgrounds)
    link: '#3b82f6',        // Blue (links)
    linkHover: '#2563eb',   // Darker blue (link hover)
    error: '#ef4444',       // Red (error text)
    success: '#10b981',     // Green (success text)
    warning: '#f59e0b'      // Amber (warning text)
  },

  // Border Colors
  border: {
    light: '#e5e7eb',       // Light borders
    medium: '#d1d5db',      // Medium borders
    dark: '#9ca3af',        // Dark borders
    focus: '#3b82f6',       // Focus borders
    error: '#ef4444',       // Error borders
    success: '#10b981'      // Success borders
  },

  // Shadow Colors
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
  },

  // Status Colors
  status: {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    pending: '#6b7280'
  }
}

// Common color combinations for quick access
export const colors = {
  // Main brand colors
  primary: theme.primary[500],
  secondary: theme.secondary[500],
  accent: theme.accent[500],
  warning: theme.warning[500],
  danger: theme.danger[500],

  // Background colors
  background: theme.background.primary,
  backgroundSecondary: theme.background.secondary,
  backgroundTertiary: theme.background.tertiary,

  // Text colors
  textPrimary: theme.text.primary,
  textSecondary: theme.text.secondary,
  textTertiary: theme.text.tertiary,
  textInverse: theme.text.inverse,

  // Border colors
  border: theme.border.medium,
  borderLight: theme.border.light,
  borderFocus: theme.border.focus,

  // Status colors
  success: theme.status.success,
  error: theme.status.error,
  warning: theme.status.warning,
  info: theme.status.info
}

// Helper functions for theme usage
export const getThemeColor = (colorPath) => {
  const keys = colorPath.split('.')
  let value = theme
  for (const key of keys) {
    value = value[key]
    if (value === undefined) {
      console.warn(`Theme color not found: ${colorPath}`)
      return theme.neutral[500] // Fallback color
    }
  }
  return value
}

// Common style objects using theme colors
export const commonStyles = {
  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.textInverse,
      border: 'none',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  },

  // Input styles
  input: {
    base: {
      width: '100%',
      padding: '12px 16px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '16px',
      outline: 'none',
      backgroundColor: colors.background,
      transition: 'border-color 0.2s'
    },
    focus: {
      borderColor: colors.borderFocus
    },
    error: {
      borderColor: colors.error
    }
  },

  // Card styles
  card: {
    base: {
      backgroundColor: colors.background,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: theme.shadow.md,
      border: `1px solid ${colors.borderLight}`
    }
  },

  // Modal styles
  modal: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.background.overlay,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    },
    content: {
      backgroundColor: colors.background,
      borderRadius: '12px',
      padding: '24px',
      width: '90%',
      maxWidth: '400px',
      boxShadow: theme.shadow.xl
    }
  }
}

export default theme
