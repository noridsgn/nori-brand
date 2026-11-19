import sys, json, time
from faster_whisper import WhisperModel
t0=time.time()
m=WhisperModel(sys.argv[2] if len(sys.argv)>2 else "large-v3-turbo", device="cpu", compute_type="int8")
print('load',round(time.time()-t0,1),flush=True)
import subprocess, numpy as np
raw=subprocess.run(['ffmpeg','-loglevel','error','-i',sys.argv[1],'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout
audio=np.frombuffer(raw,np.float32)
segs,info=m.transcribe(audio, language="ar", word_timestamps=True, vad_filter=False,
  initial_prompt=sys.argv[3] if len(sys.argv)>3 else "عندك خمس ثواني بس. البايو، صورة البروفايل، الهايلايتس، المنيو، الأسعار، شلون تطلب، الزباين، الدايركت، بروفايل، ستوري")
out=[]
for s in segs:
    out.append({'start':round(s.start,2),'end':round(s.end,2),'text':s.text,'words':[{'w':w.word,'s':round(w.start,2),'e':round(w.end,2),'p':round(w.probability,2)} for w in s.words]})
    print(round(s.start,2),round(s.end,2),s.text,flush=True)
json.dump(out,open(sys.argv[1]+'.words.json','w'),ensure_ascii=False,indent=1)
print('total',round(time.time()-t0,1))
