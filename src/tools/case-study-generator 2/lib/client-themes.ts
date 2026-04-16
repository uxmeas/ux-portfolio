// Predefined client themes based on their existing brand styles
export const clientThemes = {
  'akm-secure': {
    name: 'AKM Secure',
    url: 'https://www.akmsecure.com',
    colors: {
      primary: '#00D9FF',      // Cyan/Electric Blue
      secondary: '#0A0E27',    // Dark Navy
      accent: '#00A6CC',       // Darker Cyan
      background: '#000000',   // Black
      text: '#FFFFFF'          // White
    }
  },
  'livetoken': {
    name: 'LiveToken',
    url: 'https://livetoken.co',
    colors: {
      primary: '#7C3AED',      // Purple
      secondary: '#4C1D95',    // Dark Purple
      accent: '#A78BFA',       // Light Purple
      background: '#FFFFFF',   // White
      text: '#1F2937'          // Dark Gray
    }
  },
  'kollects': {
    name: 'Kollects',
    url: 'https://kollects.io',
    colors: {
      primary: '#10B981',      // Emerald
      secondary: '#065F46',    // Dark Emerald
      accent: '#34D399',       // Light Emerald
      background: '#FFFFFF',   // White
      text: '#1F2937'          // Dark Gray
    }
  },
  // Add more client themes as needed
};

// Helper function to get theme by client name
export function getClientTheme(clientName: string) {
  const key = clientName.toLowerCase().replace(/\s+/g, '-');
  return clientThemes[key as keyof typeof clientThemes] || null;
}

// Helper function to detect theme from URL
export function detectThemeFromUrl(url: string) {
  for (const [key, theme] of Object.entries(clientThemes)) {
    if (url.includes(theme.url) || url.includes(key)) {
      return theme;
    }
  }
  return null;
}