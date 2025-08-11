import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://efpdrwszatgukmnching.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcGRyd3N6YXRndWttbmNoaW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTI1NDcsImV4cCI6MjA3MDA2ODU0N30.J5QX7uqqZK5o8QDvmtkj0udkwLeziw7fCGhPzb3YSws";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
