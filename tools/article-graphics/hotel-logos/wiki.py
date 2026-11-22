# Downloads a (fair-use) logo file from English Wikipedia: original SVG, or a 1600px PNG thumb if the SVG fails.
import json,sys,time,urllib.request,urllib.parse
UA={'User-Agent':'logo-research-script/1.0'}
def get(title,slug):
    u='https://en.wikipedia.org/w/api.php?'+urllib.parse.urlencode(dict(action='query',titles='File:'+title,prop='imageinfo',iiprop='url',iiurlwidth=1600,format='json'))
    ii=list(json.load(urllib.request.urlopen(urllib.request.Request(u,headers=UA)))['query']['pages'].values())[0]['imageinfo'][0]
    for url,ext in ((ii['url'],ii['url'].split('?')[0].rsplit('.',1)[1].lower()),(ii.get('thumburl'),'png')):
        try:
            d=urllib.request.urlopen(urllib.request.Request(url,headers=UA),timeout=30).read()
            if b'<html' not in d[:300].lower(): open(f'logos/{slug}.{ext}','wb').write(d); return ext
        except Exception as e: time.sleep(3)
for a in sys.argv[1:]:
    t,s=a.split('|'); [__import__('os').remove(f'logos/{f}') for f in __import__('os').listdir('logos') if f.rsplit('.',1)[0]==s]
    print(s,get(t,s)); time.sleep(1.5)
