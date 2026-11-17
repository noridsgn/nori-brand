#!/bin/sh
# build.sh designs|slides  -> fills {SYM} and screenshots
python3 -c "
import sys;n=sys.argv[1];open(n+'.html','w').write(open(n+'.tpl.html').read().replace('{SYM}',open('sym.html').read()))" $1
