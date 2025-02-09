"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {languages.find((lang) => lang.code === language)?.flag}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setLanguage(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

