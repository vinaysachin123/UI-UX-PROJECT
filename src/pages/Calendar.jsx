import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Video,
  Image as ImageIcon,
  MoreHorizontal
} from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import './Calendar.css';

const scheduledItems = [
  { date: new Date(2026, 2, 18), type: 'video', title: 'Spring Try-On Haul', platform: 'YouTube', time: '10:00 AM' },
  { date: new Date(2026, 2, 20), type: 'carousel', title: '5 Ways to Style Leggings', platform: 'Instagram', time: '2:00 PM' },
  { date: new Date(2026, 2, 22), type: 'live', title: 'Workout w/ Trainers Live', platform: 'Instagram', time: '5:00 PM' },
  { date: new Date(2026, 2, 22), type: 'image', title: 'Flash Friday Sale - 20% Off', platform: 'Facebook', time: '9:00 AM' },
];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 16)); // Default to March 2026

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const renderHeader = () => {
    return (
      <div className="calendar-header flex-between mb-24">
        <div className="flex-center" style={{ gap: '16px' }}>
          <h2 className="text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
          <div className="calendar-nav">
            <button className="btn-ghost icon-btn" onClick={prevMonth}><ChevronLeft size={20} /></button>
            <button className="btn-outline text-sm" onClick={() => setCurrentDate(new Date(2026, 2, 16))}>Today</button>
            <button className="btn-ghost icon-btn" onClick={nextMonth}><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="flex-center" style={{ gap: '12px' }}>
          <select className="select-sm">
            <option>All Platforms</option>
            <option>Instagram</option>
            <option>YouTube</option>
          </select>
          <button className="btn btn-primary"><Plus size={16}/> Schedule Post</button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "eeee";
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="cal-day-name" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="cal-days-row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        // Find items for this day
        const dayItems = scheduledItems.filter(item => isSameDay(item.date, cloneDay));

        days.push(
          <div
            className={`cal-cell ${!isSameMonth(day, monthStart) ? "disabled" : ""} ${isSameDay(day, new Date(2026, 2, 16)) ? "today" : ""}`}
            key={day}
          >
            <div className="cal-cell-header">
              <span className="cal-date">{formattedDate}</span>
              <button className="add-btn"><Plus size={14}/></button>
            </div>
            
            <div className="cal-events">
              {dayItems.map((item, idx) => (
                <div key={idx} className={`cal-event type-${item.type}`}>
                  <div className="event-time">{item.time}</div>
                  <div className="event-title">{item.title}</div>
                  <div className="event-platform">{item.platform}</div>
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="cal-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="cal-body">{rows}</div>;
  };

  return (
    <div className="calendar-view">
      {renderHeader()}
      <div className="card calendar-container">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
