#!/usr/bin/env python3
"""Marca uma versão nova em todos os apps. Rode antes de cada commit: python3 bump.py"""
import re,time,json,glob
v=time.strftime('%Y%m%d%H%M%S')
json.dump({'v':v},open('version.json','w'))
for p in ['index.html']+sorted(glob.glob('*/index.html')):
    s=open(p).read()
    if 'const APP_V=' not in s: continue
    s=re.sub(r"const APP_V='[^']*'",f"const APP_V='{v}'",s)
    open(p,'w').write(s)
print('versão',v)
