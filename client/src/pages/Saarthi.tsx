import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Square, 
  Play, 
  Pause,
  Download,
  Eye,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Volume2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Saarthi() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentFeedback, setCurrentFeedback] = useState<Array<{
    id: number;
    message: string;
    type: 'positive' | 'suggestion';
    timestamp: string;
  }>>([]);
  const [transcript, setTranscript] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time feedback data
  const [liveMetrics, setLiveMetrics] = useState({
    speakingPace: 85,
    volumeLevel: 72,
    eyeContact: 78,
    engagement: 82,
    clarity: 88
  });

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: isVideoEnabled, 
        audio: isAudioEnabled 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Simulate real-time feedback updates
      const feedbackInterval = setInterval(() => {
        setLiveMetrics(prev => ({
          speakingPace: Math.max(0, Math.min(100, prev.speakingPace + (Math.random() - 0.5) * 10)),
          volumeLevel: Math.max(0, Math.min(100, prev.volumeLevel + (Math.random() - 0.5) * 15)),
          eyeContact: Math.max(0, Math.min(100, prev.eyeContact + (Math.random() - 0.5) * 8)),
          engagement: Math.max(0, Math.min(100, prev.engagement + (Math.random() - 0.5) * 12)),
          clarity: Math.max(0, Math.min(100, prev.clarity + (Math.random() - 0.5) * 6))
        }));
        
        // Add real-time feedback
        const feedbackMessages = [
          "Great eye contact! Keep engaging with your audience.",
          "Consider slowing down your speaking pace slightly.",
          "Excellent use of gestures to emphasize key points.",
          "Your voice projection is perfect for the room size.",
          "Try to pause more between concepts for better comprehension."
        ];
        
        if (Math.random() > 0.7) {
          setCurrentFeedback(prev => [
            ...prev.slice(-4),
            {
              id: Date.now(),
              message: feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)],
              type: Math.random() > 0.3 ? 'positive' : 'suggestion',
              timestamp: new Date().toLocaleTimeString()
            }
          ]);
        }
      }, 3000);

      // Simulate transcript generation
      const transcriptTexts = [
        "Welcome everyone to today's lesson on quantum physics.",
        "Let's start by understanding the fundamental principles.",
        "As you can see from this diagram, electrons behave differently.",
        "Does anyone have questions about wave-particle duality?",
        "The key concept here is superposition of states."
      ];
      
      let transcriptIndex = 0;
      const transcriptInterval = setInterval(() => {
        if (transcriptIndex < transcriptTexts.length) {
          setTranscript(prev => prev + " " + transcriptTexts[transcriptIndex]);
          transcriptIndex++;
        }
      }, 5000);

      // Store intervals for cleanup
      mediaRecorder.addEventListener('stop', () => {
        clearInterval(feedbackInterval);
        clearInterval(transcriptInterval);
      });

    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-edu-light p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-edu-dark mb-2">Saarthi</h1>
              <p className="text-edu-gray">AI-Coached Lesson Delivery Platform with Real-time Feedback</p>
            </div>
            <div className="flex items-center space-x-4">
              {isRecording && (
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="font-mono font-bold">{formatTime(recordingTime)}</span>
                </div>
              )}
              <Badge variant={isRecording ? "destructive" : "secondary"}>
                {isRecording ? "Recording Live" : "Ready to Record"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Recording Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-edu-blue" />
                  <span>Live Teaching Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-64 object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  {!isVideoEnabled && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <VideoOff className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {isRecording && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      LIVE
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={toggleVideo}
                    variant={isVideoEnabled ? "default" : "destructive"}
                    size="sm"
                  >
                    {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    onClick={toggleAudio}
                    variant={isAudioEnabled ? "default" : "destructive"}
                    size="sm"
                  >
                    {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>

                  {!isRecording ? (
                    <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button onClick={stopRecording} variant="destructive">
                      <Square className="h-4 w-4 mr-2" />
                      Stop Recording
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Live Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-edu-green" />
                  <span>Live Transcript</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg h-32 overflow-y-auto">
                  <p className="text-sm text-edu-gray">
                    {transcript || "Transcript will appear here during recording..."}
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Transcript
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Feedback Panel */}
          <div className="space-y-6">
            {/* Live Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-edu-coral" />
                  <span>Live Teaching Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Speaking Pace</span>
                    <span>{liveMetrics.speakingPace}%</span>
                  </div>
                  <Progress value={liveMetrics.speakingPace} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Volume Level</span>
                    <span>{liveMetrics.volumeLevel}%</span>
                  </div>
                  <Progress value={liveMetrics.volumeLevel} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Eye Contact</span>
                    <span>{liveMetrics.eyeContact}%</span>
                  </div>
                  <Progress value={liveMetrics.eyeContact} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Student Engagement</span>
                    <span>{liveMetrics.engagement}%</span>
                  </div>
                  <Progress value={liveMetrics.engagement} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Speech Clarity</span>
                    <span>{liveMetrics.clarity}%</span>
                  </div>
                  <Progress value={liveMetrics.clarity} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Real-time Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-edu-purple" />
                  <span>Live Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {currentFeedback.length === 0 ? (
                    <p className="text-sm text-edu-gray">Feedback will appear here during recording...</p>
                  ) : (
                    currentFeedback.map((feedback) => (
                      <div key={feedback.id} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        {feedback.type === 'positive' ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-sm text-edu-dark">{feedback.message}</p>
                          <p className="text-xs text-edu-gray">{feedback.timestamp}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Session Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-edu-gray" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <span className="font-mono text-sm">{formatTime(recordingTime)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-edu-gray" />
                    <span className="text-sm">Students</span>
                  </div>
                  <span className="text-sm">24 Active</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-edu-gray" />
                    <span className="text-sm">Attention</span>
                  </div>
                  <Badge variant="secondary">High</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Post-Session Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Session Analysis & Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
                <TabsTrigger value="transcript">Full Transcript</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-edu-blue mb-1">85%</div>
                      <p className="text-sm text-edu-gray">Overall Teaching Score</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-edu-green mb-1">92%</div>
                      <p className="text-sm text-edu-gray">Student Engagement</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-edu-purple mb-1">78%</div>
                      <p className="text-sm text-edu-gray">Content Delivery</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="feedback">
                <div className="space-y-3">
                  <p className="text-edu-gray">Comprehensive feedback analysis will be available after recording completion.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="transcript">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-edu-gray">Complete lesson transcript with timestamps will be generated here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-3">
                  <p className="text-edu-gray">AI-powered teaching recommendations will appear here based on session analysis.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}