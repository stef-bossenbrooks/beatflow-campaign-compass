import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, BarChart3, Edit, Trash2, Calendar } from "lucide-react";

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

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
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
  onDrop
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
        shadow-card hover:shadow-glow animate-fade-in
        ${isDragOver ? 'border-electric-blue border-2 shadow-glow' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        <Badge className={status.color}>
          {status.label}
        </Badge>
      </div>

      {/* Drag over overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-electric-blue/10 border-2 border-dashed border-electric-blue rounded-lg flex items-center justify-center z-10">
          <div className="text-electric-blue font-medium">Drop beats here</div>
        </div>
      )}

      <div className="p-6">
        {/* Campaign header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">{campaign.name}</h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Play className="w-4 h-4" />
              {campaign.beatsCount} beats
            </span>
            {campaign.scheduledFor && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(campaign.scheduledFor).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{campaign.emailsSent}</div>
            <div className="text-xs text-muted-foreground">Sent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-electric-blue">{campaign.openRate}%</div>
            <div className="text-xs text-muted-foreground">Open Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-vibrant-purple">{campaign.clickRate}%</div>
            <div className="text-xs text-muted-foreground">Click Rate</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(campaign.id)}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-electric-blue"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(campaign.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};