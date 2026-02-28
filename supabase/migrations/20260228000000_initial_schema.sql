-- ShaadiSync Database Schema
-- Execute this in Supabase SQL Editor

-- ============================================================================
-- TABLES (Create all tables first)
-- ============================================================================

-- PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENTS
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL, -- 'wedding', 'engagement', 'mehndi', 'sangeet', 'reception'
  event_date TIMESTAMPTZ,
  location TEXT,
  venue_name TEXT,
  venue_address TEXT,
  cover_image_url TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  public_slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_owner ON events(owner_id);
CREATE INDEX idx_events_public_slug ON events(public_slug);

-- EVENT MEMBERS
CREATE TABLE event_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer', -- 'owner', 'editor', 'viewer'
  invited_by UUID REFERENCES profiles(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_members_event ON event_members(event_id);
CREATE INDEX idx_event_members_user ON event_members(user_id);

-- GUESTS
CREATE TABLE guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  group_name TEXT,
  plus_one_allowed BOOLEAN DEFAULT FALSE,
  dietary_restrictions TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_guests_event ON guests(event_id);

-- RSVPS
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE,
  guest_email TEXT,
  guest_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'accepted', 'declined', 'pending'
  plus_one_count INTEGER DEFAULT 0,
  message TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rsvps_event ON rsvps(event_id);
CREATE INDEX idx_rsvps_guest ON rsvps(guest_id);

-- VENDORS
CREATE TABLE vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  price_range TEXT,
  rating DECIMAL(2,1),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_vendors_user ON vendors(user_id);

-- EVENT VENDORS
CREATE TABLE event_vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  vendor_name TEXT,
  category TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  price DECIMAL(10,2),
  deposit_paid DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'paid', 'cancelled'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_vendors_event ON event_vendors(event_id);
CREATE INDEX idx_event_vendors_vendor ON event_vendors(vendor_id);

-- BUDGET ITEMS
CREATE TABLE budget_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  paid BOOLEAN DEFAULT FALSE,
  payment_date TIMESTAMPTZ,
  vendor_id UUID REFERENCES event_vendors(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_budget_items_event ON budget_items(event_id);

-- TIMELINE ITEMS
CREATE TABLE timeline_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_timeline_items_event ON timeline_items(event_id);
CREATE INDEX idx_timeline_items_start_time ON timeline_items(start_time);

-- CHECKLIST ITEMS
CREATE TABLE checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  category TEXT,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES profiles(id),
  due_date TIMESTAMPTZ,
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  assigned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_checklist_items_event ON checklist_items(event_id);
CREATE INDEX idx_checklist_items_assigned ON checklist_items(assigned_to);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view events they're members of"
  ON events FOR SELECT
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM event_members
      WHERE event_members.event_id = events.id
      AND event_members.user_id = auth.uid()
    ) OR
    is_public = TRUE
  );

CREATE POLICY "Event owners can update their events"
  ON events FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Users can create events"
  ON events FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Event owners can delete their events"
  ON events FOR DELETE
  USING (owner_id = auth.uid());

-- Event members policies
CREATE POLICY "Users can view event members for events they're part of"
  ON event_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_members.event_id
      AND (events.owner_id = auth.uid() OR events.is_public = TRUE)
    ) OR
    user_id = auth.uid()
  );

-- Guests policies
CREATE POLICY "Event members can view guests"
  ON guests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = guests.event_id
      AND (
        events.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM event_members
          WHERE event_members.event_id = events.id
          AND event_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Event editors can manage guests"
  ON guests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = guests.event_id
      AND events.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM event_members
      WHERE event_members.event_id = guests.event_id
      AND event_members.user_id = auth.uid()
      AND event_members.role IN ('owner', 'editor')
    )
  );

-- RSVPs policies
CREATE POLICY "Anyone can create RSVP for public events"
  ON rsvps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = rsvps.event_id
      AND events.is_public = TRUE
    )
  );

CREATE POLICY "Event members can view RSVPs"
  ON rsvps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = rsvps.event_id
      AND (
        events.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM event_members
          WHERE event_members.event_id = events.id
          AND event_members.user_id = auth.uid()
        ) OR
        events.is_public = TRUE
      )
    )
  );

-- Vendors policies
CREATE POLICY "Anyone can view vendors"
  ON vendors FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can create vendors"
  ON vendors FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Vendor owners can update their vendors"
  ON vendors FOR UPDATE
  USING (user_id = auth.uid());

-- Event vendors policies
CREATE POLICY "Event members can view event vendors"
  ON event_vendors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_vendors.event_id
      AND (
        events.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM event_members
          WHERE event_members.event_id = events.id
          AND event_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Event editors can manage event vendors"
  ON event_vendors FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_vendors.event_id
      AND events.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM event_members
      WHERE event_members.event_id = event_vendors.event_id
      AND event_members.user_id = auth.uid()
      AND event_members.role IN ('owner', 'editor')
    )
  );

-- Budget items policies
CREATE POLICY "Event members can view budget items"
  ON budget_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = budget_items.event_id
      AND (
        events.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM event_members
          WHERE event_members.event_id = events.id
          AND event_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Event editors can manage budget items"
  ON budget_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = budget_items.event_id
      AND events.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM event_members
      WHERE event_members.event_id = budget_items.event_id
      AND event_members.user_id = auth.uid()
      AND event_members.role IN ('owner', 'editor')
    )
  );

-- Timeline items policies
CREATE POLICY "Event members can view timeline items"
  ON timeline_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = timeline_items.event_id
      AND (
        events.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM event_members
          WHERE event_members.event_id = events.id
          AND event_members.user_id = auth.uid()
        ) OR
        (events.is_public = TRUE AND timeline_items.is_private = FALSE)
      )
    )
  );

CREATE POLICY "Event editors can manage timeline items"
  ON timeline_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = timeline_items.event_id
      AND events.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM event_members
      WHERE event_members.event_id = timeline_items.event_id
      AND event_members.user_id = auth.uid()
      AND event_members.role IN ('owner', 'editor')
    )
  );

-- Checklist items policies
CREATE POLICY "Event members can view checklist items"
  ON checklist_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = checklist_items.event_id
      AND (
        events.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM event_members
          WHERE event_members.event_id = events.id
          AND event_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Event members can manage checklist items"
  ON checklist_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = checklist_items.event_id
      AND events.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM event_members
      WHERE event_members.event_id = checklist_items.event_id
      AND event_members.user_id = auth.uid()
      AND event_members.role IN ('owner', 'editor')
    )
  );

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables with updated_at column
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_vendors_updated_at BEFORE UPDATE ON event_vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_items_updated_at BEFORE UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_items_updated_at BEFORE UPDATE ON timeline_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_checklist_items_updated_at BEFORE UPDATE ON checklist_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================================
-- Note: These are best configured in the Supabase Dashboard under Database > Replication
-- But we can add them programmatically:
-- ALTER PUBLICATION supabase_realtime ADD TABLE rsvps;
-- ALTER PUBLICATION supabase_realtime ADD TABLE guests;
-- ALTER PUBLICATION supabase_realtime ADD TABLE checklist_items;
-- ALTER PUBLICATION supabase_realtime ADD TABLE timeline_items;
