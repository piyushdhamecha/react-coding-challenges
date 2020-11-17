import React, { useEffect, useState } from 'react'
import ThemeContext from '../context/ThemeContext'

export default function App({ children }) {
  const [dark, setDark] = useState(window.localStorage.getItem('dark'))

  useEffect(() => {
    const isLastThemeDark = window.localStorage.getItem('dark')

    if (isLastThemeDark === 'true') {
      setDark(true)
      setTheme(true)
    }

    if (!isLastThemeDark || isLastThemeDark === 'false') {
      setDark(false)
      setTheme(false)
    }
  }, [dark])

  const setTheme = (isDark) => {
    if (isDark) {
      document.getElementsByTagName('html')[0].classList.add('dark-mode')

      return
    }

    document.getElementsByTagName('html')[0].classList.remove('dark-mode')
  }

  const handleThemeToggle = () => {
    setDark(!dark)

    window.localStorage.setItem('dark', !dark)
  }

  return (
    <ThemeContext.Provider
      value={{
        dark,
        onThemeToggle: handleThemeToggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
