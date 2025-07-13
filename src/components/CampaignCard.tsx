import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Upload, ChevronRight } from "lucide-react";

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
}

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onExpand: (id: string) => void;
}

const statusConfig = {
  draft: { color: "bg-muted text-muted-foreground", label: "Draft" },
  active: { color: "bg-electric-blue text-primary-foreground", label: "Active" },
  completed: { color: "bg-success text-white", label: "Completed" },
  scheduled: { color: "bg-vibrant-purple text-secondary-foreground", label: "Scheduled" }
};

export const CampaignCard = ({
  campaign,
  onEdit,
  onDelete,
  onDuplicate,
  onDragOver,
  onDrop,
  onExpand
}: CampaignCardProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const status = statusConfig[campaign.status];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  return (
    <Card 
      className={`
        relative overflow-hidden transition-all duration-300 
        bg-gradient-card border-border hover:border-primary/30
        shadow-card hover:shadow-glow animate-fade-in cursor-pointer
        ${isDragOver ? 'border-electric-blue border-2 shadow-glow scale-105' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-20">
        <Badge className={status.color}>
          {status.label}
        </Badge>
      </div>

      {/* Drag drop overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-electric-blue/20 border-2 border-dashed border-electric-blue rounded-lg flex items-center justify-center z-10">
          <div className="text-electric-blue font-medium flex items-center gap-2">
            <Music className="w-5 h-5" />
            Drop beats here
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Campaign name */}
        <h3 className="text-lg font-semibold text-foreground mb-3 pr-16">{campaign.name}</h3>
        
        {/* Beat count */}
        <div className="flex items-center gap-2 mb-4 text-muted-foreground">
          <Music className="w-4 h-4" />
          <span className="text-sm">{campaign.beatsCount} beats</span>
        </div>

        {/* Large drag and drop area */}
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 mb-4 text-center hover:border-electric-blue/50 transition-colors">
          <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground/70">Drag & drop beats here</p>
        </div>

        {/* Expand button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            onExpand(campaign.id);
          }}
          className="w-full"
        >
          View Campaign Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};