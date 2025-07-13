import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Music, 
  Play, 
  BarChart3, 
  Users, 
  Calendar, 
  Mail, 
  Edit, 
  Download,
  Volume2,
  Clock
} from "lucide-react";

interface Beat {
  id: string;
  name: string;
  duration: string;
  size: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "draft" | "active" | "completed" | "scheduled";
  beatsCount: number;
  emailsSent: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  scheduledFor?: string;
  beats?: Beat[];
  isRecurring?: boolean;
  emailList?: string[];
  schedule?: string;
}

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
}

const statusConfig = {
  draft: { color: "bg-muted text-muted-foreground", label: "Draft" },
  active: { color: "bg-electric-blue text-primary-foreground", label: "Active" },
  completed: { color: "bg-success text-white", label: "Completed" },
  scheduled: { color: "bg-vibrant-purple text-secondary-foreground", label: "Scheduled" }
};

export const CampaignDetails = ({ campaign, onBack }: CampaignDetailsProps) => {
  const [selectedBeat, setSelectedBeat] = useState<string | null>(null);
  const status = statusConfig[campaign.status];

  // Mock data for demonstration
  const mockEmailList = [
    "producer1@example.com",
    "beatmaker@studio.com", 
    "artist@music.com",
    "manager@label.com",
    "dj@radio.com"
  ];

  const mockAnalytics = {
    totalSent: 245,
    delivered: 240,
    opened: 167,
    clicked: 58,
    bounced: 5,
    unsubscribed: 3
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
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
                Back to Campaigns
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <Badge className={status.color}>{status.label}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="hover:bg-primary/10">
              <Edit className="w-4 h-4 mr-2" />
              Edit Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Beats Grid */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    Beats ({campaign.beats?.length || 0})
                  </h3>
                  <Button variant="outline" size="sm">
                    Add Beats
                  </Button>
                </div>
                
                {campaign.beats && campaign.beats.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {campaign.beats.map((beat) => (
                      <Card
                        key={beat.id}
                        className={`
                          p-4 cursor-pointer transition-all duration-200 hover:shadow-glow
                          ${selectedBeat === beat.id ? 'ring-2 ring-electric-blue' : ''}
                        `}
                        onClick={() => setSelectedBeat(selectedBeat === beat.id ? null : beat.id)}
                      >
                        <div className="aspect-square bg-gradient-subtle rounded-lg mb-3 flex items-center justify-center">
                          <Volume2 className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium text-sm text-foreground truncate mb-1">
                          {beat.name}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {beat.duration}
                          </span>
                          <span>{beat.size}</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Play className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                    <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h4 className="text-lg font-medium text-foreground mb-2">No beats yet</h4>
                    <p className="text-muted-foreground mb-4">Add beats to this campaign to get started</p>
                    <Button variant="outline">Add Beats</Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Analytics (if recurring or completed) */}
            {(campaign.isRecurring || campaign.status === 'completed' || campaign.status === 'active') && (
              <Card className="bg-gradient-card border-border">
                <div className="p-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5" />
                    Campaign Analytics
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-foreground">{mockAnalytics.totalSent}</div>
                      <div className="text-sm text-muted-foreground">Total Sent</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-electric-blue">{mockAnalytics.opened}</div>
                      <div className="text-sm text-muted-foreground">Opened</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-vibrant-purple">{mockAnalytics.clicked}</div>
                      <div className="text-sm text-muted-foreground">Clicked</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-success">{mockAnalytics.delivered}</div>
                      <div className="text-sm text-muted-foreground">Delivered</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{mockAnalytics.bounced}</div>
                      <div className="text-sm text-muted-foreground">Bounced</div>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-destructive">{mockAnalytics.unsubscribed}</div>
                      <div className="text-sm text-muted-foreground">Unsubscribed</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Info */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>
                <div className="space-y-3">
                  {campaign.scheduledFor && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Scheduled For</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(campaign.scheduledFor).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Email List</div>
                      <div className="text-sm text-muted-foreground">
                        {mockEmailList.length} recipients
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Music className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Beats</div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.beatsCount} tracks
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <Users className="w-4 h-4 mr-2" />
                  View Email List
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Campaign
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    Preview Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};