"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, ImageIcon } from "lucide-react"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for the chat partner
const chatPartner = {
  id: 1,
  name: "Chirag Kapoor",
  avatar: "/placeholder.svg?height=80&width=80",
  university: "Tech University",
  lastSeen: "Online",
  skillsHave: ["Machine Learning", "Python", "Data Science"],
  skillsWant: ["Web Development", "React", "JavaScript"],
}

// Mock initial messages
const initialMessages = [
  {
    id: 1,
    sender: "partner",
    text: "Hi there! I saw we matched on SkillSwap. I'm really interested in learning React from you!",
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
  },
  {
    id: 2,
    sender: "user",
    text: "Hey Emma! Nice to meet you. I'd be happy to help you learn React. I see you're good at Machine Learning, which is something I've been wanting to learn.",
    timestamp: new Date(Date.now() - 3600000 * 1.5), // 1.5 hours ago
  },
  {
    id: 3,
    sender: "partner",
    text: "That sounds perfect! Maybe we could set up a regular schedule to teach each other?",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: 4,
    sender: "user",
    text: "That's a great idea. How about we start with a video call to discuss what we both want to learn and how we can help each other?",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
  },
  {
    id: 5,
    sender: "partner",
    text: "Sounds good! I'm free tomorrow evening or this weekend. What works for you?",
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
  },
]

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate a response after a short delay
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: "partner",
        text: "That works for me! Looking forward to our session.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
        <div className="md:col-span-1 hidden md:block">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chat Partner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={chatPartner.avatar || "/placeholder.svg"} alt={chatPartner.name} />
                  <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{chatPartner.name}</h3>
                <p className="text-sm text-muted-foreground">{chatPartner.university}</p>
                <p className="text-xs text-green-500 mt-1">{chatPartner.lastSeen}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Skills They Have</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {chatPartner.skillsHave.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Skills They Want</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {chatPartner.skillsWant.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link href={`/schedule/${chatId}`}>
                  <Button className="w-full">Schedule a Session</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 flex flex-col h-full">
          <div className="bg-card p-4 rounded-t-lg border-b flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={chatPartner.avatar || "/placeholder.svg"} alt={chatPartner.name} />
                <AvatarFallback>{chatPartner.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{chatPartner.name}</h3>
                <p className="text-xs text-green-500">{chatPartner.lastSeen}</p>
              </div>
            </div>
            <div className="md:hidden">
              <Link href={`/schedule/${chatId}`}>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 bg-muted/30">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {format(message.timestamp, "h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="bg-card p-4 rounded-b-lg border-t">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button type="button" size="icon" variant="ghost">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button type="button" size="icon" variant="ghost">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
