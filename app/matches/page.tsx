"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Video } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for matches
const initialMatches = [
  {
    id: 1,
    name: "Chirag kapoor",
    university: "Delhi Technological University",
    avatar: "/placeholder.svg?height=80&width=80",
    skillsHave: ["Machine Learning", "Python", "Data Science"],
    skillsWant: ["Web Development", "React", "JavaScript"],
    matchPercentage: 95,
  },
  {
    id: 2,
    name: "Rohit Meena",
    university: "Netaji Subhash University of Technology",
    avatar: "/placeholder.svg?height=80&width=80",
    skillsHave: ["AI", "TensorFlow", "Computer Vision"],
    skillsWant: ["React", "Frontend Development"],
    matchPercentage: 85,
  },
  {
    id: 3,
    name: "Ayush Gupta",
    university: "Innovation Institute",
    avatar: "/placeholder.svg?height=80&width=80",
    skillsHave: ["Deep Learning", "NLP", "Python"],
    skillsWant: ["JavaScript", "Web Development"],
    matchPercentage: 80,
  },
  {
    id: 4,
    name: "Eichiro Oda",
    university: "Tech University",
    avatar: "/placeholder.svg?height=80&width=80",
    skillsHave: ["Machine Learning", "Statistics", "R"],
    skillsWant: ["React", "Node.js"],
    matchPercentage: 75,
  },
]

export default function MatchesPage() {
  const [matches, setMatches] = useState(initialMatches)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("match")

  const filteredMatches = matches.filter(
    (match) =>
      match.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.skillsHave.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      match.skillsWant.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === "match") {
      return b.matchPercentage - a.matchPercentage
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Skill Matches</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-3">
          <div className="relative">
            <Input
              placeholder="Search by name or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div>
          <div className="space-y-2">
            <Label htmlFor="sort">Sort by</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Match Percentage</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {sortedMatches.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No matches found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or update your skills to find more matches.
          </p>
          <Link href="/profile">
            <Button>Update Your Skills</Button>
          </Link>
        </div>
      )}
    </div>
  )
}

function MatchCard({ match }: { match: any }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
              <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{match.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{match.university}</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
              {match.matchPercentage}% Match
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Skills They Have</h3>
            <div className="flex flex-wrap gap-1.5">
              {match.skillsHave.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Skills They Want</h3>
            <div className="flex flex-wrap gap-1.5">
              {match.skillsWant.map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Link href={`/chat/${match.id}`}>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" /> Message
          </Button>
        </Link>
        <Link href={`/schedule/${match.id}`}>
          <Button size="sm">
            <Video className="h-4 w-4 mr-2" /> Schedule
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
