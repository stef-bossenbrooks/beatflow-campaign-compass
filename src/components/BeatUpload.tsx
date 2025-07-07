import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, Music, X, Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Beat {
  id: string;
  name: string;
  duration: string;
  size: string;
  format: string;
  uploadProgress: number;
  isUploaded: boolean;
  tags: string[];
}

interface BeatUploadProps {
  onBeatsUploaded: (beats: Beat[]) => void;
}

export const BeatUpload = ({ onBeatsUploaded }: BeatUploadProps) => {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [playingBeat, setPlayingBeat] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const audioFiles = files.filter(file => 
      file.type.startsWith('audio/') || 
      ['.mp3', '.wav', '.m4a', '.aac'].some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (audioFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload audio files only",
        variant: "destructive"
      });
      return;
    }

    uploadFiles(audioFiles);
  }, [toast]);

  const uploadFiles = (files: File[]) => {
    const newBeats: Beat[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name.replace(/\.[^/.]+$/, ""),
      duration: "0:00", // Would be calculated from audio file
      size: formatFileSize(file.size),
      format: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
      uploadProgress: 0,
      isUploaded: false,
      tags: []
    }));

    setBeats(prev => [...prev, ...newBeats]);

    // Simulate upload progress
    newBeats.forEach((beat, index) => {
      const interval = setInterval(() => {
        setBeats(prev => prev.map(b => {
          if (b.id === beat.id) {
            const newProgress = Math.min(b.uploadProgress + Math.random() * 20, 100);
            return {
              ...b,
              uploadProgress: newProgress,
              isUploaded: newProgress === 100
            };
          }
          return b;
        }));
      }, 200 + index * 100);

      setTimeout(() => {
        clearInterval(interval);
        setBeats(prev => prev.map(b => 
          b.id === beat.id ? { ...b, uploadProgress: 100, isUploaded: true } : b
        ));
      }, 2000 + index * 500);
    });

    toast({
      title: "Upload started",
      description: `Uploading ${files.length} beat${files.length > 1 ? 's' : ''}`
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const removeBeat = (beatId: string) => {
    setBeats(prev => prev.filter(b => b.id !== beatId));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  const togglePlay = (beatId: string) => {
    setPlayingBeat(playingBeat === beatId ? null : beatId);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card 
        className={`
          relative border-2 border-dashed transition-all duration-300
          ${isDragOver 
            ? 'border-electric-blue bg-electric-blue/5 shadow-glow' 
            : 'border-border hover:border-electric-blue/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-electric-blue/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-electric-blue" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Your Beats</h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your audio files here, or click to browse
          </p>
          <input
            type="file"
            multiple
            accept="audio/*,.mp3,.wav,.m4a,.aac"
            onChange={handleFileSelect}
            className="hidden"
            id="beat-upload"
          />
          <label htmlFor="beat-upload">
            <Button variant="electric" className="cursor-pointer">
              Choose Files
            </Button>
          </label>
        </div>
      </Card>

      {/* Uploaded Beats */}
      {beats.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Beats</h3>
          <div className="grid gap-4">
            {beats.map(beat => (
              <Card key={beat.id} className="bg-gradient-card border-border">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-electric-blue" />
                      </div>
                      <div>
                        <h4 className="font-medium">{beat.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{beat.duration}</span>
                          <span>{beat.size}</span>
                          <Badge variant="outline" className="text-xs">
                            {beat.format}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {beat.isUploaded && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePlay(beat.id)}
                          className="text-electric-blue hover:text-electric-blue/80"
                        >
                          {playingBeat === beat.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBeat(beat.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {!beat.isUploaded && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Uploading...</span>
                        <span className="text-electric-blue">{Math.round(beat.uploadProgress)}%</span>
                      </div>
                      <Progress value={beat.uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};