"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const categories = {
    recent: ["❤️", "👍", "🔥", "😊", "🎵", "🎧", "🎸", "🎹", "🎼", "🎤"],
    smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"],
    nature: ["🌱", "🌲", "🌳", "🌴", "🌵", "🌷", "🌸", "🌹", "🌺", "🌻"],
    music: ["🎵", "🎶", "🎷", "🎸", "🎹", "🎺", "🎻", "🥁", "🎤", "🎧"],
  }

  const filterEmojis = (emojis: string[]) => {
    if (!searchQuery) return emojis
    return emojis
  }

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search emojis..."
          className="pl-9 bg-muted/30 border-border text-foreground placeholder:text-muted-foreground"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="w-full bg-muted/30 grid grid-cols-4 h-auto">
          <TabsTrigger value="recent" className="data-[state=active]:bg-accent/50 py-1 px-2">
            Recent
          </TabsTrigger>
          <TabsTrigger value="smileys" className="data-[state=active]:bg-accent/50 py-1 px-2">
            Smileys
          </TabsTrigger>
          <TabsTrigger value="nature" className="data-[state=active]:bg-accent/50 py-1 px-2">
            Nature
          </TabsTrigger>
          <TabsTrigger value="music" className="data-[state=active]:bg-accent/50 py-1 px-2">
            Music
          </TabsTrigger>
        </TabsList>

        {Object.entries(categories).map(([category, emojis]) => (
          <TabsContent key={category} value={category} className="mt-2 outline-none">
            <ScrollArea className="h-40">
              <div className="grid grid-cols-8 gap-1">
                {filterEmojis(emojis).map((emoji, index) => (
                  <button
                    key={index}
                    className="p-1.5 text-xl hover:bg-accent/50 transition-colors"
                    onClick={() => onEmojiSelect(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

