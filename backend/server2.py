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

cluster = ''
base_url = ''
api_key = ''
current_Dash =''



   

@app.route('/add', methods=['POST'])
@cross_origin(supports_credentials=True, expose_headers='Authorization')
def add_dashboard():
    data = request.json
    cluster = data.get('cluster')
    api_key = data.get('apiKey')
    currentDash = data.get('currentDash')
    base_url = f'https://{cluster}.wavefront.com'

    print(cluster)
    print(api_key)
    print(currentDash)
    print(base_url)
    


    config = wave_api.Configuration()
    config.host = base_url
    config.api_key["X-AUTH-TOKEN"] = api_key
    client = wave_api.ApiClient(configuration=config, header_name='Authorization', header_value='Bearer ' + api_key)
    
    try:
        
        api_instance = wave_api.DashboardApi(wave_api.ApiClient(config))
        created_dashboard = api_instance.create_dashboard(body=currentDash)
        return json.dumps(created_dashboard.to_dict())
    except ApiException as e:
        if e.status == 400:
            #if Dashboard exists
            dashboard_id = currentDash["url"]
            created_dashboard = api_instance.update_dashboard(dashboard_id, body=currentDash)
            return json.dumps(created_dashboard.to_dict())
        else:
            return("Exception when calling DashboardApi->create_dashboard: %s\n" % e, 500)
    

# create an instance of the API class

if __name__ == '__main__':
    app.run()

