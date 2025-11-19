import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, Shield, TrendingUp, Users, ArrowRight, CheckCircle } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Building2,
      title: "Multi-Bank Integration",
      description: "Connect all your bank accounts in one secure platform"
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is protected with enterprise-grade encryption"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Updates",
      description: "Track transactions and balances in real-time"
    },
    {
      icon: Users,
      title: "Easy Management",
      description: "Intuitive interface for all your banking needs"
    }
  ];

  const benefits = [
    "Aggregate accounts from multiple banks",
    "Track all transactions in one place",
    "Real-time balance updates",
    "Secure and encrypted",
    "Easy fund transfers",
    "Detailed financial reports"
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
              Manage All Your <span className="text-primary">Bank Accounts</span> in One Place
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              The ultimate banking aggregator platform. Connect, manage, and track all your financial accounts seamlessly.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/plans">
                <Button size="lg" variant="outline">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose BankAgg?</h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to simplify your banking experience
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Everything You Need</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive banking features at your fingertips
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="flex flex-col items-center justify-center gap-6 p-12 text-center">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Join thousands of users who trust BankAgg to manage their finances
              </p>
              <Link to="/login">
                <Button size="lg" className="gap-2">
                  Start Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
