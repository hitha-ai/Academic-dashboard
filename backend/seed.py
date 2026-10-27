from app import app
from models import db, Attendance, Reminder

SEED_ATTENDANCE = [
    {"code": "B22EF0601", "name": "Cryptography and Network Security", "professor": "Spandana S G", "attended": 14, "total": 20},
    {"code": "B22EF0602", "name": "Web Technology", "professor": "Sonali Rawat", "attended": 18, "total": 20},
    {"code": "B22EF0603", "name": "Agile Software Development and DevOps", "professor": "Neelam Malyadri", "attended": 16, "total": 22},
    {"code": "B22EF0604", "name": "Cloud Computing", "professor": "Shreedhar B", "attended": 18, "total": 18},
    {"code": "B22EF0608", "name": "Mini Project / Summer Internship", "professor": "-", "attended": 0, "total": 0},
    {"code": "B22EF0601X", "name": "Placement Training-6-CSE", "professor": "Shivalingappa", "attended": 24, "total": 26},
    {"code": "B22EF0605", "name": "Cryptography and Network Security Lab", "professor": "Asha K", "attended": 16, "total": 18},
    {"code": "B22EF0606", "name": "Web Technology Lab", "professor": "Sonali Rawat", "attended": 14, "total": 14},
    {"code": "B22EF0607", "name": "Cloud Computing Lab", "professor": "Shreedhar B", "attended": 12, "total": 14},
    {"code": "B22EFS613", "name": "Augmented Reality and Virtual Reality", "professor": "Soujanya B K", "attended": 17, "total": 19},
    {"code": "B22EFS623", "name": "Blockchain Technology and Applications", "professor": "Mandara C M", "attended": 15, "total": 22},
    {"code": "B22MEO601", "name": "Energy Technology", "professor": "Veerbhadrappa", "attended": 17, "total": 17},
]

with app.app_context():
    db.create_all()

    Attendance.query.delete()
    Reminder.query.delete()
    db.session.commit()

    for item in SEED_ATTENDANCE:
        record = Attendance(
            subject=item["name"],
            course_code=item["code"],
            faculty=item["professor"],
            attended=item["attended"],
            total=item["total"]
        )
        db.session.add(record)

    sample_reminders = [
        {"title": "Submit Web Technology Assignment", "date": "2026-05-10", "time": "23:59"},
        {"title": "Prepare for Cryptography Exam", "date": "2026-05-15", "time": "09:00"},
    ]
    for r in sample_reminders:
        db.session.add(Reminder(**r))

    db.session.commit()

    print(f"[OK] Seeded {len(SEED_ATTENDANCE)} attendance records")
    print(f"[OK] Seeded {len(sample_reminders)} reminders")
    print("[OK] Database created at backend/instance/dashboard.db")