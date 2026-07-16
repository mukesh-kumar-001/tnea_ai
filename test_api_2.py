import urllib.request
import json
req = urllib.request.urlopen('http://127.0.0.1:5000/api/cutoffs/?college_code=5914&category=BC&per_page=5')
data = json.loads(req.read().decode())
print(json.dumps(data, indent=2))
