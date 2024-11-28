import { useEffect, useState } from "react"

export const useCurrentTime = () => {
  const [currentTGreeting, setCurrentGreeting] = useState<string>()
  useEffect(() => {
    const date = new Date()
    if (date?.getHours() > 6 && date?.getHours() < 12) {
      setCurrentGreeting("Good Morning")
    } else if (date?.getHours() > 12 && date?.getHours() < 18) {
      setCurrentGreeting("Good Afternoon")
    } else {
      setCurrentGreeting("Good Evening")
    }
  }, [])
  return { currentTGreeting }
}
