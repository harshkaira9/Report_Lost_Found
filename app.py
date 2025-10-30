import os
from flask import Flask, render_template, request, redirect, url_for, flash
from firebase_admin import credentials, initialize_app, firestore, storage
from datetime import datetime

# ========================================
# 🔧 FLASK CONFIGURATION & FIREBASE SETUP
# ========================================

# Tell Flask where frontend files are stored
# Make sure all your .html, .js, .css are inside the 'frontend' folder
app = Flask(__name__, template_folder='frontend', static_folder='frontend', static_url_path='')

# Secret key for session security
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_secret_key')

# --- Firebase Initialization ---
try:
    # Make sure serviceAccountKey.json is in the project root
    CRED = credentials.Certificate("serviceAccountKey.json")

    initialize_app(CRED, {
        'projectId': "itemfinder-239d4",
        'storageBucket': "itemfinder-239d4.appspot.com"
    })

    db = firestore.client()
    BUCKET = storage.bucket()
    print("✅ Firebase Admin SDK Initialized Successfully.")

except Exception as e:
    print(f"🚨 Firebase initialization failed: {e}")
    exit()


# ========================================
# 🧩 HELPER FUNCTION
# ========================================

def get_download_url(blob):
    """Generate a public download URL for uploaded image."""
    return f"https://storage.googleapis.com/{BUCKET.name}/{blob.name}"


# ========================================
# 🌐 ROUTES
# ========================================

@app.route('/')
def index():
    # Redirect to register page by default
    return redirect(url_for('register_page'))

@app.route('/register.html')
def register_page():
    return render_template('register.html')

@app.route('/login.html')
def login_page():
    return render_template('login.html')

@app.route('/account.html')
def account_page():
    return render_template('account.html')

@app.route('/report-item.html')
def report_item_page():
    return render_template('report-item.html')


# ========================================
# 📦 API: REPORT ITEM (Lost/Found Upload)
# ========================================

@app.route('/api/report', methods=['POST'])
def submit_report():
    try:
        report_data = request.form.to_dict()
        item_type = report_data.get('type', 'unknown')

        # Handle uploaded files
        files = request.files.getlist('image')
        image_urls = []

        for file in files:
            if file and file.filename:
                filename = f"{item_type}/{datetime.now().strftime('%Y%m%d%H%M%S')}_{file.filename}"
                blob = BUCKET.blob(filename)
                blob.upload_from_file(file)
                image_urls.append(get_download_url(blob))

        # Save report to Firestore
        report_data['images'] = image_urls
        report_data['timestamp'] = firestore.SERVER_TIMESTAMP
        db.collection('reports').add(report_data)

        flash("✅ Report submitted successfully!", "success")
        return {"message": "Report uploaded successfully."}, 200

    except Exception as e:
        print("❌ Error:", e)
        return {"error": str(e)}, 500


# ========================================
# 🚀 RUN SERVER
# ========================================

if __name__ == '__main__':
    # Access locally via http://127.0.0.1:5000
    # or your local network via http://<your-ip>:5000
    app.run(debug=True, host='0.0.0.0', port=5000)
