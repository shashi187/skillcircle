"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [skillsHave, setSkillsHave] = useState<string[]>(["Web Development", "React", "JavaScript"])
  const [skillsWant, setSkillsWant] = useState<string[]>(["Machine Learning", "Python", "Data Science"])
  const [newSkillHave, setNewSkillHave] = useState("")
  const [newSkillWant, setNewSkillWant] = useState("")

  const addSkillHave = () => {
    if (newSkillHave.trim() !== "" && !skillsHave.includes(newSkillHave.trim())) {
      setSkillsHave([...skillsHave, newSkillHave.trim()])
      setNewSkillHave("")
    }
  }

  const removeSkillHave = (skill: string) => {
    setSkillsHave(skillsHave.filter((s) => s !== skill))
  }

  const addSkillWant = () => {
    if (newSkillWant.trim() !== "" && !skillsWant.includes(newSkillWant.trim())) {
      setSkillsWant([...skillsWant, newSkillWant.trim()])
      setNewSkillWant("")
    }
  }

  const removeSkillWant = (skill: string) => {
    setSkillsWant(skillsWant.filter((s) => s !== skill))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>Chirag Kapoor</CardTitle>
              <CardDescription>Mathematics and Computing Student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Skills I Have</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsHave.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <button onClick={() => removeSkillHave(skill)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Skills I Want to Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillsWant.map((skill) => (
                      <Badge key={skill} variant="outline" className="flex items-center gap-1">
                        {skill}
                        <button onClick={() => removeSkillWant(skill)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Match Compatibility</h3>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">70% match rate with others</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="edit">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Chirag Kapoor" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input id="university" defaultValue="Delhi Technological University" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Computer Science student passionate about web development and looking to expand my knowledge in AI and machine learning."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills Management</CardTitle>
                  <CardDescription>Add or remove skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Skills I Have</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skillsHave.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <button onClick={() => removeSkillHave(skill)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill you have"
                        value={newSkillHave}
                        onChange={(e) => setNewSkillHave(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSkillHave()}
                      />
                      <Button type="button" size="icon" onClick={addSkillHave}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Skills I Want to Learn</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skillsWant.map((skill) => (
                        <Badge key={skill} variant="outline" className="flex items-center gap-1">
                          {skill}
                          <button onClick={() => removeSkillWant(skill)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill you want to learn"
                        value={newSkillWant}
                        onChange={(e) => setNewSkillWant(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addSkillWant()}
                      />
                      <Button type="button" size="icon" onClick={addSkillWant}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>John Smith</CardTitle>
                      <CardDescription>Tech University</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About Me</h3>
                    <p className="text-muted-foreground">
                      Mathematics and Computing student passionate about web development and looking to expand my knowledge in AI
                      and machine learning.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Skills I Have</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillsHave.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Skills I Want to Learn</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillsWant.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
