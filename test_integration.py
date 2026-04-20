"""
ECG Analysis Portal - Integration Test Suite
Tests all functionality end-to-end
"""

import requests
import json
import time
from pathlib import Path

BASE_URL = "http://localhost:8080"

def print_test(msg, status):
    """Print formatted test message"""
    icons = {"PASS": "✓", "FAIL": "✗", "INFO": "ℹ"}
    print(f"[{icons.get(status, '?')}] {msg}")

def test_home():
    """Test: Homepage loads"""
    try:
        r = requests.get(f"{BASE_URL}/")
        return r.status_code == 200
    except:
        return False

def test_api_status():
    """Test: API status endpoint"""
    try:
        r = requests.get(f"{BASE_URL}/api/status")
        if r.status_code != 200:
            return False
        data = r.json()
        return 'stats' in data and 'records' in data
    except:
        return False

def test_system_status():
    """Test: System status endpoint"""
    try:
        r = requests.get(f"{BASE_URL}/api/system-status")
        if r.status_code != 200:
            return False
        data = r.json()
        return 'server' in data and 'database' in data and 'sync' in data
    except:
        return False

def test_analytics():
    """Test: Analytics endpoint"""
    try:
        r = requests.get(f"{BASE_URL}/api/analytics")
        if r.status_code != 200:
            return False
        data = r.json()
        return 'stats' in data and 'systemHealth' in data
    except:
        return False

def test_upload_valid():
    """Test: Valid file upload"""
    try:
        test_file = Path("temp_test.csv")
        test_file.write_text("time,voltage\n0,0.1\n1,0.2\n")
        
        with open(test_file, 'rb') as f:
            files = {'ecgFile': f}
            data = {'patientName': 'Test', 'patientId': 'P001', 'scanDate': '2026-04-20'}
            r = requests.post(f"{BASE_URL}/upload", files=files, data=data)
        
        test_file.unlink()
        
        if r.status_code != 200:
            return False
        result = r.json()
        return result.get('success') == True
    except:
        return False

def test_upload_invalid_type():
    """Test: Invalid file type rejected"""
    try:
        test_file = Path("temp_test.xyz")
        test_file.write_text("invalid")
        
        with open(test_file, 'rb') as f:
            files = {'ecgFile': f}
            data = {'patientName': 'Test', 'patientId': 'P002'}
            r = requests.post(f"{BASE_URL}/upload", files=files, data=data)
        
        test_file.unlink()
        
        return r.status_code == 400 and not r.json().get('success')
    except:
        return False

def test_upload_no_file():
    """Test: Missing file handling"""
    try:
        data = {'patientName': 'Test', 'patientId': 'P003'}
        r = requests.post(f"{BASE_URL}/upload", data=data)
        return r.status_code == 400 and not r.json().get('success')
    except:
        return False

def test_404():
    """Test: 404 error handling"""
    try:
        r = requests.get(f"{BASE_URL}/fake-route")
        return r.status_code == 404
    except:
        return False

def run_tests():
    """Run all tests"""
    print("\n" + "="*50)
    print("ECG ANALYSIS PORTAL - TEST SUITE")
    print("="*50 + "\n")
    
    # Wait for server
    print("[ℹ] Waiting for server...")
    for i in range(15):
        try:
            requests.get(f"{BASE_URL}/")
            break
        except:
            time.sleep(0.3)
    
    tests = [
        ("Homepage loads", test_home),
        ("API status endpoint", test_api_status),
        ("System status endpoint", test_system_status),
        ("Analytics endpoint", test_analytics),
        ("Valid file upload", test_upload_valid),
        ("Invalid file rejection", test_upload_invalid_type),
        ("Missing file handling", test_upload_no_file),
        ("404 error handling", test_404),
    ]
    
    print("\nRUNNING TESTS:\n")
    passed = 0
    for name, test_func in tests:
        result = test_func()
        status = "PASS" if result else "FAIL"
        print_test(name, status)
        if result:
            passed += 1
    
    total = len(tests)
    print("\n" + "="*50)
    print(f"RESULTS: {passed}/{total} PASSED")
    print("="*50 + "\n")
    
    return passed == total

if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)

