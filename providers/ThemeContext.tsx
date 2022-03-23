import React from 'react'

type ThemeContext = { theme: string; toggleTheme: () => void; collapsed: boolean; toggleCollapsed: () => void }

export const ThemeContext = React.createContext<ThemeContext>({} as ThemeContext)
