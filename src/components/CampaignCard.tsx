import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, BarChart3, Edit, Trash2, Calendar, ChevronDown, ChevronUp, Upload, Music } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);
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
        ${isExpanded ? 'ring-2 ring-primary/20' : ''}
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

      {/* Drag drop hint overlay */}
      {!isDragOver && (
        <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground/60 text-sm flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Drop beats here
          </div>
        </div>
      )}

      {/* Active drag over overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-electric-blue/20 border-2 border-dashed border-electric-blue rounded-lg flex items-center justify-center z-10">
          <div className="text-electric-blue font-medium flex items-center gap-2">
            <Music className="w-5 h-5" />
            Drop beats here
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Campaign header */}
        <div 
          className="mb-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground mb-2">{campaign.name}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-primary/10"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
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

        {/* Expanded beats list */}
        {isExpanded && (
          <div className="mb-4 border-t border-border pt-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Beats in this campaign</h4>
            {campaign.beats && campaign.beats.length > 0 ? (
              <div className="space-y-2">
                {campaign.beats.map((beat) => (
                  <div key={beat.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{beat.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{beat.duration}</span>
                      <span>{beat.size}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 border-2 border-dashed border-muted-foreground/30 rounded-lg">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No beats yet</p>
                <p className="text-xs text-muted-foreground/70">Drag and drop beats here</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(campaign.id);
            }}
            className="flex-1"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => e.stopPropagation()}
            className="text-muted-foreground hover:text-electric-blue"
          >
            <BarChart3 className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(campaign.id);
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};