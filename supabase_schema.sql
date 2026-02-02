-- SQL Schema for Chiropractic Appointment Booking
-- Run this in your Supabase SQL Editor

-- Create the appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    preferred_date DATE,
    location TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'))
);

-- Enable Row Level Security (required for Supabase)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert appointments (public booking)
CREATE POLICY "Allow public to insert appointments" ON appointments
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Create policy to allow authenticated users (admin) to view all appointments
CREATE POLICY "Allow authenticated to view appointments" ON appointments
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated users (admin) to update appointments
CREATE POLICY "Allow authenticated to update appointments" ON appointments
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Optional: Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);

-- Optional: Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
