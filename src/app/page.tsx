import { CreateSessionDialog } from "@/components/create-session-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Share2, Users, Target } from "lucide-react";

/**
 * Home page — landing page for MidPoint.
 *
 * Features:
 * - Hero section explaining the app
 * - "Create Session" call-to-action
 * - How it works steps
 * - Feature highlights
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-24 sm:py-32 text-center relative">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Target className="h-4 w-4" />
              Find the perfect meeting spot
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Find the{" "}
              <span className="text-primary">midpoint</span>{" "}
              between friends
          </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create a shareable link, have everyone share their location, and
              instantly discover the geographic center between all of you.
              Perfect for finding fair meeting spots!
            </p>
            <div className="pt-4">
              <CreateSessionDialog />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <StepCard
            step={1}
            icon={<MapPin className="h-6 w-6" />}
            title="Create a Session"
            description="Give your session a name and create a unique shareable link in seconds."
          />
          <StepCard
            step={2}
            icon={<Share2 className="h-6 w-6" />}
            title="Share the Link"
            description="Send the link to your friends. They'll enter their name and share their location."
          />
          <StepCard
            step={3}
            icon={<Target className="h-6 w-6" />}
            title="See the Midpoint"
            description="Watch the map update in real-time as everyone joins. The midpoint is calculated automatically!"
          />
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why MidPoint?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title="No Login Required"
              description="Jump right in — no accounts needed."
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="Easy Sharing"
              description="One link to share with all your friends."
            />
            <FeatureCard
              icon={<Target className="h-5 w-5" />}
              title="Real-time Updates"
              description="Watch the midpoint update as people join."
            />
            <FeatureCard
              icon={<MapPin className="h-5 w-5" />}
              title="Google Maps Link"
              description="Open the midpoint directly in Google Maps."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="pt-6 text-center">
        <div className="absolute top-3 right-3 text-6xl font-bold text-primary/5">
          {step}
        </div>
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
