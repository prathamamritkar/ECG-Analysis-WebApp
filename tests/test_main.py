import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import app

def test_home_route():
    """Test the home route returns expected content"""
    client = app.test_client()
    response = client.get('/')
    
    assert response.status_code == 200
    assert b'Welcome to the Cloud-Based ECG Analysis Portal' in response.data
    assert b'Server Status: Healthy' in response.data

if __name__ == '__main__':
    test_home_route()
    print("All tests passed!")
