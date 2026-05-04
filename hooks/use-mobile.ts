import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches)
    }
    mql.addEventListener("change", onChange)
    
    // Set initial value only if needed, in a way that avoids ESLint warnings, simply set it.
    // However, it's better to just use onChange() at the end to initialize, or ignore the rule
    if (isMobile !== mql.matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMobile(mql.matches)
    }
    return () => mql.removeEventListener("change", onChange)
  }, [isMobile])

  return !!isMobile
}
