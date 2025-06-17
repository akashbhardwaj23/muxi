"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  text: string
  sender: "user" | "system"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Harmony Hub! Feel free to discuss the tracks or request songs.",
      sender: "system",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate a response after a short delay
    setTimeout(() => {
      const systemResponse: Message = {
        id: Date.now() + 1,
        text: getRandomResponse(),
        sender: "system",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, systemResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getRandomResponse = () => {
    const responses = [
      "Thanks for your message! What kind of music do you enjoy?",
      "Great to hear from you! Have you checked out our latest tracks?",
      "Feel free to request any songs you'd like to hear!",
      "I hope you're enjoying the music. Let me know if you have any questions!",
      "That's interesting! Would you like to hear more tracks like this one?",
      "The current track has a beautiful melody. What do you think of it?",
      "Music brings people together. What's your favorite genre?",
      "I can recommend similar tracks if you're enjoying this one!",
      "The rhythm of this song is quite captivating, isn't it?",
      "Would you like me to tell you more about the artist of this track?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <CardContent className="p-0">
      <div className="flex flex-col h-80">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-cyan-600" : "bg-emerald-600"}`}>
                      <AvatarFallback>
                        {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                            : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        }`}
                      >
                        <p className="text-sm md:text-base">{message.text}</p>
                      </div>
                      <p className="text-xs text-slate-400 px-2">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 bg-emerald-600">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="bg-gradient-to-r from-emerald-600/50 to-teal-600/50 text-white rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.1 }}
                          className="w-2 h-2 rounded-full bg-emerald-200"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2, delay: 0.1 }}
                          className="w-2 h-2 rounded-full bg-emerald-200"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.3, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-emerald-200"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 px-2">{formatTime(new Date())}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="border-t border-slate-800 p-3 flex gap-2 bg-slate-900/60">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-800/50 border-slate-700/50 focus-visible:ring-cyan-500/50 text-white"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/20"
            disabled={isTyping}
          >
            <Send size={16} className="mr-2" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </div>
    </CardContent>
  )
}

