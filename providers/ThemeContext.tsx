import React from 'react'

type ThemeContextType = { theme: string; toggleTheme: () => void; collapsed: boolean; toggleCollapsed: () => void }

export const ThemeContext = React.createContext<ThemeContextType>({} as ThemeContextType)
