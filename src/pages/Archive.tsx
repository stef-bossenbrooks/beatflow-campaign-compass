import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, BarChart3, Archive as ArchiveIcon, Calendar, Music, Eye } from "lucide-react";

interface Beat {
  id: string;
  name: string;
  duration: string;
  size: string;
}

interface Campaign {
  id: string;
  name: string;
  status: "completed";
  beatsCount: number;
  emailsSent: number;
  openRate: number;
  clickRate: number;
  createdAt: string;
  completedAt: string;
  beats?: Beat[];
}

const archivedCampaigns: Campaign[] = [
  {
    id: "arch1",
    name: "Lo-Fi Hip Hop Pack",
    status: "completed",
    beatsCount: 12,
    emailsSent: 189,
    openRate: 72,
    clickRate: 31,
    createdAt: "2024-01-10",
    completedAt: "2024-01-15",
    beats: [
      { id: "b4", name: "Chill Study Beat.wav", duration: "4:12", size: "18.5 MB" },
      { id: "b5", name: "Jazz Cafe Vibes.wav", duration: "3:33", size: "14.9 MB" }
    ]
  },
  {
    id: "arch2",
    name: "Winter Vibes Collection",
    status: "completed",
    beatsCount: 8,
    emailsSent: 156,
    openRate: 68,
    clickRate: 29,
    createdAt: "2023-12-20",
    completedAt: "2023-12-25",
    beats: []
  },
  {
    id: "arch3",
    name: "Trap Essentials Vol.1",
    status: "completed",
    beatsCount: 15,
    emailsSent: 298,
    openRate: 74,
    clickRate: 35,
    createdAt: "2023-12-01",
    completedAt: "2023-12-10",
    beats: []
  }
];

interface ArchiveProps {
  onBack: () => void;
  onViewCampaign: (campaign: Campaign) => void;
}

export const Archive = ({ onBack, onViewCampaign }: ArchiveProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCampaigns = archivedCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEmailsSent = archivedCampaigns.reduce((sum, c) => sum + c.emailsSent, 0);
  const avgOpenRate = Math.round(archivedCampaigns.reduce((sum, c) => sum + c.openRate, 0) / archivedCampaigns.length);
  const avgClickRate = Math.round(archivedCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / archivedCampaigns.length);

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
                <h1 className="text-2xl font-bold text-foreground">Campaign Archive</h1>
                <p className="text-sm text-muted-foreground">
                  Completed campaigns and their performance history
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ArchiveIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {archivedCampaigns.length} archived campaigns
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Archived</p>
                  <p className="text-2xl font-bold">{archivedCampaigns.length}</p>
                </div>
                <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
                  <ArchiveIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Emails Sent</p>
                  <p className="text-2xl font-bold text-electric-blue">{totalEmailsSent}</p>
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
                  <p className="text-muted-foreground text-sm">Avg Open Rate</p>
                  <p className="text-2xl font-bold text-vibrant-purple">{avgOpenRate}%</p>
                </div>
                <div className="w-12 h-12 bg-vibrant-purple/10 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-vibrant-purple" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg Click Rate</p>
                  <p className="text-2xl font-bold text-success">{avgClickRate}%</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-success" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search archived campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Archived Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map(campaign => (
            <Card key={campaign.id} className="bg-gradient-card border-border hover:shadow-glow transition-all duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                      <Badge className="bg-success text-white">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Music className="w-4 h-4" />
                        {campaign.beatsCount} beats
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Completed {new Date(campaign.completedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 max-w-md">
                      <div>
                        <div className="text-sm font-medium text-foreground">{campaign.emailsSent}</div>
                        <div className="text-xs text-muted-foreground">Emails Sent</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-electric-blue">{campaign.openRate}%</div>
                        <div className="text-xs text-muted-foreground">Open Rate</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-vibrant-purple">{campaign.clickRate}%</div>
                        <div className="text-xs text-muted-foreground">Click Rate</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => onViewCampaign(campaign)}
                    className="hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <ArchiveIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No archived campaigns found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Complete some campaigns to see them in the archive"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};