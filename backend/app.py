from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Reminder, Attendance
import os

app = Flask(__name__)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'dashboard.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

os.makedirs(os.path.join(BASE_DIR, 'instance'), exist_ok=True)

CORS(app, origins=["http://localhost:3000"])

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Backend is running'})


@app.route('/api/reminders', methods=['GET'])
def get_reminders():
    reminders = Reminder.query.order_by(Reminder.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reminders])


@app.route('/api/reminders', methods=['POST'])
def create_reminder():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'Request body must be JSON'}), 400

    title = (data.get('title') or '').strip()
    date = (data.get('date') or '').strip()
    time = (data.get('time') or '').strip()

    if not title:
        return jsonify({'error': 'Title is required'}), 400
    if not date:
        return jsonify({'error': 'Date is required'}), 400
    if len(title) > 200:
        return jsonify({'error': 'Title must be under 200 characters'}), 400

    new_reminder = Reminder(title=title, date=date, time=time)
    db.session.add(new_reminder)
    db.session.commit()

    return jsonify(new_reminder.to_dict()), 201


@app.route('/api/reminders/<int:reminder_id>', methods=['DELETE'])
def delete_reminder(reminder_id):
    reminder = Reminder.query.get(reminder_id)
    if not reminder:
        return jsonify({'error': 'Reminder not found'}), 404

    db.session.delete(reminder)
    db.session.commit()
    return jsonify({'message': 'Reminder deleted', 'id': reminder_id}), 200


@app.route('/api/attendance', methods=['GET'])
def get_attendance():
    records = Attendance.query.all()
    return jsonify([r.to_dict() for r in records])


@app.route('/api/attendance', methods=['POST'])
def create_attendance():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({'error': 'Request body must be JSON'}), 400

    subject = (data.get('name') or data.get('subject') or '').strip()
    if not subject:
        return jsonify({'error': 'Subject name is required'}), 400

    try:
        attended = int(data.get('attended', 0))
        total = int(data.get('total', 0))
    except (ValueError, TypeError):
        return jsonify({'error': 'attended and total must be integers'}), 400

    if attended < 0 or total < 0:
        return jsonify({'error': 'attended and total must be non-negative'}), 400
    if attended > total:
        return jsonify({'error': 'attended cannot exceed total'}), 400

    record = Attendance(
        subject=subject,
        course_code=(data.get('code') or '').strip(),
        faculty=(data.get('professor') or '').strip(),
        attended=attended,
        total=total
    )
    db.session.add(record)
    db.session.commit()
    return jsonify(record.to_dict()), 201


@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def server_error(e):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)