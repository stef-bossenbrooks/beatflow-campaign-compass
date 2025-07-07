import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CampaignCard } from "./CampaignCard";
import { BeatUpload } from "./BeatUpload";
import { Plus, Search, BarChart3, Users, Music, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

const sampleCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Trap Beats Collection",
    status: "active",
    beatsCount: 8,
    emailsSent: 245,
    openRate: 68,
    clickRate: 24,
    createdAt: "2024-01-15",
  },
  {
    id: "2", 
    name: "Lo-Fi Hip Hop Pack",
    status: "completed",
    beatsCount: 12,
    emailsSent: 189,
    openRate: 72,
    clickRate: 31,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Electronic Dance Hits",
    status: "scheduled",
    beatsCount: 6,
    emailsSent: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: "2024-01-20",
    scheduledFor: "2024-02-01",
  },
  {
    id: "4",
    name: "R&B Smooth Vibes",
    status: "draft",
    beatsCount: 4,
    emailsSent: 0,
    openRate: 0,
    clickRate: 0,
    createdAt: "2024-01-22",
  }
];

export const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedView, setSelectedView] = useState<"campaigns" | "upload" | "analytics">("campaigns");
  const { toast } = useToast();

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Creator",
      description: "Campaign creation wizard coming soon!",
    });
  };

  const handleEditCampaign = (id: string) => {
    toast({
      title: "Edit Campaign",
      description: `Editing campaign ${id}`,
    });
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Campaign Deleted",
      description: "Campaign has been removed from your dashboard",
    });
  };

  const handleDuplicateCampaign = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      const duplicate = {
        ...campaign,
        id: Math.random().toString(36).substr(2, 9),
        name: `${campaign.name} (Copy)`,
        status: "draft" as const,
        emailsSent: 0,
        openRate: 0,
        clickRate: 0,
      };
      setCampaigns(prev => [...prev, duplicate]);
      toast({
        title: "Campaign Duplicated",
        description: "A copy has been created as a draft",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    toast({
      title: "Beat Added",
      description: "Beat has been added to the campaign",
    });
  };

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalEmailsSent = campaigns.reduce((sum, c) => sum + c.emailsSent, 0);
  const avgOpenRate = Math.round(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  BeatFlow
                </h1>
              </div>
              
              <nav className="flex gap-1">
                <Button
                  variant={selectedView === "campaigns" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedView("campaigns")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Campaigns
                </Button>
                <Button
                  variant={selectedView === "upload" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedView("upload")}
                >
                  <Music className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button
                  variant={selectedView === "analytics" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedView("analytics")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </nav>
            </div>

            <Button onClick={handleCreateCampaign} variant="electric" className="animate-glow-pulse">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {selectedView === "campaigns" && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-card border-border">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Total Campaigns</p>
                      <p className="text-2xl font-bold">{totalCampaigns}</p>
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
                      <p className="text-muted-foreground text-sm">Active Campaigns</p>
                      <p className="text-2xl font-bold text-electric-blue">{activeCampaigns}</p>
                    </div>
                    <div className="w-12 h-12 bg-vibrant-purple/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-vibrant-purple" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-card border-border">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Emails Sent</p>
                      <p className="text-2xl font-bold">{totalEmailsSent}</p>
                    </div>
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-success" />
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
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-warning" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer">All</Badge>
                <Badge variant="outline" className="cursor-pointer">Active</Badge>
                <Badge variant="outline" className="cursor-pointer">Draft</Badge>
              </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onEdit={handleEditCampaign}
                  onDelete={handleDeleteCampaign}
                  onDuplicate={handleDuplicateCampaign}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </>
        )}

        {selectedView === "upload" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Upload Beats</h2>
              <p className="text-muted-foreground">
                Upload your beats and organize them for your email campaigns
              </p>
            </div>
            <BeatUpload onBeatsUploaded={(beats) => console.log("Beats uploaded:", beats)} />
          </div>
        )}

        {selectedView === "analytics" && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-electric-blue" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Analytics Dashboard</h2>
            <p className="text-muted-foreground mb-6">
              Detailed analytics and reporting features coming soon
            </p>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};