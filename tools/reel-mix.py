# python3 tools/reel-mix.py <src dir> <duration> <lead> "<kind>@<audio time> ..."  -> mix.wav (voice + light sfx, sfx 14-18 dB under the voice)
import sys,subprocess,os
src,dur,lead=sys.argv[1],float(sys.argv[2]),float(sys.argv[3])
S=os.path.join(os.path.dirname(__file__),'..','sfx')
K={'click':('04 واجهات ونقرات - UI & Clicks/click.wav',.20),'pop':('04 واجهات ونقرات - UI & Clicks/pop_soft.wav',.22),'tick':('04 واجهات ونقرات - UI & Clicks/soft_tick.wav',.25),
   'whoosh':('01 انتقالات - Transitions/whoosh_soft.wav',.17),'swipe':('01 انتقالات - Transitions/swipe.wav',.13),'err':('06 تنبيهات وأخطاء - Alerts/interface_error_001.wav',.13),'chime':('05 نغمات - Chimes & Tones/soft_chime.wav',.18)}
ev=[e.split('@') for e in sys.argv[4].split()]
cmd=['ffmpeg','-loglevel','error','-y','-i',os.path.join(src,'voice-tight.wav')];f=f"[0]adelay={int(lead*1000)}:all=1,apad=whole_dur={dur},atrim=0:{dur},aformat=channel_layouts=stereo[v];";lab='[v]'
for i,(k,t) in enumerate(ev):
    cmd+=['-i',os.path.join(S,K[k][0])];f+=f"[{i+1}]aformat=channel_layouts=stereo,adelay={int((float(t)+lead)*1000)}:all=1,volume={K[k][1]}[s{i}];";lab+=f"[s{i}]"
f+=lab+f"amix=inputs={len(ev)+1}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11[o]"
subprocess.run(cmd+['-filter_complex',f,'-map','[o]','-ar','48000',os.path.join(src,'mix.wav')],check=True);print('mix ok')
