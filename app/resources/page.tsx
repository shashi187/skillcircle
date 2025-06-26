"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Download, UploadIcon, Search, Filter, BookOpen, Code, Database, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "React Fundamentals Cheatsheet",
    description: "A comprehensive guide to React basics including components, props, and state.",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend"],
    uploadedBy: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    downloads: 128,
    fileType: "PDF",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Machine Learning Algorithms Explained",
    description: "Detailed explanations of common ML algorithms with Python code examples.",
    category: "Data Science",
    tags: ["Machine Learning", "Python", "Algorithms"],
    uploadedBy: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    downloads: 256,
    fileType: "PDF",
    fileSize: "5.1 MB",
  },
  {
    id: 3,
    title: "JavaScript ES6+ Features",
    description: "Overview of modern JavaScript features with practical examples.",
    category: "Web Development",
    tags: ["JavaScript", "ES6", "Frontend"],
    uploadedBy: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    downloads: 89,
    fileType: "PDF",
    fileSize: "1.8 MB",
  },
  {
    id: 4,
    title: "Python Data Analysis Tutorial",
    description: "Step-by-step guide to data analysis using Python, Pandas, and NumPy.",
    category: "Data Science",
    tags: ["Python", "Data Analysis", "Pandas"],
    uploadedBy: {
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    uploadDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    downloads: 312,
    fileType: "ZIP",
    fileSize: "8.7 MB",
  },
  {
    id: 5,
    title: "React Hooks Explained",
    description: "Comprehensive guide to React Hooks with practical examples.",
    category: "Web Development",
    tags: ["React", "Hooks", "Frontend"],
    uploadedBy: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    downloads: 175,
    fileType: "PDF",
    fileSize: "3.2 MB",
  },
]

// Categories for filtering
const categories = ["All Categories", "Web Development", "Data Science", "Mobile Development", "UI/UX Design", "DevOps"]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  // Filter resources based on search term and category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All Categories" || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          setUploadComplete(true)
          setTimeout(() => {
            setIsUploading(false)
            setUploadProgress(0)
            setUploadComplete(false)
          }, 2000)
        }
      }, 300)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Resources</h1>

      <Tabs defaultValue="browse">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="browse">Browse Resources</TabsTrigger>
          <TabsTrigger value="upload">Upload Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-muted" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any resources matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All Categories")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Learning Resources</CardTitle>
              <CardDescription>Share your notes, guides, and learning materials with other students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Resource Title</Label>
                <Input id="title" placeholder="e.g., React Hooks Cheatsheet" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full p-2 border rounded-md h-24"
                  placeholder="Provide a brief description of your resource"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full p-2 border rounded-md">
                    {categories
                      .filter((cat) => cat !== "All Categories")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g., React, JavaScript, Frontend" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  {isUploading ? (
                    <div className="space-y-4">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {uploadComplete ? "Upload complete!" : `Uploading... ${uploadProgress}%`}
                      </p>
                    </div>
                  ) : (
                    <>
                      <UploadIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                      <p className="text-xs text-muted-foreground">Supports PDF, DOCX, PPTX, ZIP (max 50MB)</p>
                      <Input id="file" type="file" className="hidden" onChange={handleFileUpload} />
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        Select File
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <UploadIcon className="h-4 w-4 mr-2" /> Upload Resource
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ResourceCard({ resource }: { resource: any }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">{resource.description}</CardDescription>
          </div>
          <div className="bg-primary/10 p-2 rounded-md">
            {resource.fileType === "PDF" ? (
              <FileText className="h-6 w-6 text-primary" />
            ) : resource.fileType === "ZIP" ? (
              <Database className="h-6 w-6 text-primary" />
            ) : (
              <Code className="h-6 w-6 text-primary" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Avatar className="h-6 w-6">
            <AvatarImage src={resource.uploadedBy.avatar || "/placeholder.svg"} alt={resource.uploadedBy.name} />
            <AvatarFallback>{resource.uploadedBy.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {resource.uploadedBy.name} • {format(resource.uploadDate, "MMM d, yyyy")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-xs text-muted-foreground">
          {resource.fileType} • {resource.fileSize} • {resource.downloads} downloads
        </div>
        <Button size="sm">
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </CardFooter>
    </Card>
  )
}
