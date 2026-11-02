F="highpass=f=110:poles=2,afftdn=nr=7:nf=-42:tn=1,equalizer=f=220:t=q:w=1:g=-5,equalizer=f=450:t=q:w=1.2:g=-2,equalizer=f=2800:t=q:w=1:g=4,equalizer=f=5000:t=q:w=1:g=4,treble=g=5:f=7000:t=s:w=0.6,aexciter=amount=2:drive=6:freq=4500:blend=0,deesser=i=0.35,acompressor=threshold=-22dB:ratio=3:attack=4:release=110:makeup=3"
ffmpeg -loglevel error -y -i raw.m4a -ac 1 -ar 48000 -af "$F" clean_full2.wav
