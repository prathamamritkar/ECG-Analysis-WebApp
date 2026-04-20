from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return """
    <h1>Welcome to the Cloud-Based ECG Analysis Portal</h1>
    <p>Patient Data Syncing: Active</p>
    <p>Server Status: Healthy</p>
    """

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
