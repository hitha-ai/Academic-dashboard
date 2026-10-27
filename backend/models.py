from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Reminder(db.Model):
    __tablename__ = 'reminders'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=True, default='')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date,
            'time': self.time or '',
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Attendance(db.Model):
    __tablename__ = 'attendance'
    
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(200), nullable=False)
    course_code = db.Column(db.String(20), nullable=True, default='')
    faculty = db.Column(db.String(100), nullable=True, default='')
    attended = db.Column(db.Integer, nullable=False, default=0)
    total = db.Column(db.Integer, nullable=False, default=0)

    @property
    def percentage(self):
        if self.total == 0:
            return None
        return round((self.attended / self.total) * 100, 1)

    def to_dict(self):
        return {
            'id': self.id,
            'code': self.course_code or '',
            'name': self.subject,
            'professor': self.faculty or '',
            'attended': self.attended,
            'total': self.total,
            'percentage': self.percentage
        }