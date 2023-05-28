import wavefront_api_client as wave_api
from wavefront_api_client.rest import ApiException
from wavefront_api_client.models import *
from flask import Flask, request
from flask_cors import CORS, cross_origin
import uuid
import json

# Configure the Flask server
app = Flask(__name__)
CORS(app, supports_credentials=True, expose_headers='Authorization')
app.config['CORS_HEADERS'] = 'Content-Type'

# Constants
base_url = 'https://demo.wavefront.com'
api_key = '0759febe-a552-4918-8da5-766a71ca2f3c'

# Create a Wavefront API Client
config = wave_api.Configuration()
config.host = base_url
config.api_key["X-AUTH-TOKEN"] = api_key
client = wave_api.ApiClient(configuration=config, header_name='Authorization', header_value='Bearer ' + api_key)


def deserialize_dashboard(dashboard_dict):
    """Deserializes a dictionary into a Dashboard object."""
    dashboard_id = dashboard_dict.get('id', str(uuid.uuid4()))
    dashboard_name = dashboard_dict.get('name', 'New Dashboard')
    dashboard_url = dashboard_dict.get('url', str(uuid.uuid4()))
    dashboard_sections = []
    for section_dict in dashboard_dict.get('sections', []):
        section_name = section_dict.get('name', str(uuid.uuid4()))
        section_rows = []
        for row_dict in section_dict.get('rows', []):
            row_charts = []
            for chart_dict in row_dict.get('charts', []):
                chart_name = chart_dict.get('name', str(uuid.uuid4()))
                chart_sources = []
                for source_dict in chart_dict.get('sources', []):
                    source_name = source_dict.get('name', str(uuid.uuid4()))
                    source_query = source_dict.get('query', '*')
                    chart_sources.append(ChartSourceQuery(name=source_name, query=source_query))
                row_charts.append(Chart(name=chart_name, sources=chart_sources))
            section_rows.append(DashboardSectionRow(charts=row_charts))
        dashboard_sections.append(DashboardSection(name=section_name, rows=section_rows))
    return Dashboard(id=dashboard_id, name=dashboard_name, sections=dashboard_sections, url=dashboard_url)


@app.route('/create_dashboard', methods=['POST'])
@cross_origin(supports_credentials=True, expose_headers='Authorization')
def create_dashboard():
    """Creates a new dashboard based on the JSON input.

    Returns:
       The created dashboard.

    Raises:
       ApiException: If there was an error creating the dashboard.
    """
    try:
        dashboard_dict = request.json
        dashboard_body = deserialize_dashboard(dashboard_dict)
        api_instance = wave_api.DashboardApi(wave_api.ApiClient(config))
        created_dashboard = api_instance.create_dashboard(body=dashboard_body)
        return json.dumps(created_dashboard.to_dict())
    except ApiException as e:
        return("Exception when calling DashboardApi->create_dashboard: %s\n" % e, 500)
    
    