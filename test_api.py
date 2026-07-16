import requests
response = requests.get('http://127.0.0.1:5000/api/cutoffs/?college_code=5914&category=BC&per_page=5')
print(response.json())
