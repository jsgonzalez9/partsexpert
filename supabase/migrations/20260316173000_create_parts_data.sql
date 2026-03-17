-- Create parts_data table
CREATE TABLE IF NOT EXISTS parts_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    part_number TEXT UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    availability TEXT,
    source_url TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE parts_data ENABLE ROW LEVEL SECURITY;

-- Allow anon read access
CREATE POLICY "Allow anon read access" ON parts_data
    FOR SELECT USING (true);

-- Allow service role or authenticated users to insert/update (keeping it simple for now)
CREATE POLICY "Allow anon insert access" ON parts_data
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon update access" ON parts_data
    FOR UPDATE USING (true);
