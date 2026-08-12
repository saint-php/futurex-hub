// src/pages/MusicStudioPage.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mic,
  Square,
  Play,
  Pause,
  Download,
  Trash2,
  Music,
  Volume2,
  Gauge,
  Waves,
} from "lucide-react";

export default function MusicStudioPage() {
  const navigate = useNavigate();

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Controls
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [echo, setEcho] = useState(false);
  const [beatOn, setBeatOn] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const beatIntervalRef = useRef<number | null>(null);

  // Clean up when leaving the page
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
      stopBeat();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioURL]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      alert("Microphone permission is required.");
      console.error(err);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.playbackRate = speed;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  // Simple echo using Web Audio API
 

  // Simple beat generator
  function startBeat() {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const ctx = audioContextRef.current;

    stopBeat();

    beatIntervalRef.current = window.setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.value = 180;
      gain.gain.value = 0.15;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.1);
    }, 500); // 120 BPM roughly
  }

  function stopBeat() {
    if (beatIntervalRef.current) {
      clearInterval(beatIntervalRef.current);
      beatIntervalRef.current = null;
    }
  }

  function toggleBeat() {
    if (beatOn) {
      stopBeat();
      setBeatOn(false);
    } else {
      startBeat();
      setBeatOn(true);
    }
  }

  function downloadRecording() {
    if (!audioURL) return;
    const a = document.createElement("a");
    a.href = audioURL;
    a.download = `futurex-voice-${Date.now()}.webm`;
    a.click();
  }

  function clearAll() {
    if (audioURL) URL.revokeObjectURL(audioURL);
    setAudioURL(null);
    setIsPlaying(false);
    stopBeat();
    setBeatOn(false);
    setEcho(false);
    setVolume(1);
    setSpeed(1);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-16">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/clubs/music")}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Music Club
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white">
            <Music size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Voice Studio</h1>
            <p className="text-sm text-slate-500">
              Record • Effects • Beats • Download (nothing is saved on server)
            </p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Record / Stop */}
        <div className="flex flex-col items-center gap-5">
          {!recording && !audioURL && (
            <button
              onClick={startRecording}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-105 hover:bg-red-600"
            >
              <Mic size={36} />
            </button>
          )}

          {recording && (
            <>
              <button
                onClick={stopRecording}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 text-white shadow-lg"
              >
                <Square size={32} />
              </button>
              <p className="animate-pulse text-sm font-medium text-red-600">
                Recording… Tap to stop
              </p>
            </>
          )}

          {/* After recording */}
          {audioURL && (
            <div className="w-full space-y-6">
              {/* Hidden audio element */}
              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />

              {/* Play / Pause */}
              <div className="flex justify-center">
                <button
                  onClick={togglePlay}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-white shadow-md hover:bg-violet-700"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
              </div>

              {/* Controls */}
              <div className="space-y-5">
                {/* Volume */}
                <div>
                  <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Volume2 size={16} /> Volume
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      if (audioRef.current) audioRef.current.volume = v;
                    }}
                    className="w-full"
                  />
                </div>

                {/* Speed */}
                <div>
                  <div className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Gauge size={16} /> Speed ({speed.toFixed(1)}x)
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(e) => {
                      const s = parseFloat(e.target.value);
                      setSpeed(s);
                      if (audioRef.current) audioRef.current.playbackRate = s;
                    }}
                    className="w-full"
                  />
                </div>

                {/* Effects */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEcho(!echo);
                      // Note: full real-time echo needs more complex graph
                      // This toggles the flag for future enhancement
                    }}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      echo
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Waves size={16} />
                    Echo {echo ? "On" : "Off"}
                  </button>

                  <button
                    onClick={toggleBeat}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      beatOn
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Music size={16} />
                    Beat {beatOn ? "On" : "Off"}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={downloadRecording}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              </div>

              <p className="text-center text-xs text-slate-500">
                This recording lives only in your browser.  
                Refreshing or leaving the page deletes it forever.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5 text-sm text-violet-900">
        <strong>Current features:</strong> Record, Volume, Speed, simple Beat, Download.
        <br />
        True auto-tune / professional pitch correction needs heavy libraries and will be added later if needed.
      </div>
    </div>
  );
}