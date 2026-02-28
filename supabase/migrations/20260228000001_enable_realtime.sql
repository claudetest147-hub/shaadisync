-- Enable Realtime on key tables
ALTER PUBLICATION supabase_realtime ADD TABLE rsvps;
ALTER PUBLICATION supabase_realtime ADD TABLE guests;
ALTER PUBLICATION supabase_realtime ADD TABLE checklist_items;
ALTER PUBLICATION supabase_realtime ADD TABLE timeline_items;
