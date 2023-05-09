import wavefront_api_client as wave_api
from wavefront_api_client.rest import ApiException
from wavefront_api_client.models import *
from flask import Flask
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)


base_url = 'https://demo.wavefront.com'
api_key = 'xxxxx'

config = wave_api.Configuration()
config.host = base_url 
config.api_key["X-AUTH-TOKEN"] = api_key
client = wave_api.ApiClient(configuration=config, header_name='Authorization', header_value='Bearer ' + api_key)


@app.route('/create_dashboard')
@cross_origin(supports_credentials=True)
def create_dashboard():
    print("we reached this")
    api_instance = wave_api.DashboardApi(wave_api.ApiClient(config))
    body = wave_api.Dashboard(id = "foo", name="bar", sections=[DashboardSection(name = "dashboard_1", rows=[DashboardSectionRow(charts = [Chart(name="chart1", sources=[ChartSourceQuery(name = "query1", query="*")])])])], url="api-example" ) # Dashboard | Example Body:  <pre>{   \"name\": \"Dashboard API example\",   \"id\": \"api-example\",   \"url\": \"api-example\",   \"description\": \"Dashboard Description\",   \"sections\": [     {       \"name\": \"Section 1\",       \"rows\": [         {           \"charts\": [             {               \"name\": \"Chart 1\",               \"description\": \"description1\",               \"sources\": [                 {                   \"name\": \"Source1\",                   \"query\": \"ts()\"                 }               ]             }           ]         }       ]     }   ] }</pre> (optional)
    print("print line 24")
    try:
        # Create a specific dashboard
        api_response = api_instance.create_dashboard(body=body)
        print("print line 28")
        return(api_response)
    except ApiException as e:
        return(500, "Exception when calling DashboardApi->create_dashboard: %s\n" % e)
    
    