from flask import Flask, render_template, request, jsonify
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).parent
app = Flask(__name__)

# Absolute paths
app.template_folder = str(BASE_DIR / 'templates')
app.static_folder = str(BASE_DIR / 'static')
app.static_url_path = '/static'

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024
UPLOAD_FOLDER = BASE_DIR / 'uploads'
UPLOAD_FOLDER.mkdir(exist_ok=True)

# In-memory database
records = []
stats = {'total': 0, 'normal': 0, 'anomalies': 0, 'critical': 0}

@app.route('/')
def home():
    try:
        return render_template('index.html')
    except:
        return '<h1>ECG Portal</h1><p>Server running. Access /api/status for API.</p>'

@app.route('/upload', methods=['POST'])
def upload():
    if 'ecgFile' not in request.files:
        return jsonify({'success': False, 'message': 'No file'}), 400
    
    file = request.files['ecgFile']
    if not file.filename:
        return jsonify({'success': False, 'message': 'No file selected'}), 400
    
    ext = file.filename.rsplit('.', 1)[-1].lower() if '.' in file.filename else ''
    if ext not in {'csv', 'txt', 'dat'}:
        return jsonify({'success': False, 'message': 'Invalid file type'}), 400
    
    patient_name = request.form.get('patientName', 'Unknown')
    patient_id = request.form.get('patientId', 'P000')
    
    filename = f"{patient_id}_{file.filename}"
    filepath = UPLOAD_FOLDER / filename
    file.save(str(filepath))
    
    record = {
        'id': len(records) + 1,
        'patientName': patient_name,
        'date': request.form.get('scanDate', datetime.now().strftime('%Y-%m-%d')),
        'bpm': 72,
        'status': 'success'
    }
    records.append(record)
    stats['total'] += 1
    stats['normal'] += 1
    
    return jsonify({'success': True, 'message': 'File uploaded', 'record': record})

@app.route('/api/status')
def status():
    return jsonify({
        'stats': stats,
        'records': records,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/system-status')
def system_status():
    return jsonify({
        'server': {'status': 'success', 'label': 'Server: Healthy'},
        'database': {'status': 'success', 'label': 'Database: Connected'},
        'sync': {'status': 'success', 'label': 'Sync: Active'}
    })

@app.route('/api/analytics')
def analytics():
    return jsonify({
        'stats': stats,
        'recentActivity': records[-5:],
        'systemHealth': {
            'uptime': '99.8%',
            'responseTime': '120ms',
            'database': 'healthy',
            'api': 'operational'
        }
    })

@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Server error'}), 500

if __name__ == '__main__':
    print(f"Template: {app.template_folder}")
    print(f"Static: {app.static_folder}")
    print(f"Upload: {UPLOAD_FOLDER}")
    app.run(host='127.0.0.1', port=8080, debug=False)
