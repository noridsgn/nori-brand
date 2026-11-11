# Original lo-fi bed synthesized here (royalty-free): EP chords, bass, soft kick, brushed hats.
import numpy as np, wave
sr=48000; bpm=92; beat=60/bpm; dur=38.5; n=int(sr*dur); out=np.zeros((n,2))
rng=np.random.default_rng(7)
def note(f,t0,length,amp,pan=0.5,kind='ep'):
    i0=int(t0*sr); L=int(length*sr); 
    if i0>=n: return
    L=min(L,n-i0); t=np.arange(L)/sr
    if kind=='ep':
        env=np.exp(-t*1.6)*(1-np.exp(-t*80))
        s=(np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*2*f*t)*np.exp(-t*4)+0.12*np.sin(2*np.pi*3*f*t)*np.exp(-t*7))
        s*=1+0.15*np.sin(2*np.pi*4.5*t)  # tremolo
    else:
        env=np.exp(-t*2.2)*(1-np.exp(-t*60)); s=np.sin(2*np.pi*f*t)+0.2*np.sin(2*np.pi*2*f*t)
    s=s*env*amp
    out[i0:i0+L,0]+=s*(1-pan); out[i0:i0+L,1]+=s*pan
m=lambda k:440*2**((k-69)/12)
prog=[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]]  # Fmaj7 Em7 Dm7 Cmaj7
bass=[41,40,38,36]
bar=4*beat; t=0; i=0
while t<dur:
    c=prog[i%4]
    for k,p in enumerate(c): note(m(p),t+k*0.012,bar*1.05,0.09,0.35+0.1*k)
    note(m(c[-1]+12),t+2.5*beat,beat*1.5,0.035,0.7)
    note(m(bass[i%4]),t,beat*1.8,0.22,0.5,'bass'); note(m(bass[i%4]),t+2.5*beat,beat*1.2,0.15,0.5,'bass')
    for b in range(4):
        tb=t+b*beat
        if b in (0,2):  # soft kick
            i0=int(tb*sr);L=int(0.35*sr)
            if i0+L<n:
                tt=np.arange(L)/sr; f=50+70*np.exp(-tt*30); k=np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-tt*9)*0.32
                out[i0:i0+L]+=k[:,None]
        if b in (1,3):  # soft snare-ish brush
            i0=int(tb*sr);L=int(0.2*sr)
            if i0+L<n: out[i0:i0+L]+=(rng.normal(0,1,L)*np.exp(-np.arange(L)/sr*22)*0.05)[:,None]
        for h in (0,0.5):  # hats
            i0=int((tb+h*beat+0.015*(h>0))*sr);L=int(0.05*sr)
            if i0+L<n:
                x=rng.normal(0,1,L); x=np.diff(np.concatenate([[0],x]))
                out[i0:i0+L]+=(x*np.exp(-np.arange(L)/sr*70)*(0.02 if h else 0.03))[:,None]
    t+=bar; i+=1
# gentle lowpass + light crackle
from numpy.fft import rfft,irfft
for ch in range(2):
    X=rfft(out[:,ch]); f=np.fft.rfftfreq(n,1/sr); X*=1/np.sqrt(1+(f/4500)**4); out[:,ch]=irfft(X,n)
out+=(rng.random((n,1))<0.0004)*rng.normal(0,0.04,(n,1))
fade=np.ones(n); fi=int(0.8*sr); fo=int(2.5*sr); fade[:fi]=np.linspace(0,1,fi); fade[-fo:]=np.linspace(1,0,fo)
out*=fade[:,None]; out/=np.abs(out).max()*1.1
w=wave.open('music-bed.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((out*32767).astype('<i2').tobytes()); w.close()
