"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays, startOfDay, addHours, isBefore } from "date-fns"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Video, Clock, CalendarIcon, Check } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the partner
const partner = {
  id: 1,
  name: "Chirag Kapoor",
  avatar: "/placeholder.svg?height=80&width=80",
  university: "Tech University",
  skillsHave: ["Machine Learning", "Python", "Data Science"],
  skillsWant: ["Web Development", "React", "JavaScript"],
}

// Mock scheduled sessions
const scheduledSessions = [
  {
    id: 1,
    date: addDays(new Date(), 2),
    startTime: "15:00",
    endTime: "16:00",
    topic: "Introduction to React Components",
    notes: "We'll cover the basics of React components and props.",
  },
  {
    id: 2,
    date: addDays(new Date(), 7),
    startTime: "14:00",
    endTime: "15:30",
    topic: "Machine Learning Fundamentals",
    notes: "Emma will introduce me to basic ML concepts and tools.",
  },
]

// Generate time slots
const generateTimeSlots = (date: Date) => {
  const slots = []
  const startHour = 9 // 9 AM
  const endHour = 20 // 8 PM
  const now = new Date()
  const isToday = format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")

  for (let hour = startHour; hour <= endHour; hour++) {
    for (const minute of [0, 30]) {
      const slotTime = addHours(startOfDay(date), hour)
      slotTime.setMinutes(minute)

      // Skip times in the past if it's today
      if (isToday && isBefore(slotTime, now)) {
        continue
      }

      slots.push({
        time: format(slotTime, "HH:mm"),
        available: Math.random() > 0.3, // Randomly mark some slots as unavailable
      })
    }
  }
  return slots
}

export default function SchedulePage() {
  const params = useParams()
  const partnerId = params.id
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1))
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState(() => (selectedDate ? generateTimeSlots(selectedDate) : []))
  const [sessionTopic, setSessionTopic] = useState("")
  const [sessionScheduled, setSessionScheduled] = useState(false)

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTime(null)
    if (date) {
      setTimeSlots(generateTimeSlots(date))
    }
  }

  const handleScheduleSession = () => {
    if (selectedDate && selectedTime && sessionTopic) {
      // In a real app, you would send this to your backend
      console.log("Scheduling session:", {
        date: selectedDate,
        time: selectedTime,
        topic: sessionTopic,
        partnerId,
      })

      setSessionScheduled(true)

      // Reset form after a delay
      setTimeout(() => {
        setSessionScheduled(false)
        setSelectedTime(null)
        setSessionTopic("")
      }, 3000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule a Learning Session</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Session Partner</CardTitle>
              <CardDescription>Schedule a session with your skill exchange partner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                  <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.university}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Skills They Have</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {partner.skillsHave.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Skills They Want</h4>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {partner.skillsWant.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <Link href={`/chat/${partnerId}`}>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" /> Message
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="schedule">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="schedule">Schedule New Session</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>Choose when you want to have your learning session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Select a Date</h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateChange}
                        className="rounded-md border"
                        disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Select a Time</h3>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto p-1">
                          {timeSlots.map((slot, index) => (
                            <Button
                              key={index}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              className={`justify-start ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[200px] border rounded-md bg-muted/30">
                          <p className="text-muted-foreground">Please select a date first</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                  <CardDescription>Provide information about your learning session</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="topic" className="text-sm font-medium">
                      Session Topic
                    </label>
                    <input
                      id="topic"
                      className="w-full p-2 border rounded-md"
                      placeholder="e.g., Introduction to React Hooks"
                      value={sessionTopic}
                      onChange={(e) => setSessionTopic(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Session Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      className="w-full p-2 border rounded-md h-24"
                      placeholder="Any specific topics you want to cover or questions you have"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleScheduleSession}
                      disabled={!selectedDate || !selectedTime || !sessionTopic || sessionScheduled}
                      className="w-full"
                    >
                      {sessionScheduled ? (
                        <>
                          <Check className="h-4 w-4 mr-2" /> Session Scheduled!
                        </>
                      ) : (
                        <>
                          <CalendarIcon className="h-4 w-4 mr-2" /> Schedule Session
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {scheduledSessions.length > 0 ? (
                    <div className="space-y-4">
                      {scheduledSessions.map((session) => (
                        <Card key={session.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                  <CalendarIcon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-medium">{session.topic}</h3>
                                  <p className="text-sm text-muted-foreground">{session.notes}</p>
                                  <div className="flex items-center mt-2">
                                    <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span className="text-sm">{format(session.date, "EEEE, MMMM d, yyyy")}</span>
                                    <Clock className="h-4 w-4 ml-3 mr-1 text-muted-foreground" />
                                    <span className="text-sm">
                                      {session.startTime} - {session.endTime}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 md:flex-col lg:flex-row">
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-2" /> Message
                                </Button>
                                <Button size="sm">
                                  <Video className="h-4 w-4 mr-2" /> Join Call
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium mb-2">No upcoming sessions</h3>
                      <p className="text-muted-foreground mb-6">
                        You don't have any scheduled sessions yet. Schedule a session to get started.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
