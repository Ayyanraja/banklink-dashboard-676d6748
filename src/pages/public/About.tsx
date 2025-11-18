import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">About BankAgg</h1>
          <p className="text-xl text-muted-foreground">
            Your trusted partner in modern banking management
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="prose prose-slate max-w-none pt-6">
            <p className="text-lg">
              BankAgg is a cutting-edge banking aggregator platform designed to simplify your financial life. 
              We bring together all your bank accounts, transactions, and financial data into one secure, 
              easy-to-use interface.
            </p>
            <p className="text-lg">
              Founded in 2024, our mission is to revolutionize how people interact with their banking services. 
              We believe that managing your finances shouldn't be complicated or time-consuming. That's why we've 
              built a platform that puts you in control, with real-time insights and seamless integration across 
              multiple banking institutions.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Target className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize financial management by providing accessible, secure, and innovative 
                banking aggregation services to everyone.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Eye className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's most trusted banking aggregator platform, empowering users 
                with complete financial visibility and control.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Award className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Security and privacy first</li>
                <li>• User-centric design</li>
                <li>• Innovation and excellence</li>
                <li>• Transparency and trust</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Led by experienced fintech professionals and banking experts, our team is dedicated 
                to delivering the best possible experience for our users.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
