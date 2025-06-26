import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BookOpen, MessageSquare, Video, Users } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-10">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
                Exchange Skills, <br />
                <span className="text-primary">Grow Together</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with fellow students who have the skills you want to learn, and teach them what you know.
                SkillCircle makes peer-to-peer learning easy and effective.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-30"></div>
                <div className="relative bg-card rounded-lg shadow-xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="SkillSwap Platform Screenshot"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How SkillSwap Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to find the perfect skill exchange partner and start learning together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Smart Matching"
              description="Our algorithm finds the perfect match based on the skills you have and the skills you want to learn."
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              title="Real-time Chat"
              description="Connect instantly with your matches through our real-time messaging system."
            />
            <FeatureCard
              icon={<Video className="h-10 w-10 text-primary" />}
              title="Video Sessions"
              description="Schedule and conduct video learning sessions directly through our platform."
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Resource Sharing"
              description="Share notes, tutorials, and other learning resources with your partners."
            />
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Platform Screenshots</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScreenshotCard
              image="/placeholder.svg?height=400&width=600"
              title="Profile Matching"
              description="Find students with complementary skills"
            />
            <ScreenshotCard
              image="/placeholder.svg?height=400&width=600"
              title="Real-time Chat"
              description="Communicate seamlessly with your matches"
            />
            <ScreenshotCard
              image="/placeholder.svg?height=400&width=600"
              title="Video Call Scheduling"
              description="Plan and conduct learning sessions"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already exchanging skills and growing together on SkillSwap.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8">
              Create Your Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function ScreenshotCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-48 sm:h-64">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
