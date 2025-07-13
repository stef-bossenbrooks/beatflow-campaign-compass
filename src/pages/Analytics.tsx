import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Mail, 
  Eye, 
  MousePointer,
  Calendar,
  Download,
  ArrowLeft
} from "lucide-react";

interface AnalyticsProps {
  onBack: () => void;
}

export const Analytics = ({ onBack }: AnalyticsProps) => {
  // Sample analytics data
  const overviewStats = {
    totalCampaigns: 12,
    totalEmailsSent: 2847,
    avgOpenRate: 68.4,
    avgClickRate: 28.7,
    totalContacts: 1256,
    activeSubscribers: 1189
  };

  const recentCampaigns = [
    {
      name: "Summer Trap Beats Collection",
      sent: 245,
      openRate: 68,
      clickRate: 24,
      date: "2024-01-15",
      status: "active"
    },
    {
      name: "Lo-Fi Hip Hop Pack", 
      sent: 189,
      openRate: 72,
      clickRate: 31,
      date: "2024-01-10",
      status: "completed"
    },
    {
      name: "Electronic Dance Hits",
      sent: 167,
      openRate: 65,
      clickRate: 22,
      date: "2024-01-05",
      status: "completed"
    }
  ];

  const topPerformingBeats = [
    { name: "Dark Trap Banger.wav", plays: 234, downloads: 45 },
    { name: "Melodic Trap Vibes.wav", plays: 198, downloads: 38 },
    { name: "808 Heavy Hitter.wav", plays: 156, downloads: 29 },
    { name: "Chill Study Beat.wav", plays: 145, downloads: 27 },
    { name: "Festival Anthem.wav", plays: 134, downloads: 25 }
  ];

  const monthlyTrends = [
    { month: "Dec 2023", sent: 456, opens: 298, clicks: 127 },
    { month: "Jan 2024", sent: 678, opens: 445, clicks: 189 },
    { month: "Feb 2024", sent: 834, opens: 567, clicks: 234 },
    { month: "Mar 2024", sent: 1023, opens: 698, clicks: 289 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive insights into your campaign performance
                </p>
              </div>
            </div>
            <Button variant="outline" className="hover:bg-primary/10">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Campaigns</p>
                  <p className="text-3xl font-bold">{overviewStats.totalCampaigns}</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +2 this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-electric-blue" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Emails Sent</p>
                  <p className="text-3xl font-bold text-electric-blue">{overviewStats.totalEmailsSent.toLocaleString()}</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +23% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-vibrant-purple/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-vibrant-purple" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg Open Rate</p>
                  <p className="text-3xl font-bold text-vibrant-purple">{overviewStats.avgOpenRate}%</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +5.2% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg Click Rate</p>
                  <p className="text-3xl font-bold text-success">{overviewStats.avgClickRate}%</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +3.1% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-warning" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Contacts</p>
                  <p className="text-3xl font-bold">{overviewStats.totalContacts.toLocaleString()}</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +147 this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-electric-blue" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Subscribers</p>
                  <p className="text-3xl font-bold text-vibrant-purple">{overviewStats.activeSubscribers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    94.7% retention rate
                  </p>
                </div>
                <div className="w-12 h-12 bg-vibrant-purple/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-vibrant-purple" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Campaign Performance */}
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Campaign Performance</h3>
              <div className="space-y-4">
                {recentCampaigns.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{campaign.name}</h4>
                        <Badge 
                          className={campaign.status === 'active' ? 'bg-electric-blue text-white' : 'bg-success text-white'}
                        >
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{campaign.sent} sent</span>
                        <span>{campaign.openRate}% opened</span>
                        <span>{campaign.clickRate}% clicked</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(campaign.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Top Performing Beats */}
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performing Beats</h3>
              <div className="space-y-3">
                {topPerformingBeats.map((beat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{beat.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {beat.plays} plays
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {beat.downloads} downloads
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-electric-blue">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="bg-gradient-card border-border">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Monthly Performance Trends</h3>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Change Period
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {monthlyTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium text-sm mb-3">{trend.month}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Sent</span>
                      <span className="font-medium">{trend.sent}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Opened</span>
                      <span className="font-medium text-electric-blue">{trend.opens}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Clicked</span>
                      <span className="font-medium text-vibrant-purple">{trend.clicks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};