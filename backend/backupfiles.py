import wavefront_api_client as wave_api
from wavefront_api_client.rest import ApiException
from wavefront_api_client.models import *
from flask import Flask, request
from flask_cors import CORS, cross_origin
import uuid
import json

app = Flask(__name__)
CORS(app, supports_credentials=True, expose_headers='Authorization')
app.config['CORS_HEADERS'] = 'Content-Type'

    

@app.route('/add', methods=['POST'])
@cross_origin(supports_credentials=True, expose_headers='Authorization')
def add_dashboard():
   data = request.get_json()
   api_key = data.get('apiKey')
   cluster = data.get('cluster')
   current_Dash = data.get('currentDash')

   base_url = f"https://{cluster}.wavefront.com/api/v2/dashboard"


   config = wave_api.Configuration()
   config.host = base_url
   config.api_key["X-AUTH-TOKEN"] = api_key
   client = wave_api.ApiClient(configuration=config, header_name='Authorization', header_value='Bearer ' + api_key)

# instantiate source API
   source_api = wave_api.SourceApi(client)
   sources = source_api.get_all_source()
#  print(current_Dash)
   print(data)

   return 'Success'

if __name__ == '__main__':
    app.run()